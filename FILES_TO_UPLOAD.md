# Arquivos para Upload Manual - Correção do Erro 404

## Instruções Rápidas

1. Acesse: https://github.com/iahub360-stack/MercadoLivrePneus_V2
2. Clique em "Add file" → "Upload files"
3. Arraste os arquivos abaixo para a área de upload
4. Adicione um commit message: "Fix: Corrigir API de produtos e páginas de produto"
5. Clique em "Commit changes"

## Arquivos Necessários

### 1. src/app/api/products/route.ts
- Substituir o arquivo existente completamente
- Corrige a importação dos dados dos pneus

### 2. data/products.json  
- Substituir o arquivo existente completamente
- Contém todos os 33 produtos corretos (XBRI + BFGoodrich)

## Após o Upload

- Vercel vai fazer deploy automático em 2-3 minutos
- Teste: https://mercadolivre.scpneus.shop/produto/xbri-brutus-ta-205-70r15
- Deve retornar HTTP 200 em vez de 404

## Verificação

Após o deploy, verifique:
- ✅ Página inicial carrega produtos
- ✅ Páginas de produto individuais funcionam
- ✅ Busca e filtros operacionais
- ✅ Sistema de pagamento ativo

---

**Status:** PRONTO PARA UPLOAD - Os arquivos abaixo estão prontos para serem copiados.