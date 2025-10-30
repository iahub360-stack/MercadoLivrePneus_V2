'use client'

import { useState, useEffect } from 'react'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { Truck, Shield, CreditCard, CheckCircle, ArrowLeft, Tag, Percent } from 'lucide-react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { MercadoPagoButton } from '@/components/MercadoPagoButton'
import { ProductImage } from '@/components/ProductImage'
import { WhatsAppBalloon } from '@/components/WhatsAppBalloon'
import Link from 'next/link'

interface Product {
  id: string
  slug: string
  name: string
  brand: string
  model: string
  size: string
  category: string
  price: number
  originalPrice: number
  discount: number
  quantity: number
  unitPrice: number
  images: string[]
  description: string
  features: string[]
  mercadopagoLink: string
  tags: string[]
  stock: number
  rating: number
  reviews: number
}

interface ProductPageContentProps {
  product: Product
}

export function ProductPageContent({ product }: ProductPageContentProps) {
  const [selectedQuantity, setSelectedQuantity] = useState(4)
  const [showDeliveryDialog, setShowDeliveryDialog] = useState(false)
  const [couponCode, setCouponCode] = useState('')
  const [discountAmount, setDiscountAmount] = useState(0)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    cep: '',
    address: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: ''
  })
  const { toast } = useToast()

  const handleQuantityChange = (newQuantity: number) => {
    setSelectedQuantity(newQuantity)
  }

  const handleCouponApply = () => {
    if (!couponCode) {
      return
    }

    if (couponCode.startsWith('SCP2025.')) {
      const valueStr = couponCode.replace('SCP2025.', '')
      const value = parseFloat(valueStr.replace(',', '.'))
      
      if (!isNaN(value) && value > 0) {
        setDiscountAmount(value)
      }
    }
  }

  const handleCouponRemove = () => {
    setCouponCode('')
    setDiscountAmount(0)
  }

  const getFinalPrice = () => {
    const basePrice = product.unitPrice * selectedQuantity
    return Math.max(0, basePrice - discountAmount)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const buscarEndereco = async (cep: string) => {
    if (cep.length !== 8) return
    
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
      const data = await response.json()
      
      if (!data.erro) {
        setFormData(prev => ({
          ...prev,
          address: data.logradouro || '',
          neighborhood: data.bairro || '',
          city: data.localidade || '',
          state: data.uf || ''
        }))
        toast({
          title: "Endereço encontrado!",
          description: "Seu endereço foi preenchido automaticamente.",
        })
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "CEP não encontrado",
        variant: "destructive"
      })
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2
    }).format(price)
  }

  const getBrandLogo = (brand: string) => {
    switch (brand.toLowerCase()) {
      case 'michelin':
        return 'https://res.cloudinary.com/dhwqfkhzm/image/upload/v1761847899/michelin_woh4uy.png'
      case 'bfgoodrich':
        return 'https://res.cloudinary.com/dhwqfkhzm/image/upload/v1761847899/BFGoodrich_vjynmy.png'
      case 'xbri':
      default:
        return 'https://cdn.pneufree.com.br/XBRI/images/Geral/DESKTOP/xbri-logo-correta.svg'
    }
  }

  // Delivery Form Component
  const DeliveryForm = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Dados Pessoais</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Nome Completo</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="João Silva"
            />
          </div>
          <div>
            <Label htmlFor="phone">Telefone</Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="(11) 98765-4321"
            />
          </div>
        </div>
        <div className="mt-4">
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="joao@email.com"
          />
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-semibold mb-2">Endereço de Entrega</h3>
        <div>
          <Label htmlFor="cep">CEP</Label>
          <Input
            id="cep"
            name="cep"
            value={formData.cep}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '');
              setFormData(prev => ({ ...prev, cep: value }));
              if (value.length === 8) {
                buscarEndereco(value);
              }
            }}
            placeholder="01234567"
            maxLength={8}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div className="md:col-span-2">
            <Label htmlFor="address">Endereço</Label>
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Rua das Flores"
            />
          </div>
          <div>
            <Label htmlFor="number">Número</Label>
            <Input
              id="number"
              name="number"
              value={formData.number}
              onChange={handleInputChange}
              placeholder="123"
            />
          </div>
          <div>
            <Label htmlFor="complement">Complemento</Label>
            <Input
              id="complement"
              name="complement"
              value={formData.complement}
              onChange={handleInputChange}
              placeholder="Apto 101"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-4">
          <div>
            <Label htmlFor="neighborhood">Bairro</Label>
            <Input
              id="neighborhood"
              name="neighborhood"
              value={formData.neighborhood}
              onChange={handleInputChange}
              placeholder="Centro"
            />
          </div>
          <div>
            <Label htmlFor="city">Cidade</Label>
            <Input
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              placeholder="São Paulo"
            />
          </div>
          <div>
            <Label htmlFor="state">Estado</Label>
            <Input
              id="state"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              placeholder="SP"
              maxLength={2}
            />
          </div>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Button 
          variant="outline" 
          className="flex-1"
          onClick={() => setShowDeliveryDialog(false)}
        >
          Cancelar
        </Button>
        <Button 
          className="ml-button-primary flex-1 bg-blue-600 hover:bg-blue-700"
          onClick={() => {
            setShowDeliveryDialog(false)
            toast({
              title: "Dados de entrega salvos!",
              description: "Suas informações foram armazenadas com sucesso.",
            })
          }}
        >
          Confirmar Dados
        </Button>
      </div>
    </div>
  )

  const discount = product.originalPrice > product.price 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="ml-container py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para todos os produtos
          </Link>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Product Image Section */}
          <div className="space-y-4">
            <Card className="ml-product-card overflow-hidden">
              <div className="relative">
                <Carousel
                  opts={{
                    align: "start",
                  }}
                  className="w-full"
                >
                  <CarouselContent>
                    {product.images.map((image, index) => (
                      <CarouselItem key={index}>
                        <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center overflow-hidden">
                          <ProductImage
                            src={image}
                            alt={`${product.name} - Vista ${index + 1}`}
                            className="w-full h-full"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="ml-4" />
                  <CarouselNext className="mr-4" />
                </Carousel>
              </div>
            </Card>

            {/* Product Highlights */}
            <Card className="ml-product-card">
              <CardHeader>
                <CardTitle className="text-lg">Destaques do Produto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Product Details and Form Section */}
          <div className="space-y-6">
            {/* Product Info */}
            <Card className="ml-product-card">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-2 sm:gap-4">
                    <div className="flex-shrink-0">
                      <img 
                        src={getBrandLogo(product.brand)} 
                        alt={product.brand} 
                        className="h-8 sm:h-12 w-auto"
                      />
                    </div>
                    <div>
                      <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                        {product.name}
                      </CardTitle>
                      <Badge variant="outline" className="mb-4 text-xs sm:text-sm">
                        {product.brand} {product.model} • {product.size}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Pricing Section */}
                <div className="space-y-3">
                  <div className="flex items-baseline gap-2 sm:gap-3">
                    <span className="ml-price text-2xl sm:text-3xl font-bold text-green-600">
                      <span className="ml-price-symbol text-lg sm:text-xl">R$</span>
                      {formatPrice(getFinalPrice()).replace('R$', '').trim()}
                    </span>
                    {discount > 0 && (
                      <span className="text-sm sm:text-lg text-gray-500 line-through">
                        R$ {formatPrice(product.originalPrice).replace('R$', '').trim()}
                      </span>
                    )}
                  </div>
                  {discount > 0 && (
                    <Badge className="bg-red-100 text-red-800 animate-pulse text-xs sm:text-sm">
                      {discount}% OFF
                    </Badge>
                  )}
                  <div className="space-y-1">
                    <p className="text-xs sm:text-sm text-gray-600">
                      Preço por {selectedQuantity} pneu(s)
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600">
                      Preço unitário: {formatPrice(product.unitPrice)}
                    </p>
                    <p className="text-xs sm:text-sm font-semibold text-green-600">
                      ✅ Frete Grátis
                    </p>
                    {discountAmount > 0 && (
                      <p className="text-xs sm:text-sm font-semibold text-blue-600">
                        🎫 Cupom aplicado: -R$ {discountAmount.toFixed(2).replace('.', ',')}
                      </p>
                    )}
                  </div>

                  {/* Coupon Section */}
                  <div className="border-t pt-3">
                    <h4 className="font-semibold text-sm sm:text-base mb-2 flex items-center gap-2">
                      <Tag className="w-4 h-4" />
                      Cupom de Desconto
                    </h4>
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Código do cupom"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          className="flex-1 text-sm"
                        />
                        {discountAmount > 0 ? (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={handleCouponRemove}
                            className="text-xs"
                          >
                            Remover
                          </Button>
                        ) : (
                          <Button 
                            size="sm"
                            onClick={handleCouponApply}
                            className="text-xs"
                          >
                            Aplicar
                          </Button>
                        )}
                      </div>
                    </div>
                  </div> 
                </div>

                {/* Quantity Selector */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-sm sm:text-base">Selecione a quantidade:</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[1, 2, 3, 4].map((qty) => (
                      <Button
                        key={qty}
                        variant={selectedQuantity === qty ? "default" : "outline"}
                        className="h-10 sm:h-12 text-sm"
                        onClick={() => handleQuantityChange(qty)}
                      >
                        {qty} {qty === 1 ? 'pneu' : 'pneus'}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Dialog open={showDeliveryDialog} onOpenChange={setShowDeliveryDialog}>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          className="w-full flex items-center gap-2 h-12 sm:h-auto"
                        >
                          <Truck className="w-4 h-4" />
                          <span className="text-sm sm:text-base">Dados de Entrega</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Dados de Entrega</DialogTitle>
                          <DialogDescription>
                            Preencha suas informações para entrega
                          </DialogDescription>
                        </DialogHeader>
                        <DeliveryForm />
                      </DialogContent>
                    </Dialog>
                    <MercadoPagoButton 
                      className="h-12 sm:h-auto" 
                      quantity={selectedQuantity}
                      productName={product.name}
                      unitPrice={product.unitPrice}
                      discountAmount={discountAmount}
                    />
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="text-xs">
                    <Shield className="w-3 h-3 mr-1" />
                    Compra Segura
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    <Truck className="w-3 h-3 mr-1" />
                    Entrega Rápida
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Qualidade Garantida
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Product Description */}
            <Card className="ml-product-card">
              <CardHeader>
                <CardTitle className="text-lg">Descrição do Produto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-700 leading-relaxed">
                  {product.description}
                </p>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Especificações Técnicas:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Marca: {product.brand}</li>
                    <li>• Modelo: {product.model}</li>
                    <li>• Medida: {product.size}</li>
                    <li>• Categoria: {product.category.replace('pneus-', '').replace('-', ' ')}</li>
                    <li>• Avaliação: {product.rating}/5 ({product.reviews} avaliações)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Related Products */}
            <Card className="ml-product-card">
              <CardHeader>
                <CardTitle className="text-lg">Produtos Relacionados</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Veja mais produtos da mesma categoria ou marcas similares.
                </p>
                <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mt-2 text-sm">
                  Ver todos os produtos →
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
      <WhatsAppBalloon />
    </div>
  )
}