'use client'

import { useEffect, useState, Suspense } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, Clock, Package, Truck, ArrowLeft, Home, Phone, Mail } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

interface OrderDetails {
  id: string
  status: 'approved' | 'pending' | 'failed'
  product: string
  quantity: number
  total: number
  paymentMethod: string
  date: string
  customerEmail: string
  customerPhone: string
}

function CheckoutContent() {
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams()

  useEffect(() => {
    // Simular obtenção de detalhes do pedido
    // Em produção, isso viria da API ou dos parâmetros da URL
    const mockOrder: OrderDetails = {
      id: 'ORD-' + Date.now(),
      status: searchParams.get('status') as 'approved' | 'pending' | 'failed' || 'approved',
      product: '4 Pneus XBRI BRUTUS 225 60 R18',
      quantity: 4,
      total: 2520.00,
      paymentMethod: 'Mercado Pago',
      date: new Date().toLocaleDateString('pt-BR'),
      customerEmail: 'cliente@exemplo.com',
      customerPhone: '(11) 99999-9999'
    }

    setOrderDetails(mockOrder)
    setLoading(false)
  }, [searchParams])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-16 h-16 text-green-500" />
      case 'pending':
        return <Clock className="w-16 h-16 text-yellow-500" />
      case 'failed':
        return <Clock className="w-16 h-16 text-red-500" />
      default:
        return <Package className="w-16 h-16 text-gray-500" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved':
        return 'Pagamento Aprovado!'
      case 'pending':
        return 'Pagamento em Processamento'
      case 'failed':
        return 'Pagamento Falhou'
      default:
        return 'Status Desconhecido'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'text-green-600'
      case 'pending':
        return 'text-yellow-600'
      case 'failed':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  const getStatusMessage = (status: string) => {
    switch (status) {
      case 'approved':
        return 'Seu pagamento foi processado com sucesso. Você receberá um e-mail de confirmação em breve.'
      case 'pending':
        return 'Seu pagamento está sendo processado. Você receberá uma notificação quando for confirmado.'
      case 'failed':
        return 'Ocorreu um problema com seu pagamento. Por favor, tente novamente ou entre em contato conosco.'
      default:
        return 'Status do pedido desconhecido. Entre em contato conosco para mais informações.'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando informações do pedido...</p>
        </div>
      </div>
    )
  }

  if (!orderDetails) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="text-center p-6">
            <p className="text-gray-600 mb-4">Não foi possível carregar as informações do pedido.</p>
            <Link 
              href="/"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar para a Loja
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">ML</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Mercado Livre dos Pneus</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors">
                Início
              </Link>
              <Link href="#produtos" className="text-gray-600 hover:text-blue-600 transition-colors">
                Produtos
              </Link>
              <Link href="#contato" className="text-gray-600 hover:text-blue-600 transition-colors">
                Contato
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Status Card */}
          <Card className="mb-8">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                {getStatusIcon(orderDetails.status)}
              </div>
              <CardTitle className={`text-2xl ${getStatusColor(orderDetails.status)}`}>
                {getStatusText(orderDetails.status)}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-6">
                {getStatusMessage(orderDetails.status)}
              </p>
              <div className="flex justify-center gap-4">
                <Link 
                  href="/"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
                >
                  <Home className="w-4 h-4" />
                  Voltar para a Loja
                </Link>
                <Link 
                  href="#contato"
                  className="inline-flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Falar com Suporte
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Order Details Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Order Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Informações do Pedido
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Número do Pedido:</span>
                  <span className="font-medium">{orderDetails.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Data:</span>
                  <span className="font-medium">{orderDetails.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Produto:</span>
                  <span className="font-medium">{orderDetails.product}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Quantidade:</span>
                  <span className="font-medium">{orderDetails.quantity} unidades</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Forma de Pagamento:</span>
                  <span className="font-medium">{orderDetails.paymentMethod}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-blue-600">R$ {orderDetails.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="w-5 h-5" />
                  Próximos Passos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {orderDetails.status === 'approved' && (
                  <>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle className="w-3 h-3 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Confirmação de Pagamento</h4>
                        <p className="text-sm text-gray-600">Você receberá um e-mail de confirmação em breve.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Package className="w-3 h-3 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Separação do Pedido</h4>
                        <p className="text-sm text-gray-600">Seus pneus serão separados e preparados para envio.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Truck className="w-3 h-3 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Envio</h4>
                        <p className="text-sm text-gray-600">Você receberá o código de rastreamento quando o pedido for enviado.</p>
                      </div>
                    </div>
                  </>
                )}
                {orderDetails.status === 'pending' && (
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Clock className="w-3 h-3 text-yellow-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Aguardando Confirmação</h4>
                      <p className="text-sm text-gray-600">Estamos aguardando a confirmação do seu pagamento.</p>
                    </div>
                  </div>
                )}
                {orderDetails.status === 'failed' && (
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Clock className="w-3 h-3 text-red-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Verificar Pagamento</h4>
                      <p className="text-sm text-gray-600">Por favor, verifique seus dados e tente novamente.</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Precisa de Ajuda?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium">E-mail</p>
                    <p className="text-gray-600">suporte@scpneus.com.br</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Telefone</p>
                    <p className="text-gray-600">(11) 99999-9999</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Horário de atendimento:</strong> Segunda a Sexta, 9h às 18h. Sábados, 9h às 13h.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  )
}