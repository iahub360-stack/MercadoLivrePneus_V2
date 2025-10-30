import { MercadoPagoConfig } from 'mercadopago'

// Configuração do Mercado Pago
const mercadopago = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN || '',
  options: {
    timeout: 5000,
    idempotencyKey: 'uuid'
  }
})

export { mercadopago }

// Funções utilitárias
export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

export const generateExternalReference = (quantity: number) => {
  return `XBRI_BRUTUS_225_60_R18_${quantity}_${Date.now()}`
}