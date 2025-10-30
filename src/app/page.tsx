'use client'

import { useState, useEffect } from 'react'
import { ProductGrid } from '@/components/ProductGrid'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { HeroCarousel } from '@/components/HeroCarousel'
import { WhatsAppBalloon } from '@/components/WhatsAppBalloon'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Search, 
  Filter, 
  Truck, 
  Shield, 
  CreditCard, 
  Star,
  TrendingUp,
  Award,
  Users
} from 'lucide-react'
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

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('todos')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'rating' | 'name'>('name')

  // Carregar produtos do JSON
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch('/api/products')
        const data = await response.json()
        setProducts(data)
        setFilteredProducts(data)
      } catch (error) {
        console.error('Error loading products:', error)
      }
    }
    loadProducts()
  }, [])

  // Filtrar e ordenar produtos
  useEffect(() => {
    let filtered = products

    // Filtrar por categoria
    if (selectedCategory !== 'todos') {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }

    // Filtrar por busca
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.model.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Ordenar produtos
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price
        case 'price-desc':
          return b.price - a.price
        case 'rating':
          return b.rating - a.rating
        case 'name':
        default:
          return a.name.localeCompare(b.name)
      }
    })

    setFilteredProducts(filtered)
  }, [products, selectedCategory, searchTerm, sortBy])

  const categories = [
    { id: 'todos', name: 'Todos os Pneus', count: products.length },
    { id: 'pneus-carro', name: 'Carro', count: products.filter(p => p.category === 'pneus-carro').length },
    { id: 'pneus-suv', name: 'Camioneta', count: products.filter(p => p.category === 'pneus-suv').length },
    { id: 'pneus-4x4', name: '4x4', count: products.filter(p => p.category === 'pneus-4x4').length },
    { id: 'pneus-esportivo', name: 'Esportivo', count: products.filter(p => p.category === 'pneus-esportivo').length },
    { id: 'pneus-caminhao', name: 'Caminhão', count: products.filter(p => p.category === 'pneus-caminhao').length },
    { id: 'pneus-moto', name: 'Moto', count: products.filter(p => p.category === 'pneus-moto').length },
    { id: 'pneus-agricola', name: 'Agrícola', count: products.filter(p => p.category === 'pneus-agricola').length }
  ]

  const featuredProducts = products.filter(p => p.rating >= 4.7).slice(0, 6)
  const bestSellers = products.sort((a, b) => b.reviews - a.reviews).slice(0, 6)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section with Carousel */}
      <HeroCarousel />

      {/* Categories Section */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Categorias de Pneus</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Encontre os pneus perfeitos para seu veículo em nossa seleção por categorias
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {/* Pneus Camioneta */}
            <Card className="group cursor-pointer hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-green-400 to-green-600 overflow-hidden">
                  <Image
                    src="/images/categories/camioneta-cerrado.png"
                    alt="Pneus Camioneta"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-2 text-white text-center">
                    <h3 className="text-sm font-bold mb-1">Camioneta</h3>
                  </div>
                </div>
              </div>
              <CardContent className="p-3">
                <Button 
                  variant="outline" 
                  className="w-full text-xs h-8"
                  onClick={() => setSelectedCategory('pneus-suv')}
                >
                  Ver Pneus
                </Button>
              </CardContent>
            </Card>
            
            {/* Pneus Caminhão */}
            <Card className="group cursor-pointer hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-blue-400 to-blue-600 overflow-hidden">
                  <Image
                    src="/images/categories/caminhao-br.png"
                    alt="Pneus Caminhão"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-2 text-white text-center">
                    <h3 className="text-sm font-bold mb-1">Caminhão</h3>
                  </div>
                </div>
              </div>
              <CardContent className="p-3">
                <Button 
                  variant="outline" 
                  className="w-full text-xs h-8"
                  onClick={() => setSelectedCategory('pneus-caminhao')}
                >
                  Ver Pneus
                </Button>
              </CardContent>
            </Card>
            
            {/* Pneus Moto */}
            <Card className="group cursor-pointer hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 overflow-hidden relative">
              <div className="absolute top-1 right-1 z-10">
                <Badge className="bg-yellow-500 text-white text-xs font-bold">
                  Brevemente
                </Badge>
              </div>
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-red-400 to-red-600 overflow-hidden">
                  <Image
                    src="/images/categories/motos-estacionamento.png"
                    alt="Pneus Moto"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-2 text-white text-center">
                    <h3 className="text-sm font-bold mb-1">Moto</h3>
                  </div>
                </div>
              </div>
              <CardContent className="p-3">
                <Button 
                  variant="outline" 
                  className="w-full text-xs h-8"
                  disabled
                >
                  Em Breve
                </Button>
              </CardContent>
            </Card>
            
            {/* Pneus Carro */}
            <Card className="group cursor-pointer hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 overflow-hidden relative">
              <div className="absolute top-1 right-1 z-10">
                <Badge className="bg-yellow-500 text-white text-xs font-bold">
                  Brevemente
                </Badge>
              </div>
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-purple-400 to-purple-600 overflow-hidden">
                  <Image
                    src="/images/categories/carros-cidade.png"
                    alt="Pneus Carro"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-2 text-white text-center">
                    <h3 className="text-sm font-bold mb-1">Carro</h3>
                  </div>
                </div>
              </div>
              <CardContent className="p-3">
                <Button 
                  variant="outline" 
                  className="w-full text-xs h-8"
                  disabled
                >
                  Em Breve
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="destaques" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Produtos em Destaque</h2>
            <p className="text-gray-600">
              Nossos pneus mais bem avaliados e preferidos pelos clientes
            </p>
          </div>
          
          <ProductGrid products={featuredProducts} className="mb-16" />
        </div>
      </section>

      {/* All Products Section */}
      <section id="produtos" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Todos os Pneus</h2>
            <p className="text-gray-600">
              Nossa seleção completa de pneus para todos os tipos de veículos
            </p>
          </div>

          {/* Filters and Search */}
          <div className="mb-8 space-y-6">
            {/* Search Bar */}
            <div className="max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar pneus, marcas, modelos..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  className="h-10"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name} ({category.count})
                </Button>
              ))}
            </div>

            {/* Sort Options */}
            <div className="flex justify-center">
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
              >
                <option value="name">Ordenar por Nome</option>
                <option value="price-asc">Preço: Menor para Maior</option>
                <option value="price-desc">Preço: Maior para Menor</option>
                <option value="rating">Melhor Avaliados</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          <ProductGrid products={filteredProducts} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Pronto para Encontrar os Pneus Perfeitos?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Navegue por nossa seleção e encontre os melhores pneus para seu veículo
          </p>
          <Link href="#produtos">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Comprar Agora
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
      <WhatsAppBalloon />
    </div>
  )
}