import { NextRequest, NextResponse } from 'next/server'
import products from '../../../../data/products.json'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get('category')
    const sort = searchParams.get('sort')
    const search = searchParams.get('search')

    let filteredProducts = [...products]

    // Filtrar por categoria
    if (category && category !== 'todos') {
      filteredProducts = filteredProducts.filter(product => product.category === category)
    }

    // Filtrar por busca
    if (search) {
      const searchTerm = search.toLowerCase()
      filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.brand.toLowerCase().includes(searchTerm) ||
        product.model.toLowerCase().includes(searchTerm)
      )
    }

    // Ordenar produtos
    if (sort) {
      switch (sort) {
        case 'price-asc':
          filteredProducts.sort((a, b) => a.price - b.price)
          break
        case 'price-desc':
          filteredProducts.sort((a, b) => b.price - a.price)
          break
        case 'rating':
          filteredProducts.sort((a, b) => b.rating - a.price)
          break
        case 'name':
        default:
          filteredProducts.sort((a, b) => a.name.localeCompare(b.name))
      }
    }

    return NextResponse.json(filteredProducts)
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}