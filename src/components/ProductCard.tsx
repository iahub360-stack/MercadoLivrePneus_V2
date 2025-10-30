'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Star, ShoppingCart, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

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
  images: string[]
  rating: number
  reviews: number
  tags: string[]
  mercadopagoLink: string
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const discount = product.originalPrice > product.price 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  const getCategoryLabel = (category: string) => {
    const labels: { [key: string]: string } = {
      'pneus-carro': 'Carro',
      'pneus-suv': 'Camioneta',
      'pneus-4x4': '4x4',
      'pneus-esportivo': 'Esportivo',
      'pneus-caminhao': 'Caminhão',
      'pneus-moto': 'Moto',
      'pneus-agricola': 'Agrícola'
    }
    return labels[category] || category
  }

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'pneus-carro': 'bg-blue-100 text-blue-800',
      'pneus-suv': 'bg-green-100 text-green-800',
      'pneus-4x4': 'bg-orange-100 text-orange-800',
      'pneus-esportivo': 'bg-red-100 text-red-800',
      'pneus-caminhao': 'bg-purple-100 text-purple-800',
      'pneus-moto': 'bg-yellow-100 text-yellow-800',
      'pneus-agricola': 'bg-amber-100 text-amber-800'
    }
    return colors[category] || 'bg-gray-100 text-gray-800'
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
      <div className="relative">
        {/* Imagem do Produto */}
        <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden">
          <Image
            src={product.images[0] || '/images/tires/xbri-brutus-1.png'}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        {/* Badge de Desconto */}
        {discount > 0 && (
          <div className="absolute top-2 left-2">
            <Badge className="bg-red-500 text-white animate-pulse">
              {discount}% OFF
            </Badge>
          </div>
        )}
        
        {/* Badge de Categoria */}
        <div className="absolute top-2 right-2">
          <Badge className={getCategoryColor(product.category)}>
            {getCategoryLabel(product.category)}
          </Badge>
        </div>
        
        {/* Badge de Oferta - Frete Grátis */}
        <div className="absolute bottom-2 left-2">
          <Badge className="bg-green-500 text-white text-xs font-bold animate-pulse">
            Frete Grátis
          </Badge>
        </div>
      </div>
      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-bold line-clamp-2 mb-1">
              {product.name}
            </CardTitle>
            <p className="text-sm text-gray-600">
              {product.brand} {product.model} • {product.size}
            </p>
          </div>
        </div>
        
        {/* Avaliação */}
        <div className="flex items-center gap-1">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">
            {product.rating} ({product.reviews})
          </span>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0 space-y-4">
        {/* Preço */}
        <div className="space-y-1">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-green-600">
              {formatPrice(product.price)}
            </span>
            {discount > 0 && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600">
            Preço unitário
          </p>
          <div className="border-t pt-2">
            <p className="text-lg font-semibold text-blue-600">
              Kit 4 Pneus: {formatPrice(product.price * 4)}
            </p>
          </div>
        </div>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {product.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        
        {/* Botões de Ação */}
        <div className="flex gap-2">
          <Link href={`/produto/${product.slug}`} className="flex-1">
            <Button 
              variant="outline" 
              className="w-full h-10 text-sm"
              size="sm"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Ver Detalhes
            </Button>
          </Link>
          <Link href={`/produto/${product.slug}`} className="flex-1">
            <Button 
              className="flex-1 h-10 text-sm bg-[#00B0E8] hover:bg-[#0090C8]"
              size="sm"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Comprar
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}