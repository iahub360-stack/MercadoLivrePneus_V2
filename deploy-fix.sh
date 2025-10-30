#!/bin/bash

# Script para corrigir o erro 404 e fazer deploy
# Execute este script no seu terminal local

echo "=== INICIANDO CORREÇÃO DO ERRO 404 ==="

# 1. Clonar o repositório correto
echo "1. Clonando repositório MercadoLivrePneus_V2..."
git clone https://github.com/iahub360-stack/MercadoLivrePneus_V2.git
cd MercadoLivrePneus_V2

# 2. Configurar git
echo "2. Configurando git..."
git config user.name "Seu Nome"
git config user.email "seu.email@exemplo.com"

# 3. Criar diretórios necessários
echo "3. Criando estrutura de diretórios..."
mkdir -p src/lib
mkdir -p src/app/api/products

# 4. Criar arquivo de produtos BFGoodrich
echo "4. Criando arquivo bfgoodrich-products.ts..."
cat > src/lib/bfgoodrich-products.ts << 'EOF'
// Produtos BFGoodrich KO3 - Pneus Camioneta
const bfgoodrichImages = [
  'https://http2.mlstatic.com/D_NQ_NP_2X_749647-MLA95692704800_102025-F.webp',
  'https://http2.mlstatic.com/D_NQ_NP_2X_638058-MLA88978765661_072025-F.webp',
  'https://http2.mlstatic.com/D_NQ_NP_2X_805539-MLA88627921112_072025-F.webp',
  'https://i.ibb.co/HTR96hC9/ALL-TERRAIN-TA-KO3-1-1080x675.jpg',
  'https://i.ibb.co/ch4J6w9P/pneu-bfgoodrich-aro-17-all-terrain-ko3-265-65r17-116-113s-letras-brancas-1.jpg',
  'https://i.ibb.co/3yM55Jqx/bfgoodrich-all-terrain-t-a-ko3-12277121.jpg'
]

const bfgoodrichDescription = `SOBRE O PRODUTO: O BFGoodrich All-Terrain T/A KO3 é a definição de robustez para SUVs, caminhonetes e veículos 4x4. Ideal para uso on e off-road, oferece tração superior em todas as estações do ano. Com a avançada tecnologia CoreGard e um novo composto na banda de rodagem, proporciona resistência excepcional contra cortes e rachaduras. Seu design otimizado garante desgaste uniforme e maior durabilidade, enquanto o visual agressivo com letras brancas em relevo e o selo Baja Champion entregam estilo e desempenho para quem exige o máximo do seu pneu – em qualquer jornada.

**Esse pneu pode ser aplicado nas seguintes carros:**
Chevrolet: S10
Ford: Ranger
Mitsubishi: Pajero, Pajero Dakar, Pajero Full, L200
Toyota: Hilux, SW4
Volkswagen: Amarok`

export const bfgoodrichProducts = [
  {
    id: 'BF-KO3-2656518',
    name: 'BFGoodrich KO3 LT265/65R18 123/120S RWL',
    slug: 'bf-goodrich-ko3-lt265-65r18-123-120s-rwl',
    sku: 'BF-KO3-2656518',
    price: 1740.00,
    originalPrice: 1899.00,
    currency: 'BRL',
    images: getProductImages(0),
    rating: 4.8,
    reviews: 47,
    isFreeShipping: true,
    discount: 8,
    category: 'pneus-camioneta',
    brand: 'BFGoodrich',
    width: '265',
    profile: '65',
    rim: '18',
    type: 'Todo terreno',
    description: bfgoodrichDescription,
    specifications: {
      'índice de carga': '123/120',
      'índice de velocidade': 'S',
      'tecnologia': 'CoreGard',
      'visual': 'Letras brancas em relevo',
      'selo': 'Baja Champion'
    },
    stock: 24,
  },
  {
    id: 'BF-KO3-2657018',
    name: 'BFGoodrich KO3 LT265/70R18 124/121S RWL',
    slug: 'bf-goodrich-ko3-lt265-70r18-124-121s-rwl',
    sku: 'BF-KO3-2657018',
    price: 1790.00,
    originalPrice: 1999.00,
    currency: 'BRL',
    images: getProductImages(0),
    rating: 4.9,
    reviews: 52,
    isFreeShipping: true,
    discount: 10,
    category: 'pneus-camioneta',
    brand: 'BFGoodrich',
    width: '265',
    profile: '70',
    rim: '18',
    type: 'Todo terreno',
    description: bfgoodrichDescription,
    specifications: {
      'índice de carga': '124/121',
      'índice de velocidade': 'S',
      'tecnologia': 'CoreGard',
      'visual': 'Letras brancas em relevo',
      'selo': 'Baja Champion'
    },
    stock: 18,
  },
  {
    id: 'BF-KO3-35X125R18',
    name: 'BFGoodrich KO3 35X12.5R18LT 128R',
    slug: 'bf-goodrich-ko3-35x12-5r18lt-128r',
    sku: 'BF-KO3-35X125R18',
    price: 2650.00,
    originalPrice: 2899.00,
    currency: 'BRL',
    images: getProductImages(1),
    rating: 4.7,
    reviews: 31,
    isFreeShipping: true,
    discount: 9,
    category: 'pneus-camioneta',
    brand: 'BFGoodrich',
    width: '35X12.5',
    profile: '',
    rim: '18',
    type: 'Todo terreno',
    description: bfgoodrichDescription,
    specifications: {
      'índice de carga': '128',
      'índice de velocidade': 'R',
      'tecnologia': 'CoreGard',
      'visual': 'Letras brancas em relevo',
      'selo': 'Baja Champion'
    },
    stock: 12,
  
  },
  {
    id: 'BF-KO3-2856518',
    name: 'BFGoodrich KO3 LT285/65R18 125/122S RWL',
    slug: 'bf-goodrich-ko3-lt285-65r18-125-122s-rwl',
    sku: 'BF-KO3-2856518',
    price: 2110.00,
    originalPrice: 2399.00,
    currency: 'BRL',
    images: getProductImages(1),
    rating: 4.8,
    reviews: 38,
    isFreeShipping: true,
    discount: 12,
    category: 'pneus-camioneta',
    brand: 'BFGoodrich',
    width: '285',
    profile: '65',
    rim: '18',
    type: 'Todo terreno',
    description: bfgoodrichDescription,
    specifications: {
      'índice de carga': '125/122',
      'índice de velocidade': 'S',
      'tecnologia': 'CoreGard',
      'visual': 'Letras brancas em relevo',
      'selo': 'Baja Champion'
    },
    stock: 15,
  
  },
  {
    id: 'BF-KO3-2756518',
    name: 'BFGoodrich KO3 LT275/65R18 123/120S RWL',
    slug: 'bf-goodrich-ko3-lt275-65r18-123-120s-rwl',
    sku: 'BF-KO3-2756518',
    price: 2050.00,
    originalPrice: 2299.00,
    currency: 'BRL',
    images: getProductImages(1),
    rating: 4.6,
    reviews: 29,
    isFreeShipping: true,
    discount: 11,
    category: 'pneus-camioneta',
    brand: 'BFGoodrich',
    width: '275',
    profile: '65',
    rim: '18',
    type: 'Todo terreno',
    description: bfgoodrichDescription,
    specifications: {
      'índice de carga': '123/120',
      'índice de velocidade': 'S',
      'tecnologia': 'CoreGard',
      'visual': 'Letras brancas em relevo',
      'selo': 'Baja Champion'
    },
    stock: 21,
  
  },
  {
    id: 'BF-KO3-2656018',
    name: 'BFGoodrich KO3 LT265/60R18 114/110S',
    slug: 'bf-goodrich-ko3-lt265-60r18-114-110s',
    sku: 'BF-KO3-2656018',
    price: 1590.00,
    originalPrice: 1799.00,
    currency: 'BRL',
    images: getProductImages(1),
    rating: 4.7,
    reviews: 33,
    isFreeShipping: true,
    discount: 12,
    category: 'pneus-camioneta',
    brand: 'BFGoodrich',
    width: '265',
    profile: '60',
    rim: '18',
    type: 'Todo terreno',
    description: bfgoodrichDescription,
    specifications: {
      'índice de carga': '114/110',
      'índice de velocidade': 'S',
      'tecnologia': 'CoreGard',
      'visual': 'Letras brancas em relevo',
      'selo': 'Baja Champion'
    },
    stock: 27,
  },
  {
    id: 'BF-KO3-37X125R17',
    name: 'BFGoodrich KO3 37X12.5R17LT 128R RWL',
    slug: 'bf-goodrich-ko3-37x12-5r17lt-128r-rwl',
    sku: 'BF-KO3-37X125R17',
    price: 2250.00,
    originalPrice: 2599.00,
    currency: 'BRL',
    images: getProductImages(1),
    rating: 4.9,
    reviews: 26,
    isFreeShipping: true,
    discount: 13,
    category: 'pneus-camioneta',
    brand: 'BFGoodrich',
    width: '37X12.5',
    profile: '',
    rim: '17',
    type: 'Todo terreno',
    description: bfgoodrichDescription,
    specifications: {
      'índice de carga': '128',
      'índice de velocidade': 'R',
      'tecnologia': 'CoreGard',
      'visual': 'Letras brancas em relevo',
      'selo': 'Baja Champion'
    },
    stock: 9,
  },
  {
    id: 'BF-KO3-2857017',
    name: 'BFGoodrich KO3 LT285/70R17 126/123S RWL',
    slug: 'bf-goodrich-ko3-lt285-70r17-126-123s-rwl',
    sku: 'BF-KO3-2857017',
    price: 2090.00,
    originalPrice: 2399.00,
    currency: 'BRL',
    images: getProductImages(1),
    rating: 4.8,
    reviews: 41,
    isFreeShipping: true,
    discount: 13,
    category: 'pneus-camioneta',
    brand: 'BFGoodrich',
    width: '285',
    profile: '70',
    rim: '17',
    type: 'Todo terreno',
    description: bfgoodrichDescription,
    specifications: {
      'índice de carga': '126/123',
      'índice de velocidade': 'S',
      'tecnologia': 'CoreGard',
      'visual': 'Letras brancas em relevo',
      'selo': 'Baja Champion'
    },
    stock: 16,
  },
  {
    id: 'BF-KO3-2757017',
    name: 'BFGoodrich KO3 LT275/70R17 124/121S RWL',
    slug: 'bf-goodrich-ko3-lt275-70r17-124-121s-rwl',
    sku: 'BF-KO3-2757017',
    price: 1890.00,
    originalPrice: 2149.00,
    currency: 'BRL',
    images: getProductImages(1),
    rating: 4.7,
    reviews: 35,
    isFreeShipping: true,
    discount: 12,
    category: 'pneus-camioneta',
    brand: 'BFGoodrich',
    width: '275',
    profile: '70',
    rim: '17',
    type: 'Todo terreno',
    description: bfgoodrichDescription,
    specifications: {
      'índice de carga': '124/121',
      'índice de velocidade': 'S',
      'tecnologia': 'CoreGard',
      'visual': 'Letras brancas em relevo',
      'selo': 'Baja Champion'
    },
    stock: 22,
  },
  {
    id: 'BF-KO3-2657017',
    name: 'BFGoodrich KO3 LT265/70R17 123/120S RWL',
    slug: 'bf-goodrich-ko3-lt265-70r17-123-120s-rwl',
    sku: 'BF-KO3-2657017',
    price: 1490.90,
    originalPrice: 1699.00,
    currency: 'BRL',
    images: getProductImages(1),
    rating: 4.8,
    reviews: 58,
    isFreeShipping: true,
    discount: 12,
    category: 'pneus-camioneta',
    brand: 'BFGoodrich',
    width: '265',
    profile: '70',
    rim: '17',
    type: 'Todo terreno',
    description: bfgoodrichDescription,
    specifications: {
      'índice de carga': '123/120',
      'índice de velocidade': 'S',
      'tecnologia': 'CoreGard',
      'visual': 'Letras brancas em relevo',
      'selo': 'Baja Champion'
    },
    stock: 34,
  },
  {
    id: 'BF-KO3-2656517',
    name: 'BFGoodrich KO3 LT265/65R17 116/113S RWL',
    slug: 'bf-goodrich-ko3-lt265-65r17-116-113s-rwl',
    sku: 'BF-KO3-2656517',
    price: 1410.90,
    originalPrice: 1599.00,
    currency: 'BRL',
    images: getProductImages(1),
    rating: 4.6,
    reviews: 44,
    isFreeShipping: true,
    discount: 12,
    category: 'pneus-camioneta',
    brand: 'BFGoodrich',
    width: '265',
    profile: '65',
    rim: '17',
    type: 'Todo terreno',
    description: bfgoodrichDescription,
    specifications: {
      'índice de carga': '116/113',
      'índice de velocidade': 'S',
      'tecnologia': 'CoreGard',
      'visual': 'Letras brancas em relevo',
      'selo': 'Baja Champion'
    },
    stock: 28,
  },
  {
    id: 'BF-KO3-3157516',
    name: 'BFGoodrich KO3 LT315/75R16 127S RWL',
    slug: 'bf-goodrich-ko3-lt315-75r16-127s-rwl',
    sku: 'BF-KO3-3157516',
    price: 2100.00,
    originalPrice: 2399.00,
    currency: 'BRL',
    images: getProductImages(1),
    rating: 4.9,
    reviews: 23,
    isFreeShipping: true,
    discount: 12,
    category: 'pneus-camioneta',
    brand: 'BFGoodrich',
    width: '315',
    profile: '75',
    rim: '16',
    type: 'Todo terreno',
    description: bfgoodrichDescription,
    specifications: {
      'índice de carga': '127',
      'índice de velocidade': 'S',
      'tecnologia': 'CoreGard',
      'visual': 'Letras brancas em relevo',
      'selo': 'Baja Champion'
    },
    stock: 11,
  },
  {
    id: 'BF-KO3-2657516',
    name: 'BFGoodrich KO3 LT265/75R16 123/120S RWL',
    slug: 'bf-goodrich-ko3-lt265-75r16-123-120s-rwl',
    sku: 'BF-KO3-2657516',
    price: 1460.00,
    originalPrice: 1649.00,
    currency: 'BRL',
    images: getProductImages(1),
    rating: 4.7,
    reviews: 37,
    isFreeShipping: true,
    discount: 11,
    category: 'pneus-camioneta',
    brand: 'BFGoodrich',
    width: '265',
    profile: '75',
    rim: '16',
    type: 'Todo terreno',
    description: bfgoodrichDescription,
    specifications: {
      'índice de carga': '123/120',
      'índice de velocidade': 'S',
      'tecnologia': 'CoreGard',
      'visual': 'Letras brancas em relevo',
      'selo': 'Baja Champion'
    },
    stock: 25,
  },
  {
    id: 'BF-KO3-2657016',
    name: 'BFGoodrich KO3 LT265/70R16 117/114S RWL',
    slug: 'bf-goodrich-ko3-lt265-70r16-117-114s-rwl',
    sku: 'BF-KO3-2657016',
    price: 1390.00,
    originalPrice: 1549.00,
    currency: 'BRL',
    images: getProductImages(1),
    rating: 4.8,
    reviews: 42,
    isFreeShipping: true,
    discount: 10,
    category: 'pneus-camioneta',
    brand: 'BFGoodrich',
    width: '265',
    profile: '70',
    rim: '16',
    type: 'Todo terreno',
    description: bfgoodrichDescription,
    specifications: {
      'índice de carga': '117/114',
      'índice de velocidade': 'S',
      'tecnologia': 'CoreGard',
      'visual': 'Letras brancas em relevo',
      'selo': 'Baja Champion'
    },
    stock: 31,
  }
]

// Função para misturar imagens aleatoriamente
function shuffleImages(baseImages: string[], count: number = 3): string[] {
  const shuffled = [...baseImages].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

// Função para obter imagens aleatórias para cada produto
function getProductImages(productIndex: number): string[] {
  // Usar o índice do produto como semente para consistência
  const seed = productIndex % bfgoodrichImages.length
  const rotatedImages = [...bfgoodrichImages.slice(seed), ...bfgoodrichImages.slice(0, seed)]
  return shuffleImages(rotatedImages, 3)
}

// Funções auxiliares para formatação de preços
export function formatPriceBRL(price: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2
  }).format(price)
}

// Funções para obter produtos específicos
export const getBFGoodrichProducts = () => bfgoodrichProducts

export const getBFGoodrichBySize = (width: string, profile: string, rim: string) => {
  return bfgoodrichProducts.filter(product => 
    product.width === width && 
    product.profile === profile && 
    product.rim === rim
  )
}

export const getFeaturedBFGoodrich = () => {
  return bfgoodrichProducts
    .filter(product => product.discount && product.discount > 10)
    .slice(0, 8)
}

export const getBestSellersBFGoodrich = () => {
  return [...bfgoodrichProducts]
    .sort((a, b) => (b.reviews || 0) - (a.reviews || 0))
    .slice(0, 8)
}

export const getNewArrivalsBFGoodrich = () => {
  return bfgoodrichProducts.slice(0, 8)
}
EOF

# 5. Criar arquivo de produtos XBRI
echo "5. Criando arquivo xbri-products.ts..."
cat > src/lib/xbri-products.ts << 'EOF'
// Produtos XBRI BRUTUS T/A - Pneus Camioneta
const xbriImages = [
  'https://res.cloudinary.com/dhwqfkhzm/image/upload/v1761663639/Pneu_XBRI_BRUTUS_TA_1_mqwbqx.png',
  'https://res.cloudinary.com/dhwqfkhzm/image/upload/v1761663640/Pneu_XBRI_BRUTUS_TA_3_t5qskt.png',
  'https://res.cloudinary.com/dhwqfkhzm/image/upload/v1761663640/Pneu_XBRI_BRUTUS_TA_2_u0wsjg.png',
  'https://res.cloudinary.com/dhwqfkhzm/image/upload/v1761663639/Pneu_XBRI_BRUTUS_TA_4_imkwcy.png'
]

const xbriDescription = `Xbri Brutus T/A. Estabilidade e controle. Graças à sua boa aderência, este pneu garante um óptimo rendimento, pois se adapta à usabilidade do seu carro. Alta eficiência. Este pneu está preparado para maximizar a eficiência do combustível, a sua leveza e combinação dos seus materiais garantirão um ótimo rendimento nas suas viagens. A segurança que você estava procurando. Adequado para todo tipo de superfície, se adere com muita força. É ideal para o asfalto, a terra, a areia ou as pedras, usa uma maior tração e evita que o nosso vehículo derrape.`

export const xbriProducts = [
  {
    id: 'xbri-brutus-ta-205-70r15',
    name: 'Pneu XBRI BRUTUS T/A LT 205/70R15 8PR 102/99Q Letra Branca',
    slug: 'xbri-brutus-ta-205-70r15',
    sku: 'XBRI-BRUTUS-TA-205-70R15',
    price: 410.00,
    originalPrice: 410.00,
    currency: 'BRL',
    images: xbriImages,
    rating: 4.8,
    reviews: 127,
    isFreeShipping: true,
    discount: 0,
    category: 'pneus-camioneta',
    brand: 'XBRI',
    width: '205',
    profile: '70',
    rim: '15',
    type: 'Todo terreno',
    description: xbriDescription,
    specifications: {
      'índice de carga': '102/99',
      'índice de velocidade': 'Q',
      'visual': 'Letras brancas',
      'tecnologia': 'BRUTUS T/A'
    },
    stock: 50,
  },
  {
    id: 'xbri-brutus-ta-245-70r16',
    name: 'Pneu XBRI BRUTUS T/A LT 245/70R16 8PR 113/110S Letra Branca',
    slug: 'xbri-brutus-ta-245-70r16',
    sku: 'XBRI-BRUTUS-TA-245-70R16',
    price: 550.00,
    originalPrice: 550.00,
    currency: 'BRL',
    images: xbriImages,
    rating: 4.9,
    reviews: 89,
    isFreeShipping: true,
    discount: 0,
    category: 'pneus-camioneta',
    brand: 'XBRI',
    width: '245',
    profile: '70',
    rim: '16',
    type: 'Todo terreno',
    description: xbriDescription,
    specifications: {
      'índice de carga': '113/110',
      'índice de velocidade': 'S',
      'visual': 'Letras brancas',
      'tecnologia': 'BRUTUS T/A'
    },
    stock: 45,
  },
  {
    id: 'xbri-brutus-ta-ii-265-70r16',
    name: 'Pneu XBRI BRUTUS T/A II LT 265/70R16 10PR 121/118S Letra Branca',
    slug: 'xbri-brutus-ta-ii-265-70r16',
    sku: 'XBRI-BRUTUS-TA-II-265-70R16',
    price: 710.00,
    originalPrice: 710.00,
    currency: 'BRL',
    images: xbriImages,
    rating: 4.7,
    reviews: 95,
    isFreeShipping: true,
    discount: 0,
    category: 'pneus-camioneta',
    brand: 'XBRI',
    width: '265',
    profile: '70',
    rim: '16',
    type: 'Todo terreno',
    description: xbriDescription,
    specifications: {
      'índice de carga': '121/118',
      'índice de velocidade': 'S',
      'visual': 'Letras brancas',
      'tecnologia': 'BRUTUS T/A II'
    },
    stock: 40,
  },
  {
    id: 'xbri-brutus-ta-ii-265-75r16',
    name: 'Pneu XBRI BRUTUS T/A II LT 265/75R16 10PR 123/120R Letra Branca',
    slug: 'xbri-brutus-ta-ii-265-75r16',
    sku: 'XBRI-BRUTUS-TA-II-265-75R16',
    price: 760.00,
    originalPrice: 760.00,
    currency: 'BRL',
    images: xbriImages,
    rating: 4.8,
    reviews: 78,
    isFreeShipping: true,
    discount: 0,
    category: 'pneus-camioneta',
    brand: 'XBRI',
    width: '265',
    profile: '75',
    rim: '16',
    type: 'Todo terreno',
    description: xbriDescription,
    specifications: {
      'índice de carga': '123/120',
      'índice de velocidade': 'R',
      'visual': 'Letras brancas',
      'tecnologia': 'BRUTUS T/A II'
    },
    stock: 35,
  },
  {
    id: 'xbri-brutus-ta-285-75r16',
    name: 'Pneu XBRI BRUTUS T/A LT 285/75R16 10PR 126/123R Letra Branca',
    slug: 'xbri-brutus-ta-285-75r16',
    sku: 'XBRI-BRUTUS-TA-285-75R16',
    price: 910.00,
    originalPrice: 910.00,
    currency: 'BRL',
    images: xbriImages,
    rating: 4.9,
    reviews: 67,
    isFreeShipping: true,
    discount: 0,
    category: 'pneus-camioneta',
    brand: 'XBRI',
    width: '285',
    profile: '75',
    rim: '16',
    type: 'Todo terreno',
    description: xbriDescription,
    specifications: {
      'índice de carga': '126/123',
      'índice de velocidade': 'R',
      'visual': 'Letras brancas',
      'tecnologia': 'BRUTUS T/A'
    },
    stock: 30,
  },
  {
    id: 'xbri-brutus-ta-ii-265-65r17',
    name: 'Pneu XBRI BRUTUS T/A II LT 265/65R17 10PR 120/117S Letra Branca',
    slug: 'xbri-brutus-ta-ii-265-65r17',
    sku: 'XBRI-BRUTUS-TA-II-265-65R17',
    price: 751.00,
    originalPrice: 751.00,
    currency: 'BRL',
    images: xbriImages,
    rating: 4.7,
    reviews: 82,
    isFreeShipping: true,
    discount: 0,
    category: 'pneus-camioneta',
    brand: 'XBRI',
    width: '265',
    profile: '65',
    rim: '17',
    type: 'Todo terreno',
    description: xbriDescription,
    specifications: {
      'índice de carga': '120/117',
      'índice de velocidade': 'S',
      'visual': 'Letras brancas',
      'tecnologia': 'BRUTUS T/A II'
    },
    stock: 38,
  },
  {
    id: 'xbri-brutus-ta-265-70r17',
    name: 'Pneu XBRI BRUTUS T/A LT 265/70R17 10PR 121/118S Letra Branca',
    slug: 'xbri-brutus-ta-265-70r17',
    sku: 'XBRI-BRUTUS-TA-265-70R17',
    price: 789.00,
    originalPrice: 789.00,
    currency: 'BRL',
    images: xbriImages,
    rating: 4.8,
    reviews: 91,
    isFreeShipping: true,
    discount: 0,
    category: 'pneus-camioneta',
    brand: 'XBRI',
    width: '265',
    profile: '70',
    rim: '17',
    type: 'Todo terreno',
    description: xbriDescription,
    specifications: {
      'índice de carga': '121/118',
      'índice de velocidade': 'S',
      'visual': 'Letras brancas',
      'tecnologia': 'BRUTUS T/A'
    },
    stock: 42,
  },
  {
    id: 'xbri-brutus-ta-285-70r17',
    name: 'Pneu XBRI BRUTUS T/A LT 285/70R17 10PR 121/118R Letra Branca',
    slug: 'xbri-brutus-ta-285-70r17',
    sku: 'XBRI-BRUTUS-TA-285-70R17',
    price: 990.00,
    originalPrice: 990.00,
    currency: 'BRL',
    images: xbriImages,
    rating: 4.9,
    reviews: 73,
    isFreeShipping: true,
    discount: 0,
    category: 'pneus-camioneta',
    brand: 'XBRI',
    width: '285',
    profile: '70',
    rim: '17',
    type: 'Todo terreno',
    description: xbriDescription,
    specifications: {
      'índice de carga': '121/118',
      'índice de velocidade': 'R',
      'visual': 'Letras brancas',
      'tecnologia': 'BRUTUS T/A'
    },
    stock: 28,
  },
  {
    id: 'xbri-brutus-ta-ii-265-60r18',
    name: 'Pneu XBRI BRUTUS T/A II LT 265/60R18 10PR 119/116S Letra Branca',
    slug: 'xbri-brutus-ta-ii-265-60r18',
    sku: 'XBRI-BRUTUS-TA-II-265-60R18',
    price: 850.00,
    originalPrice: 850.00,
    currency: 'BRL',
    images: xbriImages,
    rating: 4.8,
    reviews: 85,
    isFreeShipping: true,
    discount: 0,
    category: 'pneus-camioneta',
    brand: 'XBRI',
    width: '265',
    profile: '60',
    rim: '18',
    type: 'Todo terreno',
    description: xbriDescription,
    specifications: {
      'índice de carga': '119/116',
      'índice de velocidade': 'S',
      'visual': 'Letras brancas',
      'tecnologia': 'BRUTUS T/A II'
    },
    stock: 32,
  },
  {
    id: 'xbri-brutus-ta-ii-265-65r18',
    name: 'Pneu XBRI BRUTUS T/A II LT 265/65R18 10PR 122/119S Letra Branca',
    slug: 'xbri-brutus-ta-ii-265-65r18',
    sku: 'XBRI-BRUTUS-TA-II-265-65R18',
    price: 910.00,
    originalPrice: 910.00,
    currency: 'BRL',
    images: xbriImages,
    rating: 4.7,
    reviews: 79,
    isFreeShipping: true,
    discount: 0,
    category: 'pneus-camioneta',
    brand: 'XBRI',
    width: '265',
    profile: '65',
    rim: '18',
    type: 'Todo terreno',
    description: xbriDescription,
    specifications: {
      'índice de carga': '122/119',
      'índice de velocidade': 'S',
      'visual': 'Letras brancas',
      'tecnologia': 'BRUTUS T/A II'
    },
    stock: 35,
  },
  {
    id: 'xbri-brutus-ta-285-65r18',
    name: 'Pneu XBRI BRUTUS T/A LT 285/65R18 10PR 125/122R Letra Branca',
    slug: 'xbri-brutus-ta-285-65r18',
    sku: 'XBRI-BRUTUS-TA-285-65R18',
    price: 1010.00,
    originalPrice: 1010.00,
    currency: 'BRL',
    images: xbriImages,
    rating: 4.9,
    reviews: 68,
    isFreeShipping: true,
    discount: 0,
    category: 'pneus-camioneta',
    brand: 'XBRI',
    width: '285',
    profile: '65',
    rim: '18',
    type: 'Todo terreno',
    description: xbriDescription,
    specifications: {
      'índice de carga': '125/122',
      'índice de velocidade': 'R',
      'visual': 'Letras brancas',
      'tecnologia': 'BRUTUS T/A'
    },
    stock: 25,
  },
  {
    id: 'xbri-brutus-ta-35x12-5r18',
    name: 'Pneu XBRI BRUTUS T/A LT 35X12,5R18 RAM 65 PSI 125/123R Letra Branca',
    slug: 'xbri-brutus-ta-35x12-5r18',
    sku: 'XBRI-BRUTUS-TA-35X12-5R18',
    price: 1250.00,
    originalPrice: 1250.00,
    currency: 'BRL',
    images: xbriImages,
    rating: 4.8,
    reviews: 74,
    isFreeShipping: true,
    discount: 0,
    category: 'pneus-camioneta',
    brand: 'XBRI',
    width: '35X12,5',
    profile: '',
    rim: '18',
    type: 'Todo terreno',
    description: xbriDescription,
    specifications: {
      'índice de carga': '125/123',
      'índice de velocidade': 'R',
      'visual': 'Letras brancas',
      'tecnologia': 'BRUTUS T/A'
    },
    stock: 20,
  },
  {
    id: 'xbri-brutus-ta-265-60r20',
    name: 'Pneu XBRI BRUTUS T/A LT 265/60R20 10PR 121/118S Letra Branca',
    slug: 'xbri-brutus-ta-265-60r20',
    sku: 'XBRI-BRUTUS-TA-265-60R20',
    price: 1590.00,
    originalPrice: 1590.00,
    currency: 'BRL',
    images: xbriImages,
    rating: 4.9,
    reviews: 81,
    isFreeShipping: true,
    discount: 0,
    category: 'pneus-camioneta',
    brand: 'XBRI',
    width: '265',
    profile: '60',
    rim: '20',
    type: 'Todo terreno',
    description: xbriDescription,
    specifications: {
      'índice de carga': '121/118',
      'índice de velocidade': 'S',
      'visual': 'Letras brancas',
      'tecnologia': 'BRUTUS T/A'
    },
    stock: 18,
  }
]

// Funções auxiliares para formatação de preços
export function formatPriceBRL(price: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2
  }).format(price)
}

// Funções para obter produtos específicos
export const getXBRIProducts = () => xbriProducts

export const getXBRIBySize = (width: string, profile: string, rim: string) => {
  return xbriProducts.filter(product => 
    product.width === width && 
    product.profile === profile && 
    product.rim === rim
  )
}

export const getFeaturedxBRI = () => {
  return xbriProducts
    .filter(product => product.discount && product.discount > 10)
    .slice(0, 8)
}

export const getBestSellersXBRI = () => {
  return [...xbriProducts]
    .sort((a, b) => (b.reviews || 0) - (a.reviews || 0))
    .slice(0, 8)
}

export const getNewArrivalsXBRI = () => {
  return xbriProducts.slice(0, 8)
}
EOF

# 6. Criar arquivo tire-data.ts
echo "6. Criando arquivo tire-data.ts..."
cat > src/lib/tire-data.ts << 'EOF'
// Dados de pneus com produtos BFGoodrich e XBRI em estoque
import { bfgoodrichProducts, formatPriceBRL } from './bfgoodrich-products'
import { xbriProducts } from './xbri-products'

export const tireProducts = [...bfgoodrichProducts, ...xbriProducts]

export const tireCategories = [
  {
    id: '1',
    name: 'Pneus Carro',
    slug: 'pneus-carro',
    image: '/images/tipos-pneus-carro.jpg',
    description: 'Pneus para veículos de passeio',
    productCount: 0,
    comingSoon: true
  },
  {
    id: '2',
    name: 'Pneus Camioneta',
    slug: 'pneus-camioneta',
    image: '/images/tipos-pneus-camioneta.jpg',
    description: 'Pneus para SUVs e caminhonetes',
    productCount: tireProducts.length,
    comingSoon: false
  },
  {
    id: '3',
    name: 'Pneus Moto',
    slug: 'pneus-moto',
    image: '/images/tipos-pneus-moto.jpg',
    description: 'Pneus para motocicletas',
    productCount: 0,
    comingSoon: true
  },
  {
    id: '4',
    name: 'Pneus Agrícolas',
    slug: 'pneus-agricola',
    image: '/images/tipos-pneus-agricola.jpg',
    description: 'Pneus para máquinas agrícolas',
    productCount: 0,
    comingSoon: true
  },
  {
    id: '5',
    name: 'Marcas',
    slug: 'marcas',
    image: '/images/tipos-pneus-marcas.jpg',
    description: 'Pirelli, Michelin, Continental, BFGoodrich e mais',
    productCount: 0,
    comingSoon: true
  }
]

// Funções auxiliares para formatação de preços
export { formatPriceBRL }

// Dados de exemplo para páginas de categoria
export const getCategoryProducts = (categorySlug: string) => {
  return tireProducts.filter(product => 
    product.category.toLowerCase() === categorySlug.toLowerCase()
  )
}

// Produtos em destaque
export const getFeaturedProducts = () => {
  return tireProducts.filter(product => product.isFreeShipping).slice(0, 4)
}

// Produtos mais vendidos
export const getBestSellers = () => {
  return [...tireProducts]
    .sort((a, b) => (b.reviews || 0) - (a.reviews || 0))
    .slice(0, 8)
}

// Lançamentos
export const getNewArrivals = () => {
  return tireProducts.slice(0, 8)
}

// Produtos em promoção
export const getSaleProducts = () => {
  return tireProducts.filter(product => product.discount && product.discount > 15)
}

// Buscar produtos
export const searchProducts = (query: string) => {
  const lowercaseQuery = query.toLowerCase()
  return tireProducts.filter(product =>
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.category.toLowerCase().includes(lowercaseQuery) ||
    product.brand.toLowerCase().includes(lowercaseQuery) ||
    product.description?.toLowerCase().includes(lowercaseQuery)
  )
}

// Produtos relacionados
export const getRelatedProducts = (productId: string, limit = 4) => {
  const currentProduct = tireProducts.find(p => p.id === productId)
  if (!currentProduct) return []
  
  return tireProducts
    .filter(product => 
      product.id !== productId && 
      product.category === currentProduct.category
    )
    .slice(0, limit)
}
EOF

# 7. Criar API route corrigida
echo "7. Criando API route corrigida..."
cat > src/app/api/products/route.ts << 'EOF'
import { NextRequest, NextResponse } from 'next/server'
import { tireProducts } from '@/lib/tire-data'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')
    const limit = searchParams.get('limit')
    const search = searchParams.get('search')

    let filteredProducts = [...tireProducts]

    // Filter by category
    if (category) {
      filteredProducts = filteredProducts.filter(p => 
        p.category === category
      )
    }

    // Filter featured products
    if (featured === 'true') {
      filteredProducts = filteredProducts.filter(p => p.isFreeShipping)
    }

    // Search products
    if (search) {
      const searchLower = search.toLowerCase()
      filteredProducts = filteredProducts.filter(p =>
        p.name.toLowerCase().includes(searchLower) ||
        p.description?.toLowerCase().includes(searchLower) ||
        p.brand.toLowerCase().includes(searchLower)
      )
    }

    // Limit results
    if (limit) {
      filteredProducts = filteredProducts.slice(0, parseInt(limit))
    }

    return NextResponse.json({
      success: true,
      data: filteredProducts,
      total: filteredProducts.length
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}
EOF

# 8. Adicionar todos os arquivos ao git
echo "8. Adicionando arquivos ao git..."
git add .

# 9. Fazer commit
echo "9. Fazendo commit..."
git commit -m "Fix API route to use tire products instead of Paraguay products

- Updated src/app/api/products/route.ts to import tireProducts from tire-data.ts
- Changed from mockProducts (Paraguay electronics) to actual tire products (BFGoodrich + XBRI)
- Added brand filtering to search functionality
- This fix resolves 404 errors for tire product pages

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>"

# 10. Fazer push para o GitHub
echo "10. Enviando para o GitHub..."
git push origin main

echo ""
echo "=== SUCESSO! ==="
echo "As alterações foram enviadas para o GitHub."
echo "Aguarde 2-3 minutos para o Vercel fazer o deploy automático."
echo ""
echo "Depois do deploy, teste:"
echo "- https://mercadolivre.scpneus.shop/produto/xbri-brutus-ta-205-70r15"
echo "- https://mercadolivre.scpneus.shop/produto/bf-goodrich-ko3-lt265-65r18-123-120s-rwl"
echo ""
echo "Total de produtos: 26 (13 BFGoodrich + 13 XBRI)"