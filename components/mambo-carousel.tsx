"use client"

import { useRef } from "react"

const IMAGES = [
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/f1-56g675DS1qMLj5QF50xGKYZxiZEVoY.jpeg",
    alt: "Frescomenta - Mambo session 1",
    aspect: "portrait",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/f2-1FfJFBuTOMBUYdmTdv8x9UCVIrj49H.jpeg",
    alt: "Frescomenta - Mambo session 2",
    aspect: "landscape",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/f3-lDR7Hgjhcy2kehgULBG06jvP4pODUG.jpeg",
    alt: "Frescomenta - Mambo session 3",
    aspect: "landscape",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/f4-tqH8ZnWdp0OfqipdoXmvdDHsPiBrfg.jpeg",
    alt: "Frescomenta - Mambo poster",
    aspect: "portrait",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/f4.1-6xDB527XNWOpTAp9JyffCoMa5pO8VL.jpeg",
    alt: "Frescomenta - Mambo session 4",
    aspect: "portrait",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/f5-3lrV91X7nGbiCJhgcFCrUzigns14Uu.jpeg",
    alt: "Frescomenta sticker Samsung",
    aspect: "landscape",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/f6-zy7FWqgY5qNNJitrt5xgzru9a5HReE.jpeg",
    alt: "Frescomenta - Mambo session 6",
    aspect: "landscape",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/f6.1-TsIHTCLcsE5zDUiF9zPbK2ja04jGAN.jpeg",
    alt: "Frescomenta - Mambo session 6.1",
    aspect: "landscape",
  },
]

// Split into two groups for the two columns
const LEFT_IMAGES = [IMAGES[0], IMAGES[2], IMAGES[4], IMAGES[6]]
const RIGHT_IMAGES = [IMAGES[1], IMAGES[3], IMAGES[5], IMAGES[7]]

interface VerticalCarouselProps {
  images: typeof IMAGES
  direction: "up" | "down"
}

function VerticalCarousel({ images, direction }: VerticalCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  // Duplicate images for seamless infinite loop
  const doubled = [...images, ...images]

  return (
    <div
      className="mambo-carousel-wrapper"
      onMouseEnter={() => {
        if (trackRef.current) trackRef.current.style.animationPlayState = "paused"
      }}
      onMouseLeave={() => {
        if (trackRef.current) trackRef.current.style.animationPlayState = "running"
      }}
    >
      <div
        ref={trackRef}
        className={`mambo-carousel-track ${direction === "up" ? "mambo-scroll-up" : "mambo-scroll-down"}`}
      >
        {doubled.map((img, i) => (
          <div
            key={i}
            className={`mambo-carousel-item ${img.aspect === "portrait" ? "mambo-item-portrait" : "mambo-item-landscape"}`}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="mambo-carousel-img"
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

// Horizontal carousel for mobile
function HorizontalCarousel() {
  const trackRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const doubled = [...IMAGES, ...IMAGES]

  // Pause auto-scroll while the user is touching/dragging
  const pauseScroll = () => {
    if (trackRef.current) trackRef.current.style.animationPlayState = "paused"
  }
  const resumeScroll = () => {
    if (trackRef.current) trackRef.current.style.animationPlayState = "running"
  }

  return (
    <div
      ref={wrapperRef}
      className="mambo-hcarousel-wrapper"
      onMouseEnter={pauseScroll}
      onMouseLeave={resumeScroll}
      onTouchStart={pauseScroll}
      onTouchEnd={resumeScroll}
    >
      <div ref={trackRef} className="mambo-hcarousel-track mambo-scroll-left">
        {doubled.map((img, i) => (
          <div
            key={i}
            className={`mambo-hcarousel-item ${img.aspect === "portrait" ? "mambo-hitem-portrait" : "mambo-hitem-landscape"}`}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="mambo-carousel-img"
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export function MamboCarouselLeft() {
  return <VerticalCarousel images={LEFT_IMAGES} direction="up" />
}

export function MamboCarouselRight() {
  return <VerticalCarousel images={RIGHT_IMAGES} direction="down" />
}

export function MamboCarouselMobile() {
  return <HorizontalCarousel />
}
