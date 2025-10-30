# 🛞 Página de Venda de Pneus - SCPNEUS Distribuidora

Página de vendas de produto único para 4 Pneus XBRI BRUTUS 265 75 R16, com design fiel ao Mercado Livre dos Pneus. Esta é uma venda solta do projeto https://mercadolivre.scpneus.shop/

## 🚀 Visão Geral do Projeto

Esta é uma página de vendas moderna e responsiva para pneus, featuring:

- **Produto**: 4 Pneus XBRI BRUTUS 265 75 R16
- **Preço**: R$2600 (com desconto de R$3200)
- **Seletor de quantidade**: Opções para 1, 2, 3 ou 4 pneus
- **Formulário completo**: Coleta de dados do comprador (nome, telefone, endereço)
- **Integração MercadoPago**: Botão de pagamento seguro
- **Confirmação de pagamento**: Botão que redireciona para o site principal
- **Design responsivo**: Funciona em desktop e mobile
- **Efeito de desconto**: Mostrando preço original com desconto

## 🛒 Funcionalidades Implementadas

### 🎯 Características Principais
- **✅ Design Fiel ao Mercado Livre**: Cores, layout e componentes idênticos ao projeto de referência
- **✅ Página de produto única**: Foco em um único produto com todas as informações necessárias
- **✅ Seletor de quantidade**: Botões para selecionar 1, 2, 3 ou 4 pneus
- **✅ Preço dinâmico**: Atualiza automaticamente conforme a quantidade selecionada
- **✅ Efeito de desconto**: Mostra 19% OFF quando selecionado 4 pneus
- **✅ Descrição detalhada**: Informações completas sobre o produto

### 📋 Formulário de Comprador
- **✅ Dados Pessoais**: Nome completo, telefone, e-mail (obrigatórios)
- **✅ Endereço Completo**: CEP, rua, número, bairro, cidade, estado
- **✅ Auto-completar endereço**: Busca automática via CEP (ViaCEP)
- **✅ Validação de campos**: Todos os campos obrigatórios são validados
- **✅ Interface amigável**: Campos bem organizados com labels claras

### 💳 Sistema de Pagamento
- **✅ Integração MercadoPago**: Script de pagamento fornecido
- **✅ Modal de confirmação**: Pergunta "Concluiu o seu pagamento? Sim"
- **✅ Redirecionamento**: Após confirmação, redireciona para https://mercadolivre.scpneus.shop/
- **✅ Segurança**: Ambiente seguro do Mercado Pago
- **✅ Múltiplas opções**: Cartão de crédito, débito, Pix, boleto

### 🎨 Design e UX
- **✅ Cores do Mercado Livre**: Paleta de cores fiel (#FFF159, #3483FA, etc.)
- **✅ Classes CSS personalizadas**: ml-product-card, ml-button-primary, etc.
- **✅ Layout responsivo**: Grid de 2 colunas em desktop, 1 coluna em mobile
- **✅ Animações**: Efeitos hover, transições suaves
- **✅ Componentes shadcn/ui**: Interface moderna e acessível

## 🚀 Tecnologias Utilizadas

- **⚡ Next.js 15** - Framework React com App Router
- **📘 TypeScript 5** - Tipagem segura
- **🎨 Tailwind CSS 4** - Estilização utility-first
- **🧩 shadcn/ui** - Componentes UI de alta qualidade
- **🔐 MercadoPago** - Integração de pagamento
- **🌍 ViaCEP API** - Busca de endereços
- **📱 Lucide React** - Ícones modernos

## 💻 Instalação e Execução Local

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Acessar a aplicação
http://localhost:3000
```

## 🚀 Deploy Rápido

### GitHub + Vercel

#### 1. Configurar Repositório GitHub

```bash
# Inicializar repositório git
git init

# Adicionar arquivos ao git
git add .

# Commit inicial
git commit -m "feat: Implementar página de vendas fiel ao Mercado Livre

- Adicionar design fiel ao Mercado Livre dos Pneus
- Implementar formulário completo de coleta de dados
- Integrar botão MercadoPago com script fornecido
- Adicionar modal de confirmação de pagamento
- Implementar redirecionamento para site principal
- Incluir auto-completar endereço via ViaCEP
- Adicionar validação de campos obrigatórios
- Design responsivo com classes ML personalizadas

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>"

# Conectar ao repositório remoto (substitua URL pelo seu repo)
git remote add origin https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git

# Enviar para o GitHub
git branch -M main
git push -u origin main
```

#### 2. Deploy no Vercel

**Via Vercel Dashboard:**
1. Acesse [vercel.com](https://vercel.com) e faça login
2. Clique em "New Project"
3. Conecte sua conta GitHub
4. Selecione o repositório que você acabou de criar
5. Configure as variáveis de ambiente (se necessário)
6. Clique em "Deploy"

**Via CLI (alternativa):**
```bash
# Instalar Vercel CLI
npm i -g vercel

# Fazer login no Vercel
vercel login

# Deploy do projeto
vercel

# Confirmar deploy para produção
vercel --prod
```

#### 3. Configurar Domínio (Opcional)

1. No dashboard do Vercel, vá para "Settings" → "Domains"
2. Adicione seu domínio personalizado
3. Configure as DNS conforme instruções do Vercel

## 📱 Estrutura da Página

### 🎯 Layout Principal
- **Header**: "SCPNEUS Distribuidora" com badge "Em Estoque"
- **Grid Principal**: 2 colunas (imagem + detalhes/formulário)
- **Seção de Imagem**: Placeholder do produto + destaques
- **Seção de Detalhes**: Preço, quantidade, descrição
- **Formulário**: Dados pessoais + endereço + pagamento

### 📋 Formulário de Comprador
- **Dados Pessoais**: Nome, telefone, e-mail
- **Endereço**: CEP (com auto-completar), rua, número, complemento, bairro, cidade, estado
- **Pagamento**: Informações sobre métodos aceitos

### 💳 Fluxo de Pagamento
1. **Preenchimento de dados**: Usuário preenche todos os campos obrigatórios
2. **Validação**: Sistema valida todos os campos
3. **Confirmação**: Modal aparece perguntando "Concluiu o seu pagamento? Sim"
4. **Redirecionamento**: Usuário é enviado para https://mercadolivre.scpneus.shop/

## 🔧 Personalização

### 🎨 Alterar Cores e Design
```css
/* No arquivo globals.css, modificar variáveis */
--ml-blue: #3483FA;        /* Cor principal */
--ml-yellow: #FFF159;      /* Cor de destaque */
--ml-green: #00A650;       /* Cor de sucesso */
```

### 💰 Alterar Preços
```tsx
// No arquivo page.tsx, modificar constantes
const originalPrice = 3200 // Preço original
const currentPrice = 2600   // Preço com desconto
```

### 🔄 Alterar Produto
```tsx
// Atualizar strings no componente
"4 Pneus XBRI BRUTUS 265 75 R16" // Nome do produto
// Descrição, informações técnicas, etc.
```

### 🔗 Alterar Redirecionamento
```tsx
// No arquivo page.tsx, modificar URL
window.location.href = 'https://mercadolivre.scpneus.shop/'
```

## 🚀 Próximos Passos

### 📈 Melhorias Sugeridas
1. **Imagens Reais**: Adicionar fotos reais dos pneus
2. **Integração com API**: Conectar com sistema de estoque real
3. **Múltiplos Produtos**: Expandir para catálogo de produtos
4. **Sistema de Avaliações**: Adicionar reviews de clientes
5. **SEO Avançado**: Otimizar para motores de busca

### 🔧 Manutenção
- **Atualizar Dependências**: `npm update`
- **Monitorar Performance**: Usar Vercel Analytics
- **Backup**: Manter código atualizado no GitHub
- **Testar Integração**: Verificar funcionamento do MercadoPago

## 🤝 Suporte

Para dúvidas ou suporte:
- Abra uma **issue** no repositório GitHub
- Verifique os logs no dashboard do Vercel
- Teste a integração MercadoPago em ambiente de desenvolvimento

----

## 📋 Fluxo do Usuário

1. **Acesso**: Usuário entra na página e vê o produto
2. **Seleção**: Escolhe quantidade de pneus (1-4)
3. **Dados**: Preenche formulário completo (nome, telefone, endereço)
4. **Confirmação**: Sistema valida e mostra modal de confirmação
5. **Pagamento**: Usuário clica "Concluiu o seu pagamento? Sim"
6. **Redirecionamento**: É enviado para https://mercadolivre.scpneus.shop/

---

**Projeto desenvolvido com Next.js, TypeScript e Tailwind CSS.**  
**Design fiel ao Mercado Livre dos Pneus.**  
**Deploy rápido e fácil via Vercel.**
