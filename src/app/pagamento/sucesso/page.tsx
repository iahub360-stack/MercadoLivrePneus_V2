import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function PagamentoSucesso() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl text-green-600">
            Pagamento Aprovado!
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-gray-600">
            Seu pagamento foi processado com sucesso. Você receberá um e-mail de confirmação em breve.
          </p>
          <div className="space-y-2 text-sm text-gray-500">
            <p><strong>Produto:</strong> 4 Pneus XBRI BRUTUS 225 60 R18</p>
            <p><strong>Valor:</strong> R$ 2.520,00</p>
            <p><strong>Status:</strong> Aprovado</p>
          </div>
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