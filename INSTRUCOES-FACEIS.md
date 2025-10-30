# 🚀 CORREÇÃO DO ERRO 404 - INSTRUÇÕES FÁCEIS

## Problema
O site está retornando erro 404 nas páginas de produtos porque a API está usando produtos do Paraguai (iPhones, MacBooks) em vez de pneus (BFGoodrich + XBRI).

## Solução Rápida (Recomendada)

### Opção 1: Executar Script Automático
1. Copie o conteúdo do arquivo `deploy-fix.sh` 
2. Cole no seu terminal local
3. Pressione Enter
4. Digite suas credenciais do GitHub quando solicitado

### Opção 2: Fazer Manualmente via GitHub
1. Acesse: https://github.com/iahub360-stack/MercadoLivrePneus_V2
2. Clique em "Add file" → "Create new file"
3. Crie os seguintes arquivos:

#### Arquivo 1: `src/lib/bfgoodrich-products.ts`
(Copiar o conteúdo de `/home/z/my-project/_temp-repo/src/lib/bfgoodrich-products.ts`)

#### Arquivo 2: `src/lib/xbri-products.ts`  
(Copiar o conteúdo de `/home/z/my-project/_temp-repo/src/lib/xbri-products.ts`)

#### Arquivo 3: `src/lib/tire-data.ts`
(Copiar o conteúdo de `/home/z/my-project/_temp-repo/src/lib/tire-data.ts`)

#### Arquivo 4: `src/app/api/products/route.ts`
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { tireProducts } from '@/lib/tire-data'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')
    const limit = searchParams.get('limit')
    const search = searchParams.get('search')

    let filteredProducts = [...tireProducts]

    // Filter by category
    if (category) {
      filteredProducts = filteredProducts.filter(p => 
        p.category === category
      )
    }

    // Filter featured products
    if (featured === 'true') {
      filteredProducts = filteredProducts.filter(p => p.isFreeShipping)
    }

    // Search products
    if (search) {
      const searchLower = search.toLowerCase()
      filteredProducts = filteredProducts.filter(p =>
        p.name.toLowerCase().includes(searchLower) ||
        p.description?.toLowerCase().includes(searchLower) ||
        p.brand.toLowerCase().includes(searchLower)
      )
    }

    // Limit results
    if (limit) {
      filteredProducts = filteredProducts.slice(0, parseInt(limit))
    }

    return NextResponse.json({
      success: true,
      data: filteredProducts,
      total: filteredProducts.length
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}
```

4. No commit message, coloque:
```
Fix API route to use tire products instead of Paraguay products
```

5. Clique em "Commit changes"

## O que será corrigido:

- ✅ API retornará 26 produtos de pneus (13 BFGoodrich + 13 XBRI)
- ✅ Páginas de produtos funcionarão sem erro 404
- ✅ URLs como `xbri-brutus-ta-205-70r15` serão encontradas
- ✅ Busca por marca funcionará (BFGoodrich, XBRI)

## Após o Deploy (2-3 minutos)

Teste estas URLs:
- `https://mercadolivre.scpneus.shop/produto/xbri-brutus-ta-205-70r15`
- `https://mercadolivre.scpneus.shop/produto/bf-goodrich-ko3-lt265-65r18-123-120s-rwl`

## Resumo Técnico

**Antes:** API usava `mockProducts` (iPhones, MacBooks, perfumes do Paraguai)  
**Depois:** API usa `tireProducts` (BFGoodrich KO3 + XBRI BRUTUS T/A)

**Total de produtos:** 26 pneus para camionetas/SUVs