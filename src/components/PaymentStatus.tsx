'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, XCircle, Clock, Loader2 } from 'lucide-react'

interface PaymentStatus {
  status: 'pending' | 'approved' | 'rejected' | 'in_process'
  payment_id?: string
  payment_type?: string
  external_reference?: string
}

interface PaymentStatusProps {
  paymentId?: string
}

export function PaymentStatus({ paymentId }: PaymentStatusProps) {
  const [paymentData, setPaymentData] = useState<PaymentStatus | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (paymentId) {
      checkPaymentStatus(paymentId)
    }
  }, [paymentId])

  const checkPaymentStatus = async (id: string) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/mercadopago/webhook?topic=payment&id=${id}`)
      if (response.ok) {
        const data = await response.json()
        setPaymentData({
          status: data.status,
          payment_id: data.id,
          payment_type: data.payment_type_id,
          external_reference: data.external_reference
        })
      }
    } catch (error) {
      setError('Erro ao verificar status do pagamento')
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = () => {
    if (loading) return <Loader2 className="w-6 h-6 animate-spin" />
    
    switch (paymentData?.status) {
      case 'approved':
        return <CheckCircle className="w-6 h-6 text-green-500" />
      case 'rejected':
        return <XCircle className="w-6 h-6 text-red-500" />
      case 'in_process':
        return <Clock className="w-6 h-6 text-yellow-500" />
      default:
        return <Clock className="w-6 h-6 text-gray-500" />
    }
  }

  const getStatusText = () => {
    if (loading) return 'Verificando...'
    
    switch (paymentData?.status) {
      case 'approved':
        return 'Pagamento Aprovado'
      case 'rejected':
        return 'Pagamento Rejeitado'
      case 'in_process':
        return 'Pagamento em Processamento'
      default:
        return 'Aguardando Pagamento'
    }
  }

  const getStatusColor = () => {
    switch (paymentData?.status) {
      case 'approved':
        return 'bg-green-100 text-green-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      case 'in_process':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (!paymentId) {
    return null
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {getStatusIcon()}
          Status do Pagamento
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <div className="text-red-600 text-sm">{error}</div>
        )}
        
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Status:</span>
          <Badge className={getStatusColor()}>
            {getStatusText()}
          </Badge>
        </div>
        
        {paymentData?.payment_id && (
          <div className="text-sm">
            <span className="font-medium">ID do Pagamento:</span>
            <span className="ml-2 text-gray-600">{paymentData.payment_id}</span>
          </div>
        )}
        
        {paymentData?.payment_type && (
          <div className="text-sm">
            <span className="font-medium">Tipo:</span>
            <span className="ml-2 text-gray-600">{paymentData.payment_type}</span>
          </div>
        )}
        
        {paymentData?.external_reference && (
          <div className="text-sm">
            <span className="font-medium">Referência:</span>
            <span className="ml-2 text-gray-600">{paymentData.external_reference}</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}