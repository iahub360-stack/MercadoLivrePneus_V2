# DOCUMENTO COMPLETO - DEPLOY TESTE MERCADO LIVRE DOS PNEUS

## 📋 ÍNDICE
1. [Atualização de Preços](#atualização-de-preços)
2. [Estrutura do Projeto](#estrutura-do-projeto)
3. [Configuração Mercado Pago](#configuração-mercado-pago)
4. [Preparação para Deploy](#preparação-para-deploy)
5. [Guia de Deploy no Vercel](#guia-de-deploy-no-vercel)
6. [Manutenção Pós-Deploy](#manutenção-pós-deploy)

---

## 🔄 ATUALIZAÇÃO DE PREÇOS

### ✅ Preços Já Atualizados (Verificação Concluída)

Após análise completa do arquivo `data/products.json`, constatamos que **TODOS OS PREÇOS já estão corretos** conforme sua lista:

#### ✅ Pneus XBRI (13 produtos)
- 205/70R15: R$ 410,00 ✓
- 245/70R16: R$ 550,00 ✓
- 265/70R16: R$ 710,00 ✓
- 265/75R16: R$ 760,00 ✓
- 285/75R16: R$ 910,00 ✓
- 265/65R17: R$ 751,00 ✓
- 265/70R17: R$ 789,00 ✓
- 285/70R17: R$ 990,00 ✓
- 265/60R18: R$ 850,00 ✓
- 265/65R18: R$ 910,00 ✓
- 285/65R18: R$ 1.010,00 ✓
- 35X12,5R18: R$ 1.250,00 ✓
- 265/60R20: R$ 1.590,00 ✓

#### ✅ Pneus BFGoodrich (11 produtos)
- 265/65R18: R$ 1.740,00 ✓
- 265/70R18: R$ 1.790,00 ✓
- 35X12.5R18: R$ 2.650,00 ✓
- 285/65R18: R$ 2.110,00 ✓
- 275/65R18: R$ 2.050,00 ✓
- 265/60R18: R$ 1.590,00 ✓
- 37X12.5R17: R$ 2.250,00 ✓
- 285/70R17: R$ 2.090,00 ✓
- 275/70R17: R$ 1.890,00 ✓
- 265/70R17: R$ 1.490,90 ✓
- 265/65R17: R$ 1.410,90 ✓

#### ✅ Pneus para Caminhão (9 produtos)
- 295/80R22.5 XBRI Ecoplus: R$ 1.640,00 ✓
- 295/80R22.5 Robusto B5: R$ 1.810,00 ✓
- 275/80R22.5 Michelin: R$ 3.040,00 ✓
- 275/80R22.5 XBRI Ecoplus: R$ 1.610,00 ✓
- 295/80R22.5 XBRI Forza Plus: R$ 1.910,00 ✓
- 275/80R22.5 XBRI Forza Plus: R$ 2.050,00 ✓
- 315/75R16 BFGoodrich: R$ 2.100,00 ✓
- 265/75R16 BFGoodrich: R$ 1.460,00 ✓
- 265/70R16 BFGoodrich: R$ 1.390,00 ✓

**Status: ✅ TODOS OS 33 PRODUTOS COM PREÇOS CORRETOS**

---

## 🏗️ ESTRUTURA DO PROJETO

### 📁 Diretórios Principais
```
src/
├── app/                          # Páginas Next.js (App Router)
│   ├── page.tsx                  # Homepage
│   ├── produto/[slug]/           # Páginas de produtos
│   ├── checkout/                # Página de checkout
│   ├── pagamento-encomenda/      # Página de encomendas especiais
│   ├── pagamento/               # Páginas de status de pagamento
│   │   ├── sucesso/
│   │   ├── falha/
│   │   └── pendente/
│   └── api/                     # APIs do backend
│       ├── products/            # API de produtos
│       └── mercadopago/         # APIs do Mercado Pago
│           ├── create-preference/
│           └── webhook/
├── components/                   # Componentes React
│   ├── ui/                      # Componentes shadcn/ui
│   ├── Header.tsx               # Cabeçalho
│   ├── Footer.tsx               # Rodapé
│   ├── ProductCard.tsx          # Cards de produtos
│   └── ProductGrid.tsx          # Grade de produtos
├── lib/                         # Bibliotecas e utilitários
│   ├── db.ts                    # Conexão com banco
│   ├── mercadopago.ts           # Configuração Mercado Pago
│   └── utils.ts                 # Funções utilitárias
└── data/                        # Dados estáticos
    └── products.json            # Base de produtos (33 itens)
```

### 📊 Base de Produtos (`data/products.json`)

#### Estrutura de Cada Produto:
```json
{
  "id": "xbri-brutus-ta-205-70r15",
  "slug": "xbri-brutus-ta-205-70r15", 
  "name": "Pneu XBRI BRUTUS T/A LT 205/70R15 8PR 102/99Q Letra Branca",
  "brand": "XBRI",
  "model": "BRUTUS T/A",
  "size": "205/70R15",
  "category": "pneus-suv",
  "price": 410,
  "originalPrice": 410,
  "discount": 0,
  "quantity": 1,
  "unitPrice": 410,
  "images": ["url1", "url2", "url3", "url4"],
  "description": "Descrição completa...",
  "features": ["Característica 1", "Característica 2"],
  "mercadopagoLink": "https://mpago.la/XXXXXXX",
  "tags": ["suv", "off-road", "letra-branca", "xbri"],
  "stock": 50,
  "rating": 4.8,
  "reviews": 127
}
```

#### Categorias Disponíveis:
- `pneus-suv` - Pneus para SUV/Camioneta
- `pneus-caminhao` - Pneus para Caminhão

### 🎨 Páginas e Rotas

#### Páginas Principais:
- **`/`** - Homepage com todos os produtos
- **`/produto/[slug]`** - Página individual de cada produto
- **`/checkout`** - Página de checkout pós-pagamento
- **`/pagamento-encomenda`** - Formulário de encomendas especiais

#### Páginas de Status:
- **`/pagamento/sucesso`** - Pagamento aprovado
- **`/pagamento/falha`** - Pagamento falhou
- **`/pagamento/pendente`** - Pagamento em processamento

### 🔧 Como Modificar/Adicionar Produtos

#### Método 1: Editar o JSON Manualmente
1. Abra `data/products.json`
2. Copie um produto existente
3. Modifique os campos necessários:
   ```json
   {
     "id": "novo-produto-id",
     "slug": "novo-produto-slug",
     "name": "Nome Completo do Produto",
     "brand": "Marca",
     "model": "Modelo",
     "size": "Medida",
     "category": "pneus-suv ou pneus-caminhao",
     "price": 999,
     "originalPrice": 999,
     "discount": 0,
     "quantity": 1,
     "unitPrice": 999,
     "images": ["url_imagem_1", "url_imagem_2"],
     "description": "Descrição detalhada",
     "features": ["Característica 1", "Característica 2"],
     "mercadopagoLink": "https://mpago.la/NOVO_LINK",
     "tags": ["tag1", "tag2"],
     "stock": 50,
     "rating": 4.5,
     "reviews": 10
   }
   ```

#### Método 2: Usar VS Code
1. Instale a extensão **JSON Tools** ou **Prettier**
2. Use o formato automático (Ctrl+Shift+F)
3. Valide o JSON com a extensão **JSON Validator**

#### Campos Obrigatórios:
- `id`, `slug`, `name`, `brand`, `model`, `size`, `category`
- `price`, `originalPrice`, `quantity`, `unitPrice`
- `images`, `description`, `mercadopagoLink`
- `stock`, `rating`, `reviews`

---

## 💳 CONFIGURAÇÃO MERCADO PAGO

### 🔑 Onde Configurar as Credenciais

#### 1. Arquivo de Configuração (`src/lib/mercadopago.ts`)
```typescript
// src/lib/mercadopago.ts
import { Preference } from 'mercadopago'

export const mpClient = new Preference(process.env.MERCADO_PAGO_ACCESS_TOKEN!)
```

#### 2. Variáveis de Ambiente no Vercel
No painel do Vercel:
1. Vá para **Settings > Environment Variables**
2. Adicione as variáveis:
   ```
   MERCADO_PAGO_ACCESS_TOKEN = "SEU_ACCESS_TOKEN"
   NEXT_PUBLIC_API_URL = "https://seu-dominio.vercel.app"
   ```

#### 3. Como Obter Access Token Mercado Pago
1. Acesse [Mercado Pago](https://www.mercadopago.com.br/)
2. Faça login como vendedor
3. Vá para **Configurações > Credenciais > API**
4. Copie o **Access Token** de produção

### 🔗 Links do Mercado Pago

#### Estrutura dos Links no JSON:
```json
"mercadopagoLink": "https://mpago.la/CODIGO_UNICO"
```

#### Como Gerar Novos Links:
1. Use a API do Mercado Pago ou painel web
2. Crie preferências de pagamento para cada produto
3. Atualize o campo `mercadopagoLink` no JSON

### 🔄 Webhook Mercado Pago

#### Endpoint Configurado:
- **URL**: `https://seu-dominio.vercel.app/api/mercadopago/webhook`
- **Método**: POST
- **Função**: Receber notificações de pagamento

---

## 🚀 PREPARAÇÃO PARA DEPLOY

### ✅ Checklist Pré-Deploy

#### 1. Dependências e Versões
```json
// package.json - Verificar
{
  "dependencies": {
    "next": "^15.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "@mercadopago/sdk-react": "^2.0.0",
    "mercadopago": "^1.5.0",
    "lucide-react": "^0.263.1",
    "tailwindcss": "^4.0.0",
    "typescript": "^5.0.0"
  }
}
```

#### 2. Arquivos de Configuração
- ✅ `next.config.ts` - Configuração Next.js
- ✅ `tailwind.config.ts` - Configuração Tailwind
- ✅ `tsconfig.json` - Configuração TypeScript
- ✅ `vercel.json` - Configuração Vercel

#### 3. Variáveis de Ambiente Necessárias
```bash
# .env.local (desenvolvimento)
MERCADO_PAGO_ACCESS_TOKEN="test_token"
NEXT_PUBLIC_API_URL="http://localhost:3000"

# Vercel (produção)
MERCADO_PAGO_ACCESS_TOKEN="production_token"
NEXT_PUBLIC_API_URL="https://mercadolivre.scpneus.shop"
```

#### 4. Build e Teste Local
```bash
# Instalar dependências
npm install

# Testar build
npm run build

# Iniciar desenvolvimento
npm run dev

# Verificar lint
npm run lint
```

### 🔍 Validação de Projeto

#### ✅ Testes Realizados:
1. **Build Success**: `npm run build` ✓
2. **TypeScript Check**: Sem erros ✓
3. **ESLint**: Apenas warnings não críticos ✓
4. **API Endpoints**: Todos funcionando ✓
5. **Páginas Estáticas**: Renderizando corretamente ✓
6. **Imagens e Assets**: Carregando ✓

#### 📱 Responsividade
- ✅ Desktop (1920x1080)
- ✅ Tablet (768x1024)
- ✅ Mobile (375x667)

---

## 🌐 GUIA DE DEPLOY NO VERCEL (WINDOWS)

### 📋 Pré-requisitos
1. **Conta no GitHub**
2. **Conta no Vercel**
3. **Git instalado no Windows**
4. **VS Code (recomendado)**

### 🔧 Passo 1: Configurar Git no Windows

#### 1. Instalar Git (se não tiver)
```bash
# Baixar do site oficial
# https://git-scm.com/download/win
```

#### 2. Configurar Nome e Email
```bash
# Abrir Git Bash (clique direito no desktop)
git config --global user.name "Seu Nome"
git config --global user.email "seu.email@exemplo.com"
```

#### 3. Gerar SSH Key (opcional, mas recomendado)
```bash
# Gerar chave SSH
ssh-keygen -t rsa -b 4096 -C "seu.email@exemplo.com"

# Adicionar ao ssh-agent
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_rsa

# Copiar a chave pública
cat ~/.ssh/id_rsa.pub
```
- Copie a saída e adicione ao GitHub: **Settings > SSH and GPG keys**

### 📤 Passo 2: Enviar para GitHub

#### 1. Criar Repositório no GitHub
1. Acesse [github.com](https://github.com)
2. Clique em **New repository**
3. Nome: `mercadolivre-scpneus`
4. Deixe público ou privado como preferir
5. Não inicialize com README

#### 2. Inicializar Git Localmente
```bash
# No terminal, na pasta do projeto
git init

# Adicionar todos os arquivos
git add .

# Primeiro commit
git commit -m "Initial commit - Mercado Livre dos Pneus e-commerce"

# Adicionar remote (substitua SEU_USER pelo seu username do GitHub)
git remote add origin https://github.com/SEU_USER/mercadolivre-scpneus.git

# Enviar para o GitHub
git push -u origin main
```

#### 3. Usar VS Code (Alternativa)
1. Abra o projeto no VS Code
2. Clique no ícone de **Source Control** (à esquerda)
3. Clique em **Publish to GitHub**
4. Siga as instruções na tela

### 🚀 Passo 3: Deploy no Vercel

#### Método 1: Via Interface Web (Recomendado)

##### 1. Importar Projeto
1. Acesse [vercel.com](https://vercel.com)
2. Faça login com sua conta GitHub
3. Clique em **New Project**
4. Selecione o repositório `mercadolivre-scpneus`
5. Clique em **Import**

##### 2. Configurar Variáveis de Ambiente
1. Na página de configuração do projeto
2. Vá para **Settings > Environment Variables**
3. Adicione as variáveis:
   ```
   Nome: MERCADO_PAGO_ACCESS_TOKEN
   Valor: SEU_ACCESS_TOKEN_AQUI

   Nome: NEXT_PUBLIC_API_URL
   Valor: https://mercadolivre.scpneus.shop
   ```
4. Clique em **Save**

##### 3. Configurar Domínio
1. Vá para **Settings > Domains**
2. Adicione `mercadolivre.scpneus.shop`
3. Configure o DNS conforme instruções do Vercel

##### 4. Deploy
1. Clique em **Deploy**
2. Aguarde o processo de build
3. Se tudo der certo, seu site estará no ar!

#### Método 2: Via Vercel CLI

##### 1. Instalar Vercel CLI
```bash
# No terminal (PowerShell ou CMD)
npm i -g vercel
```

##### 2. Fazer Login
```bash
vercel login
```

##### 3. Deploy
```bash
# Na pasta do projeto
vercel

# Siga as instruções:
# - Escolha criar novo projeto
# - Selecione o diretório atual
# - Configure as variáveis de ambiente
# - Confirme o deploy
```

### 🔍 Passo 4: Verificação Pós-Deploy

#### 1. Testar o Site
- Acesse: `https://mercadolivre.scpneus.shop`
- Verifique se todas as páginas carregam
- Teste a navegação entre produtos
- Verifique as imagens

#### 2. Testar API
```bash
# Testar API de produtos
curl https://mercadolivre.scpneus.shop/api/products

# Deve retornar JSON com 33 produtos
```

#### 3. Testar Mercado Pago
- Tente comprar um produto
- Verifique se redireciona para o Mercado Pago
- Teste o webhook (se possível)

---

## 🛠️ MANUTENÇÃO PÓS-DEPLOY

### 📊 Monitoramento

#### 1. Analytics Vercel
- Acesse o painel do Vercel
- Vá para **Analytics**
- Monitore tráfego, performance e erros

#### 2. Logs
```bash
# Verificar logs via Vercel CLI
vercel logs mercadolivre-scpneus

# Filtrar por erros
vercel logs mercadolivre-scpneus --filter error
```

### 🔄 Atualizações

#### 1. Atualizar Produtos
```bash
# 1. Faça as alterações localmente
# Editar data/products.json

# 2. Teste localmente
npm run dev

# 3. Commit e push
git add .
git commit -m "Atualização de preços dos produtos"
git push origin main

# O Vercel fará deploy automático
```

#### 2. Atualizar Código
```bash
# Processo similar
# 1. Faça alterações no código
# 2. Teste localmente
# 3. Commit e push
# 4. Deploy automático no Vercel
```

### 🚨 Solução de Problemas Comuns

#### 1. Build Fails
```bash
# Verificar erros de build
npm run build

# Limpar cache
npm run build -- --clean
```

#### 2. Imagens Não Carregam
- Verificar URLs no `products.json`
- Testar acesso às imagens
- Verificar configuração de domínio

#### 3. Mercado Pago Não Funciona
- Verificar `MERCADO_PAGO_ACCESS_TOKEN`
- Testar webhook localmente
- Verificar URLs de retorno

#### 4. Página 404
- Verificar rotas em `src/app/`
- Testar todos os links
- Verificar arquivo `vercel.json`

### 📈 Backup e Segurança

#### 1. Backup do Código
- O GitHub já é seu backup
- Crie branches para features
- Use tags para versões estáveis

#### 2. Backup dos Dados
```bash
# Exportar produtos
cp data/products.json backup/products-$(date +%Y%m%d).json

# Restaurar
cp backup/products-YYYYMMDD.json data/products.json
```

---

## 🎉 CONCLUSÃO

Seu projeto **Mercado Livre dos Pneus** está pronto para deploy!

### ✅ Status Final:
- ✅ 33 produtos com preços atualizados
- ✅ Estrutura Next.js 15 otimizada
- ✅ Integração Mercado Pago configurada
- ✅ Design responsivo
- ✅ SEO otimizado
- ✅ PWA pronto
- ✅ Ready for Vercel deploy

### 🚀 Próximos Passos:
1. Siga o guia de deploy no Vercel
2. Configure o domínio personalizado
3. Teste todas as funcionalidades
4. Monitore o desempenho inicial
5. Prepare-se para as primeiras vendas!

---

**Sucesso na sua jornada de e-commerce! 🛒🚗**