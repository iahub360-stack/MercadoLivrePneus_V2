import { NextRequest, NextResponse } from 'next/server'
import { Payment } from 'mercadopago'
import { mercadopago } from '@/lib/mercadopago'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { data, type } = body

    if (type === 'payment') {
      const paymentId = data.id
      const payment = new Payment(mercadopago)
      
      try {
        const paymentData = await payment.get({ id: paymentId })
        
        console.log('Payment received:', paymentData)
        
        // Aqui você pode processar o pagamento
        // Por exemplo: atualizar status do pedido, enviar email, etc.
        
        return NextResponse.json({ received: true })
      } catch (error) {
        console.error('Error getting payment data:', error)
        return NextResponse.json(
          { error: 'Error processing payment' },
          { status: 500 }
        )
      }
    }

    return NextResponse.json({ received: true })

  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const topic = searchParams.get('topic')
  const id = searchParams.get('id')

  if (topic === 'payment' && id) {
    try {
      const payment = new Payment(mercadopago)
      const paymentData = await payment.get({ id: id })
      
      return NextResponse.json(paymentData)
    } catch (error) {
      console.error('Error getting payment:', error)
      return NextResponse.json(
        { error: 'Error getting payment' },
        { status: 500 }
      )
    }
  }

  return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
}