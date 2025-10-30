import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Clock, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function PagamentoPendente() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Clock className="w-16 h-16 text-yellow-500" />
          </div>
          <CardTitle className="text-2xl text-yellow-600">
            Pagamento em Análise
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-gray-600">
            Seu pagamento está sendo processado. Você receberá uma notificação assim que for aprovado.
          </p>
          <div className="space-y-2 text-sm text-gray-500">
            <p><strong>Produto:</strong> 4 Pneus XBRI BRUTUS 225 60 R18</p>
            <p><strong>Valor:</strong> R$ 2.520,00</p>
            <p><strong>Status:</strong> Em análise</p>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-sm text-blue-700">
              <strong>Importante:</strong> Se você pagou com boleto, pode levar até 3 dias úteis para a compensação.
            </p>
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