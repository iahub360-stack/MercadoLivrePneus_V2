'use client'

import { ProductCard } from './ProductCard'

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

interface ProductGridProps {
  products: Product[]
  title?: string
  className?: string
}

export function ProductGrid({ products, title, className = "" }: ProductGridProps) {
  return (
    <div className={`space-y-6 ${className}`}>
      {title && (
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Encontre os melhores pneus para seu veículo com preços imbatíveis e entrega rápida
          </p>
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Nenhum produto encontrado.</p>
        </div>
      )}
    </div>
  )
}