'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { XCircle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function PagamentoFalha() {
  const handleBack = () => {
    window.history.back()
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <XCircle className="w-16 h-16 text-red-500" />
          </div>
          <CardTitle className="text-2xl text-red-600">
            Pagamento Falhou
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-gray-600">
            Ocorreu um erro ao processar seu pagamento. Por favor, tente novamente ou entre em contato com nosso suporte.
          </p>
          <div className="space-y-2 text-sm text-gray-500">
            <p><strong>Produto:</strong> 4 Pneus XBRI BRUTUS 225 60 R18</p>
            <p><strong>Valor:</strong> R$ 2.520,00</p>
            <p><strong>Status:</strong> Falhou</p>
          </div>
          <div className="flex gap-2">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex-1"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar para a Loja
            </Link>
            <button 
              onClick={handleBack}
              className="inline-flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors flex-1"
            >
              Tentar Novamente
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}