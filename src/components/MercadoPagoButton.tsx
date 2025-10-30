'use client'

import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'

interface MercadoPagoButtonProps {
  className?: string
  quantity?: number
  productName?: string
  unitPrice?: number
  discountAmount?: number
}

export function MercadoPagoButton({ 
  className = "", 
  quantity = 4,
  productName = "4 Pneus XBRI BRUTUS 225 60 R18",
  unitPrice = 630,
  discountAmount = 0
}: MercadoPagoButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async () => {
    setIsLoading(true)
    try {
      const finalPrice = Math.max(0, unitPrice * quantity - (discountAmount || 0))
      
      console.log('Creating payment with:', { quantity, productName, unitPrice, discountAmount, finalPrice })
      
      const response = await fetch('/api/mercadopago/create-preference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          quantity,
          productName,
          unitPrice,
          discountAmount: discountAmount || 0,
          finalPrice
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error('API Error:', errorData)
        throw new Error(errorData.error || 'Failed to create payment preference')
      }

      const data = await response.json()
      console.log('Mercado Pago response:', data)
      
      // Redirecionar para o Mercado Pago
      if (data.init_point) {
        window.location.href = data.init_point
      } else if (data.sandbox_init_point) {
        window.location.href = data.sandbox_init_point
      } else {
        throw new Error('No payment URL received')
      }
    } catch (error) {
      console.error('Error creating payment:', error)
      // Fallback para o link direto caso a API falhe
      window.open('https://mpago.la/2S9wDo5', '_blank')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button 
      onClick={handleClick}
      disabled={isLoading}
      className={`bg-[#00B0E8] hover:bg-[#0090C8] text-white font-bold py-3 px-4 sm:px-6 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      <div className="flex items-center justify-center gap-2">
        {isLoading ? (
          <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
        ) : (
          <img 
            src="https://mobile.mercadolibre.com/remote_resources/image/web-private-nav-mp-logo" 
            alt="Mercado Pago" 
            className="h-5 sm:h-6 w-auto"
          />
        )}
        <span className="text-sm sm:text-base">
          {isLoading ? 'Processando...' : 'Comprar Agora'}
        </span>
      </div>
    </Button>
  )
}