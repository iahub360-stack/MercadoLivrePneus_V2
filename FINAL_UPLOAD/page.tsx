import { notFound } from 'next/navigation'
import { ProductPageContent } from './ProductPageContent'

async function getProduct(slug: string) {
  try {
    // Use full URL for server-side fetching
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
    const apiUrl = `${baseUrl}/api/products`
    
    console.log('Fetching products from:', apiUrl)
    
    const response = await fetch(apiUrl, {
      cache: 'no-store', // Avoid caching issues
      headers: {
        'Content-Type': 'application/json',
      }
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    console.log('API response type:', typeof data, 'isArray:', Array.isArray(data))
    
    // Handle different response formats
    const products = Array.isArray(data) ? data : (data.data || [])
    console.log('Products length:', products.length)
    
    const product = products.find((p: any) => p.slug === slug)
    console.log('Found product:', product ? 'yes' : 'no')
    
    if (!product) {
      return null
    }
    
    return product
  } catch (error) {
    console.error('Error loading product:', error)
    return null
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = await getProduct(slug)
  
  if (!product) {
    notFound()
  }
  
  return <ProductPageContent product={product} />
}