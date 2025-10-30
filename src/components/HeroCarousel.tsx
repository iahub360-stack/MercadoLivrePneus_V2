'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

const heroSlides = [
  {
    id: 1,
    title: 'Pneus XBRI Brutus T/A',
    subtitle: 'Máxima performance para off-road',
    description: 'Os pneus mais resistentes e duráveis para suas aventuras',
    videoUrl: 'https://www.youtube.com/watch?v=zYS_4OSB9iQ',
    videoStart: 0,
    videoEnd: 20,
    cta: 'Ver Produtos',
    link: '#produtos'
  },
  {
    id: 2,
    title: 'Qualidade Garantida',
    subtitle: 'Pneus para todos os veículos',
    description: 'Encontre o pneu perfeito para seu carro, caminhão ou SUV',
    videoUrl: 'https://www.youtube.com/watch?v=zYS_4OSB9iQ',
    videoStart: 20,
    videoEnd: 40,
    cta: 'Conheça Mais',
    link: '#destaques'
  },
  {
    id: 3,
    title: 'Oferta Especial',
    subtitle: 'Frete Grátis para todo o Brasil',
    description: 'Kit 4 pneus com preço imbatível e entrega garantida',
    videoUrl: 'https://www.youtube.com/watch?v=zYS_4OSB9iQ',
    videoStart: 40,
    videoEnd: 60,
    cta: 'Comprar Agora',
    link: '#produtos'
  }
]

function VideoSlide({ slide, isPlaying, onPlayPause }: { 
  slide: typeof heroSlides[0], 
  isPlaying: boolean,
  onPlayPause: () => void 
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoError, setVideoError] = useState(false)

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(error => {
          console.error('Video play error:', error)
          setVideoError(true)
        })
      } else {
        videoRef.current.pause()
      }
    }
  }, [isPlaying])

  const getVideoEmbedUrl = (url: string) => {
    const videoId = url.split('v=')[1]?.split('&')[0]
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&start=${slide.videoStart}&end=${slide.videoEnd}`
  }

  if (videoError) {
    return (
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=1200&h=600&fit=crop"
          alt={slide.title}
          fill
          className="object-cover opacity-30"
        />
      </div>
    )
  }

  return (
    <>
      <div className="absolute inset-0">
        <iframe
          src={getVideoEmbedUrl(slide.videoUrl)}
          className="w-full h-full object-cover"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ border: 'none' }}
        />
      </div>
      <div className="absolute inset-0 bg-black/40" />
      <button
        onClick={onPlayPause}
        className="absolute top-4 right-4 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all"
      >
        {isPlaying ? (
          <Pause className="w-6 h-6 text-white" />
        ) : (
          <Play className="w-6 h-6 text-white" />
        )}
      </button>
    </>
  )
}

export function HeroCarousel() {
  const [api, setApi] = useState<any>(null)
  const [current, setCurrent] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  useEffect(() => {
    if (!api) {
      return
    }

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap())
      setIsPlaying(true)
    }

    api.on('select', onSelect)
    return () => {
      api.off('select', onSelect)
    }
  }, [api])

  const scrollTo = (index: number) => {
    api?.scrollTo(index)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="relative w-full bg-gradient-to-r from-blue-600 to-blue-800">
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        setApi={setApi}
        className="w-full"
      >
        <CarouselContent>
          {heroSlides.map((slide) => (
            <CarouselItem key={slide.id} className="relative h-[600px]">
              <VideoSlide 
                slide={slide} 
                isPlaying={isPlaying && current === slide.id - 1}
                onPlayPause={togglePlayPause}
              />
              <div className="relative z-10 flex items-center justify-center h-full">
                <div className="text-center text-white max-w-4xl mx-auto px-4">
                  <h1 className="text-4xl md:text-6xl font-bold mb-4">
                    {slide.title}
                  </h1>
                  <h2 className="text-2xl md:text-3xl mb-6 text-blue-100">
                    {slide.subtitle}
                  </h2>
                  <p className="text-lg md:text-xl mb-8 text-blue-100">
                    {slide.description}
                  </p>
                  <a
                    href={slide.link}
                    className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
                  >
                    {slide.cta}
                  </a>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 bg-white/80 hover:bg-white text-blue-600 border-none" />
        <CarouselNext className="right-4 bg-white/80 hover:bg-white text-blue-600 border-none" />
      </Carousel>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              current === index ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  )
}