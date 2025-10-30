# 🚀 INSTRUÇÕES PARA UPLOAD MANUAL - CORREÇÃO DO ERRO 404

## 📋 RESUMO RÁPIDO
- **Problema**: Erro 404 em todas as páginas de produto
- **Causa**: API usando dados incorretos (mockProducts em vez de pneus reais)
- **Solução**: Upload de 2 arquivos corrigidos
- **Tempo de deploy**: 2-3 minutos após upload

---

## 🔧 PASSO A PASSO

### 1. ACESSAR O REPOSITÓRIO
```
https://github.com/iahub360-stack/MercadoLivrePneus_V2
```

### 2. FAZER UPLOAD DOS ARQUIVOS

#### Método 1: Interface Web (Recomendado)
1. Clique em **"Add file"** → **"Upload files"**
2. Arraste os arquivos abaixo para a área de upload
3. Aguarde o upload completar
4. Adicione a mensagem de commit:
   ```
   Fix: Corrigir API de produtos e páginas de produto
   ```
5. Clique em **"Commit changes"**

#### Método 2: GitHub CLI (se tiver instalado)
```bash
gh repo clone iahub360-stack/MercadoLivrePneus_V2
cd MercadoLivrePneus_V2
# Copiar os arquivos para as pastas corretas
git add .
git commit -m "Fix: Corrigir API de produtos e páginas de produto"
git push origin master
```

---

## 📁 ARQUIVOS NECESSÁRIOS

### 📄 Arquivo 1: `src/app/api/products/route.ts`
**Caminho completo:** `src/app/api/products/route.ts`

**Conteúdo:**
```typescript
import { NextRequest, NextResponse } from 'next/server'
import products from '../../../../data/products.json'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get('category')
    const sort = searchParams.get('sort')
    const search = searchParams.get('search')

    let filteredProducts = [...products]

    // Filtrar por categoria
    if (category && category !== 'todos') {
      filteredProducts = filteredProducts.filter(product => product.category === category)
    }

    // Filtrar por busca
    if (search) {
      const searchTerm = search.toLowerCase()
      filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.brand.toLowerCase().includes(searchTerm) ||
        product.model.toLowerCase().includes(searchTerm)
      )
    }

    // Ordenar produtos
    if (sort) {
      switch (sort) {
        case 'price-asc':
          filteredProducts.sort((a, b) => a.price - b.price)
          break
        case 'price-desc':
          filteredProducts.sort((a, b) => b.price - a.price)
          break
        case 'rating':
          filteredProducts.sort((a, b) => b.rating - a.rating)
          break
        case 'name':
        default:
          filteredProducts.sort((a, b) => a.name.localeCompare(b.name))
      }
    }

    return NextResponse.json(filteredProducts)
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
```

### 📄 Arquivo 2: `data/products.json`
**Caminho completo:** `data/products.json`

**Conteúdo:** (Arquivo JSON completo com 33 produtos - ver arquivo separado `data_products.json`)

---

## ⏱️ APÓS O UPLOAD

### 1. VERIFICAR DEPLOY
- Acesse: https://vercel.com/iahub360-stack/MercadoLivrePneus_V2
- Aguarde o status verde ✅ (2-3 minutos)

### 2. TESTAR AS URLS

#### ✅ Páginas de Produto
```
https://mercadolivre.scpneus.shop/produto/xbri-brutus-ta-205-70r15
https://mercadolivre.scpneus.shop/produto/bf-goodrich-ko3-lt265-65r18-123-120s-rwl
```
**Esperado:** HTTP 200 (página carrega normalmente)

#### ✅ API de Produtos
```
https://mercadolivre.scpneus.shop/api/products
```
**Esperado:** Retorna array com 33 produtos

#### ✅ Página Inicial
```
https://mercadolivre.scpneus.shop/
```
**Esperado:** Carrega produtos corretamente

---

## ✅ VERIFICAÇÃO FINAL

### Checklist Pós-Deploy:
- [ ] Página inicial carrega produtos
- [ ] Páginas de produto individuais funcionam (sem 404)
- [ ] Busca por marca funciona (XBRI, BFGoodrich)
- [ ] Filtros de categoria operacionais
- [ ] Sistema de pagamento ativo
- [ ] Imagens carregando corretamente

### 🎯 SUCESSO!
Quando todas as verificações estiverem ✅, seu e-commerce estará:
- 🛒 Online e funcional
- 📱 Responsivo em todos os dispositivos
- 💳 Processando pagamentos via Mercado Pago
- 🚀 Com SEO otimizado

---

## 🆘 SE OCORRER ERROS

### Erro Comum 1: "Arquivo não encontrado"
- **Causa:** Caminho incorreto no upload
- **Solução:** Verificar os caminhos exatos:
  - `src/app/api/products/route.ts`
  - `data/products.json`

### Erro Comum 2: "Deploy falhou"
- **Causa:** Erro de sintaxe nos arquivos
- **Solução:** Verificar logs no Vercel Dashboard

### Erro Comum 3: "Ainda dando 404"
- **Causa:** Cache do navegador
- **Solução:** Limpar cache ou abrir em janela anônima

---

## 📞 SUPORTE

Se precisar de ajuda:
1. Verifique os logs de deploy no Vercel Dashboard
2. Confirme se os arquivos foram uploadados nos caminhos corretos
3. Teste as URLs listadas acima

**Status:** PRONTO PARA UPLOAD ✅