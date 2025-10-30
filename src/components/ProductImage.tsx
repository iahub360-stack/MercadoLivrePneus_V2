'use client'

import { useState } from 'react'
import Image from 'next/image'

interface ProductImageProps {
  src: string
  alt: string
  fallback?: string
  className?: string
}

export function ProductImage({ src, alt, fallback, className = "" }: ProductImageProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [imgError, setImgError] = useState(false)

  const handleError = () => {
    if (!imgError) {
      setImgError(true)
    }
  }

  // Fallback com placeholder de pneu
  const fallbackContent = (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center mb-3">
        <span className="text-2xl">🛞</span>
      </div>
      <p className="text-xs sm:text-sm text-gray-600 text-center px-2">
        Pneu XBRI BRUTUS
      </p>
      <p className="text-xs text-gray-500 text-center">
        265 75 R16
      </p>
    </div>
  )

  if (imgError) {
    return (
      <div className={`relative ${className}`}>
        {fallbackContent}
      </div>
    )
  }

  return (
    <Image
      src={imgSrc}
      alt={alt}
      className={className}
      onError={handleError}
      width={400}
      height={400}
      style={{ objectFit: 'contain' }}
      unoptimized={true}
    />
  )
}