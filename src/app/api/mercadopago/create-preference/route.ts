import { NextRequest, NextResponse } from 'next/server'
import { Preference } from 'mercadopago'
import { mercadopago, generateExternalReference } from '@/lib/mercadopago'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { quantity, productName, unitPrice, discountAmount = 0, finalPrice } = body

    console.log('Creating Mercado Pago preference with:', { quantity, productName, unitPrice, discountAmount, finalPrice })

    if (!quantity || !productName || !unitPrice) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      )
    }

    const preference = new Preference(mercadopago)

    // Use finalPrice if provided, otherwise calculate it
    const priceToUse = finalPrice || (unitPrice * quantity - (discountAmount || 0))
    const actualUnitPrice = Math.max(0, priceToUse / quantity)

    console.log('Calculated prices:', { priceToUse, actualUnitPrice })

    const preferenceData = {
      items: [
        {
          id: 'pneu-xbri-brutus',
          title: productName,
          description: `${quantity}x ${productName}`,
          quantity: quantity,
          currency_id: 'BRL',
          unit_price: actualUnitPrice,
          picture_url: `${process.env.NEXT_PUBLIC_API_URL}/images/tires/xbri-brutus-1.png`,
        }
      ],
      payer: {
        name: '',
        email: '',
        phone: {
          area_code: '',
          number: ''
        },
        address: {
          zip_code: '',
          street_name: '',
          street_number: '',
          neighborhood: '',
          city: '',
          federal_unit: ''
        }
      },
      back_urls: {
        success: `${process.env.NEXT_PUBLIC_API_URL}/pagamento/sucesso`,
        failure: `${process.env.NEXT_PUBLIC_API_URL}/pagamento/falha`,
        pending: `${process.env.NEXT_PUBLIC_API_URL}/pagamento/pendente`
      },
      auto_return: 'all',
      payment_methods: {
        excluded_payment_types: [],
        installments: 12
      },
      statement_descriptor: 'SCPNEUS DISTRIBUIDORA',
      external_reference: generateExternalReference(quantity),
      notification_url: `${process.env.NEXT_PUBLIC_API_URL}/api/mercadopago/webhook`,
    }

    const result = await preference.create({ body: preferenceData })

    return NextResponse.json({
      id: result.id,
      init_point: result.init_point,
      sandbox_init_point: result.sandbox_init_point
    })

  } catch (error) {
    console.error('Error creating Mercado Pago preference:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}