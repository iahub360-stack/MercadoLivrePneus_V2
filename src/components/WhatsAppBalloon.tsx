'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MessageCircle, X, Phone } from 'lucide-react'

interface WhatsAppBalloonProps {
  phoneNumber?: string
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
}

const preConfiguredMessages = [
  "Olá! Gostaria de mais informações sobre os pneus.",
  "Qual o prazo de entrega para minha região?",
  "Têm pneus disponíveis para [modelo do meu veículo]?",
  "Quais são as formas de pagamento?",
  "Os pneus têm garantia? Qual o prazo?",
  "Podem me ajudar a escolher o pneu ideal para meu carro?",
  "Qual o valor do frete para minha cidade?",
  "Têm algum desconto ou promoção disponível?"
]

export function WhatsAppBalloon({ 
  phoneNumber = "+554934361447", 
  position = 'bottom-right' 
}: WhatsAppBalloonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedMessage, setSelectedMessage] = useState('')

  const getPositionClasses = () => {
    switch (position) {
      case 'bottom-right':
        return 'bottom-4 right-4'
      case 'bottom-left':
        return 'bottom-4 left-4'
      case 'top-right':
        return 'top-4 right-4'
      case 'top-left':
        return 'top-4 left-4'
      default:
        return 'bottom-4 right-4'
    }
  }

  const handleSendMessage = (message: string) => {
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=${encodedMessage}`
    window.open(whatsappUrl, '_blank')
    setIsOpen(false)
    setSelectedMessage('')
  }

  const handleCustomMessage = () => {
    if (selectedMessage.trim()) {
      handleSendMessage(selectedMessage)
    }
  }

  return (
    <div className={`fixed ${getPositionClasses()} z-50`}>
      {/* Main WhatsApp Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg transition-all duration-300 hover:scale-110"
          size="icon"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      )}

      {/* Balloon Content */}
      {isOpen && (
        <Card className="w-80 shadow-xl border-2 border-green-500">
          <CardContent className="p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Atendimento via WhatsApp</h3>
                  <p className="text-xs text-gray-600">{phoneNumber}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="w-6 h-6"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Pre-configured Messages */}
            <div className="space-y-2 mb-4">
              <h4 className="font-medium text-sm text-gray-700">Mensagens Rápidas:</h4>
              <div className="max-h-40 overflow-y-auto space-y-1">
                {preConfiguredMessages.map((message, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleSendMessage(message)}
                    className="w-full text-left justify-start text-xs h-auto p-2 whitespace-normal"
                  >
                    {message}
                  </Button>
                ))}
              </div>
            </div>

            {/* Custom Message Input */}
            <div className="space-y-2">
              <h4 className="font-medium text-sm text-gray-700">Ou digite sua mensagem:</h4>
              <textarea
                value={selectedMessage}
                onChange={(e) => setSelectedMessage(e.target.value)}
                placeholder="Digite sua mensagem aqui..."
                className="w-full p-2 border border-gray-300 rounded text-xs resize-none"
                rows={3}
              />
              <div className="flex gap-2">
                <Button
                  onClick={handleCustomMessage}
                  disabled={!selectedMessage.trim()}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white text-xs"
                  size="sm"
                >
                  <MessageCircle className="w-3 h-3 mr-1" />
                  Enviar
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.open(`tel:${phoneNumber}`, '_self')}
                  className="text-xs"
                  size="sm"
                >
                  <Phone className="w-3 h-3 mr-1" />
                  Ligar
                </Button>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-3 pt-3 border-t">
              <div className="flex items-center gap-1">
                <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                  Online
                </Badge>
                <span className="text-xs text-gray-500">Resposta rápida</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}