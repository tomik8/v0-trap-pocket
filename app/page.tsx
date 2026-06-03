"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Play, Volume2, Calendar, Music, Phone, PhoneOff, Youtube, Instagram, MessageCircle, Mail } from "lucide-react"
import { MamboCarouselLeft, MamboCarouselRight, MamboCarouselMobile } from "@/components/mambo-carousel"

export default function TrapPocketLanding() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(0)
  const [scrollY, setScrollY] = useState(0)
  const [callAnswered, setCallAnswered] = useState(false)
  const [slidePosition, setSlidePosition] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [showComingSoon, setShowComingSoon] = useState(false)
  const [emailCopied, setEmailCopied] = useState(false)
  const [showTracklistPopup, setShowTracklistPopup] = useState(false)
  const sliderRef = useRef<HTMLDivElement>(null)
  const tracklistRef = useRef<HTMLDivElement>(null)

  const tracks = ["Dejé a mi hoe :(", "Samsung Pocket", "Debe estar jugando al padel", "Nada más"]

  const features = [
    { icon: Music, text: "Trap" },
    { icon: Volume2, text: "El sonido más Fresh" },
  ]

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSlideStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true)
    e.preventDefault()
  }

  const handleSlideMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging || !sliderRef.current) return

    const rect = sliderRef.current.getBoundingClientRect()
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
    const rawPosition = clientX - rect.left - 40
    const newPosition = Math.max(0, Math.min(rect.width - 80, rawPosition * 1.5)) // 1.5x speed multiplier
    setSlidePosition(newPosition)

    if (newPosition > rect.width * 0.4) {
      setCallAnswered(true)
      setIsDragging(false)
    }
  }

  const handleSlideEnd = () => {
    if (!callAnswered) {
      setSlidePosition(0)
    }
    setIsDragging(false)
  }

  useEffect(() => {
    if (isDragging) {
      const handleMouseMove = (e: MouseEvent) => handleSlideMove(e)
      const handleTouchMove = (e: TouchEvent) => handleSlideMove(e)
      const handleMouseUp = () => handleSlideEnd()
      const handleTouchEnd = () => handleSlideEnd()

      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("touchmove", handleTouchMove)
      document.addEventListener("mouseup", handleMouseUp)
      document.addEventListener("touchend", handleTouchEnd)

      return () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("touchmove", handleTouchMove)
        document.removeEventListener("mouseup", handleMouseUp)
        document.removeEventListener("touchend", handleTouchEnd)
      }
    }
  }, [isDragging, callAnswered])

  const copyEmailToClipboard = async () => {
    try {
      await navigator.clipboard.writeText("sebalell@hotmail.com")
      setEmailCopied(true)
      setTimeout(() => {
        setEmailCopied(false)
      }, 3000)
    } catch (err) {
      console.error("Failed to copy email: ", err)
    }
  }

  const handlePhoneImageClick = () => {
    setShowTracklistPopup(true)
  }

  if (!callAnswered) {
    return (
      <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
        <div className="text-center mb-8">
          <p className="text-white text-sm mb-[4]">3492 69420</p>
          <p className="text-white text-xl font-semibold mb-1 mt-1">FRESCOMENTA</p>
          <p className="text-white text-lg my-[-6px]">Llamada entrante</p>
        </div>

        <div className="relative mb-12">
          <div className="w-48 h-64 rounded-lg overflow-hidden mx-auto mb-[-42px] mt-[-22px]">
            <img src="/images/phone-call.png" alt="Frescomenta calling" className="w-full h-full object-contain" />
          </div>
          <div className="absolute inset-0 bg-purple-500/20 blur-3xl -z-10 animate-pulse"></div>
        </div>

        <div className="text-center mb-16">
          <h2 className="text-white text-2xl font-bold mb-2 mt-4">FRESCOMENTA</h2>
          <p className="text-purple-300 my-[-2px]">TRAP POCKET </p>
        </div>

        <div className="w-80 max-w-[90vw]">
          <p className="text-white text-center text-sm mb-[9px]">Desliza para atender</p>

          <div ref={sliderRef} className="relative bg-gray-800 rounded-full h-20 flex items-center px-2">
            <div className="absolute inset-2 bg-gray-700 rounded-full"></div>

            <div
              className="absolute w-16 h-16 bg-green-500 rounded-full flex items-center justify-center cursor-pointer z-10 transition-all duration-200 hover:bg-green-400"
              style={{
                left: `${slidePosition + 8}px`,
                boxShadow: "0 4px 20px rgba(34, 197, 94, 0.4)",
              }}
              onMouseDown={handleSlideStart}
              onTouchStart={handleSlideStart}
            >
              <Phone className="w-8 h-8 text-white" />
            </div>

            <div className="absolute right-2 w-16 h-16 bg-red-500 rounded-full flex items-center justify-center">
              <PhoneOff className="w-8 h-8 text-white" />
            </div>

            <div className="absolute left-20 flex gap-1">
              <div className="w-2 h-2 bg-white/50 transform rotate-45"></div>
              <div className="w-2 h-2 bg-white/50 transform rotate-45"></div>
              <div className="w-2 h-2 bg-white/50 transform rotate-45"></div>
            </div>
          </div>
        </div>

        <p className="text-gray-400 text-xs text-center px-4 mt-[15px]">
          Desliza el botón verde hacia la derecha para atender la llamada
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black text-white overflow-hidden">
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-purple-300 rounded-full animate-ping"></div>
        <div className="absolute bottom-40 left-1/4 w-3 h-3 bg-purple-500 rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 right-1/3 w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
      </div>

      {/* MAMBO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        {/* Background image with overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/mambo-background.jpeg"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/65"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/85"></div>
        </div>

        {/* Desktop: three-column layout with side carousels */}
        <div className="relative z-10 w-full max-w-7xl mx-auto hidden lg:flex items-stretch gap-4 py-12">
          {/* Left carousel */}
          <div className="flex-shrink-0" style={{ height: "600px" }}>
            <MamboCarouselLeft />
          </div>

          {/* Center content */}
          <div className="flex-1 flex flex-col items-center justify-center text-center min-w-0">
            <div className="mb-6 animate-fade-in">
              <img
                src="/images/mambo-title.png"
                alt="Mambo - Frescomenta"
                className="w-full max-w-[144px] sm:max-w-[173px] md:max-w-[202px] lg:max-w-[230px] xl:max-w-[259px] mx-auto mt-[27px] mb-4"
              />
            </div>

            {/* YouTube player */}
            <div className="relative w-full mb-6">
              <div className="rounded-lg overflow-hidden shadow-2xl border-2" style={{ borderColor: "#FF422A33" }}>
                <iframe
                  className="w-full aspect-video"
                  src="https://www.youtube.com/embed/8viDTa-QP0k?autoplay=1&mute=1"
                  title="Mambo - Frescomenta"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="absolute inset-0 blur-2xl -z-10 rounded-lg" style={{ backgroundColor: "#FF422A20" }}></div>
            </div>

            {/* Buttons */}
            <div className="flex flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="text-white px-6 py-3 text-base font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg"
                style={{ backgroundColor: "#FF422A", boxShadow: "0 4px 20px #FF422A40" }}
                asChild
              >
                <a href="https://open.spotify.com/intl-es/album/7ij8DycKtJQJOO3G6x9Du3" target="_blank" rel="noopener noreferrer">
                  <Play className="w-4 h-4 mr-2" />
                  Escuchar
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="px-6 py-3 text-base font-semibold transform hover:scale-105 transition-all duration-300 bg-transparent"
                style={{ borderColor: "#FF422A", color: "#FF422A" }}
                asChild
              >
                <a href="https://youtu.be/1f42am573gk" target="_blank" rel="noopener noreferrer">
                  <Youtube className="w-4 h-4 mr-2" />
                  Videoclip
                </a>
              </Button>
            </div>
          </div>

          {/* Right carousel */}
          <div className="flex-shrink-0" style={{ height: "600px" }}>
            <MamboCarouselRight />
          </div>
        </div>

        {/* Mobile / Tablet: stacked layout */}
        <div className="relative z-10 w-full lg:hidden flex flex-col items-center text-center px-0">
          <div className="mb-6 animate-fade-in w-full flex justify-center">
            <img
              src="/images/mambo-title.png"
              alt="Mambo - Frescomenta"
              className="w-full max-w-[144px] sm:max-w-[173px] mx-auto mt-[27px] mb-4"
            />
          </div>

          {/* YouTube player */}
          <div className="relative w-full max-w-2xl mb-6 px-4">
            <div className="rounded-lg overflow-hidden shadow-2xl border-2" style={{ borderColor: "#FF422A33" }}>
              <iframe
                className="w-full aspect-video"
                src="https://www.youtube.com/embed/8viDTa-QP0k?autoplay=1&mute=1"
                title="Mambo - Frescomenta"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6 px-4 w-full">
            <Button
              size="lg"
              className="text-white px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg w-full sm:w-auto"
              style={{ backgroundColor: "#FF422A", boxShadow: "0 4px 20px #FF422A40" }}
              asChild
            >
              <a href="https://open.spotify.com/intl-es/album/7ij8DycKtJQJOO3G6x9Du3" target="_blank" rel="noopener noreferrer">
                <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Escuchar
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold transform hover:scale-105 transition-all duration-300 bg-transparent w-full sm:w-auto"
              style={{ borderColor: "#FF422A", color: "#FF422A" }}
              asChild
            >
              <a href="https://youtu.be/1f42am573gk" target="_blank" rel="noopener noreferrer">
                <Youtube className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Videoclip
              </a>
            </Button>
          </div>

          {/* Horizontal carousel for mobile */}
          <div className="w-full mb-8">
            <MamboCarouselMobile />
          </div>
        </div>
      </section>

      {/* Separator between sections */}
      <div className="h-24 bg-gradient-to-b from-black/80 via-purple-950/50 to-black"></div>

      {/* TRAP POCKET SECTION */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <div
          className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-transparent pointer-events-none"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        ></div>

        <div className="container mx-auto text-center z-10">
          <div className="mb-8 animate-fade-in">
            <div className="flex justify-center items-center w-full">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 gothic-title gothic-flourish text-center mx-auto whitespace-nowrap mt-[27px]">
                TRAP POCKET
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-purple-200 mb-2 font-sans">FRESCOMENTA</p>
            <div className="flex items-center justify-center gap-2 text-purple-300">
              <Play className="w-5 h-5" />
              <span className="text-lg">Sin fórmula ni imitación</span>
            </div>
          </div>

          <div className="relative mx-auto max-w-sm mb-5">
            <div
              className="transform hover:scale-105 transition-transform duration-500 cursor-pointer"
              style={{ transform: `translateY(${scrollY * -0.03}px) scale(${1 + Math.sin(Date.now() * 0.001) * 0.006})` }}
            >
              <img
                src="/images/phone-call.png"
                alt="Samsung Pocket with Frescomenta"
                className="w-full h-auto drop-shadow-2xl"
              />
            </div>

            <div className="absolute inset-0 bg-purple-500/20 blur-3xl -z-10 animate-pulse"></div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center my-[25px]">
            <div className="flex flex-col items-center gap-2">
              <Button
                variant="outline"
                size="lg"
                className="border-purple-400 text-purple-300 hover:bg-purple-900/50 px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold transform hover:scale-105 transition-all duration-300 bg-transparent w-full sm:w-auto"
                onClick={() => window.location.reload()}
              >
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                LLAMADA ENTRANTE
              </Button>
            </div>
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 w-full sm:w-auto"
              onClick={() => window.open("https://onerpm.link/196020494169", "_blank")}
            >
              <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              TRAP POCKET YA DISPONIBLE
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 px-4 bg-gradient-to-r from-purple-950/30 via-black to-purple-950/30">
        <div className="container mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 gothic-title">TRACKLIST</h2>
            <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-purple-500 to-purple-300 mx-auto"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="relative order-2 lg:order-1">
              <div
                className="transform hover:rotate-2 transition-transform duration-500 cursor-pointer"
                onClick={handlePhoneImageClick}
              >
                <img
                  src="/images/tracklist.png"
                  alt="Samsung Pocket Tracklist"
                  className="w-full max-w-xs sm:max-w-sm mx-auto drop-shadow-2xl hover:drop-shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-purple-500/10 blur-2xl -z-10"></div>
            </div>

            <div className="space-y-3 sm:space-y-4 order-1 lg:order-2">
              {tracks.map((track, index) => (
                <div key={index} className="block">
                  <Card
                    className={`bg-black/50 border-purple-800/50 hover:border-purple-600 transition-all duration-300 cursor-pointer group ${index === 0 ? "hover:bg-purple-900/20 hover:shadow-lg hover:shadow-purple-500/20" : ""
                      }`}
                    onClick={() => window.open("https://www.youtube.com/watch?v=ESKsCaLHAGQ", "_blank")}
                  >
                    <div className="p-4 sm:p-6 flex items-center justify-between">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div
                          className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${index === 0 ? "shadow-lg shadow-purple-500/30" : ""
                            }`}
                        >
                          <span className="text-white font-bold text-sm sm:text-base">{index + 1}</span>
                        </div>
                        <div>
                          <h3 className="text-base sm:text-lg font-semibold text-white group-hover:text-purple-300 transition-colors">
                            {track}
                          </h3>
                          <p className="text-purple-400 text-xs sm:text-sm">Frescomenta</p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-purple-400 hover:text-white hover:bg-purple-900/50 p-2"
                        onClick={(e) => {
                          e.stopPropagation()
                          window.open("https://www.youtube.com/@Frescomenta", "_blank")
                        }}
                      >
                        <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                      </Button>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 px-4 bg-gradient-to-r from-black via-purple-950/50 to-black">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 gothic-title"> Último lanzamiento</h2>
            <p className="text-base sm:text-lg md:text-xl text-purple-200 mb-6 sm:mb-8 leading-relaxed px-4">
              El sonido del trap desde el Samsung Pocket. Una experiencia nostálgica que conecta la era dorada de los
              teléfonos básicos con los beats más frescos y sucios del trap actual.
            </p>

            <div className="relative max-w-xl sm:max-w-2xl mx-auto mb-6 sm:mb-8">
              <video
                className="w-full rounded-lg shadow-2xl cursor-pointer"
                autoPlay
                loop
                muted
                playsInline
                onClick={() => setShowTracklistPopup(true)}
              >
                <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/celu%20girando-M3vfP3SYmDFnDmR36O4HrZDxdBzfxU.mp4" type="video/mp4" />
                Tu navegador no soporta el elemento de video.
              </video>
              <div className="absolute inset-0 bg-purple-500/10 blur-2xl -z-10 rounded-lg"></div>
            </div>

            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-purple-300 px-4">
              {features.map((feature, index) => {
                const IconComponent = feature.icon
                return (
                  <div
                    key={index}
                    className="flex items-center gap-2 hover:text-purple-200 transition-colors duration-300 cursor-pointer"
                  >
                    <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="font-medium text-sm sm:text-base">{feature.text}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 px-4 bg-gradient-to-r from-purple-950/30 via-black to-purple-950/30">
        <div className="container mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 gothic-title">Frescomenta</h2>
            <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-purple-500 to-purple-300 mx-auto"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-start max-w-6xl mx-auto">
            <div className="relative order-1 lg:order-1">
              <div className="transform hover:scale-105 transition-transform duration-500">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full max-w-md mx-auto drop-shadow-2xl rounded-lg"
                  style={{ objectFit: "cover" }}
                >
                  <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Copia%20de%20Frescomenta%202025-2XZuiyS5g96Artvd59Hyb08jbnwiHl.mp4" type="video/mp4" />
                  Tu navegador no soporta el elemento de video.
                </video>
              </div>
              <div className="absolute inset-0 bg-yellow-500/10 blur-3xl -z-10"></div>
            </div>

            <div className="order-2 lg:order-2 max-w-md mx-auto lg:mx-0 lg:max-w-none">
              <div className="text-left space-y-4 sm:space-y-4">
                <p className="text-base sm:text-lg text-purple-200 leading-relaxed">
                  Frescomenta es un artista que construyó su identidad musical a partir de la experimentación, el
                  trabajo constante y una búsqueda sonora propia. Con una estética definida y una visión clara de lo que
                  quiere transmitir, su música combina beats actuales con letras que reflejan momentos, climas y
                  sensaciones reales.
                </p>
                <p className="text-base sm:text-lg text-purple-200 leading-relaxed">
                  Con más de 8 años de experiencia, luego de varios lanzamientos y un proceso de evolución artística,
                  presenta su EP "Trap Pocket", un proyecto breve pero cargado de intención, donde cada tema representa
                  una idea, un ritmo y una actitud. Es un trabajo que confirma su compromiso con el trap como lenguaje y
                  como espacio creativo, sin fórmulas repetidas ni imitaciones.
                </p>
                <p className="text-base sm:text-lg text-purple-200 leading-relaxed">
                  El show en vivo demuestra mucha energía en el escenario, con un set sólido acompañado por DJ, corista
                  y visuales, cuidando la interpretación y una presencia que mantiene la atención de principio a fin.
                  Frescomenta propone una experiencia donde la música, la estética y la puesta escénica se sostienen con
                  profesionalismo y criterio artístico.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 sm:gap-4 pt-6">
                <div className="bg-purple-800/30 border border-purple-600/50 rounded-lg px-3 sm:px-4 py-2 text-purple-300 text-sm sm:text-base">
                  +8 años de experiencia
                </div>
                <div className="bg-purple-800/30 border border-purple-600/50 rounded-lg px-3 sm:px-4 py-2 text-purple-300 text-sm sm:text-base">
                  Trap auténtico
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showTracklistPopup && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4"
          onClick={() => setShowTracklistPopup(false)}
        >
          <div
            className="bg-gradient-to-br from-purple-900 to-black border border-purple-600 rounded-lg p-6 sm:p-8 max-w-sm w-full text-center animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 gothic-title">Trap Pocket Ya Disponible</h3>
              <p className="text-purple-300 text-sm sm:text-base mb-4">En todas tus plataformas favoritas</p>
            </div>
            <div className="flex flex-col gap-3">
              <Button
                onClick={() => {
                  window.open("https://www.youtube.com/watch?v=ESKsCaLHAGQ", "_blank")
                  setShowTracklistPopup(false)
                }}
                className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 w-full"
              >
                <Play className="w-4 h-4 mr-2" />
                Escuchar ahora
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowTracklistPopup(false)}
                className="border-purple-600 hover:bg-purple-900/50 px-6 py-2 rounded-lg font-semibold transition-all duration-300 w-full bg-violet-950 text-white"
              >
                Cerrar
              </Button>
            </div>
          </div>
        </div>
      )}

      <section className="py-16 sm:py-20 px-4 bg-gradient-to-r from-purple-950/40 via-black to-purple-950/40">
        <div className="container mx-auto text-center">
          <div className="mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 gothic-title">CONTACTO</h2>
            <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-purple-500 to-purple-300 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 max-w-4xl mx-auto">
            <a
              href="https://www.youtube.com/@Frescomenta"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-purple-800/50 hover:bg-purple-700 text-white p-4 sm:p-6 rounded-lg font-semibold transition-all duration-300 hover:scale-105 cursor-pointer shadow-lg hover:shadow-purple-500/25 border border-purple-600 hover:border-purple-400 no-underline"
            >
              <div className="flex flex-col items-center gap-3">
                <Youtube className="w-6 h-6 sm:w-8 sm:h-8" />
                <span className="text-sm sm:text-base">YouTube</span>
              </div>
            </a>

            <a
              href="https://www.instagram.com/frescomenta__/"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-purple-800/50 hover:bg-purple-700 text-white p-4 sm:p-6 rounded-lg font-semibold transition-all duration-300 hover:scale-105 cursor-pointer shadow-lg hover:shadow-purple-500/25 border border-purple-600 hover:border-purple-400 no-underline"
            >
              <div className="flex flex-col items-center gap-3">
                <Instagram className="w-6 h-6 sm:w-8 sm:h-8" />
                <span className="text-sm sm:text-base">Instagram</span>
              </div>
            </a>

            <a
              href="https://open.spotify.com/intl-es/artist/1WvGE5RDjcM5FCrlASs9C5?si=0ls5FTblT4qjFuJMhRThPA"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-purple-800/50 hover:bg-purple-700 text-white p-4 sm:p-6 rounded-lg font-semibold transition-all duration-300 hover:scale-105 cursor-pointer shadow-lg hover:shadow-purple-500/25 border border-purple-600 hover:border-purple-400 no-underline"
            >
              <div className="flex flex-col items-center gap-3">
                <Music className="w-6 h-6 sm:w-8 sm:h-8" />
                <span className="text-sm sm:text-base">Spotify</span>
              </div>
            </a>

            <a
              href="https://wa.me/+5493492682432"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-purple-800/50 hover:bg-purple-700 text-white p-4 sm:p-6 rounded-lg font-semibold transition-all duration-300 hover:scale-105 cursor-pointer shadow-lg hover:shadow-purple-500/25 border border-purple-600 hover:border-purple-400 no-underline"
            >
              <div className="flex flex-col items-center gap-3">
                <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8" />
                <span className="text-sm sm:text-base">WhatsApp</span>
              </div>
            </a>

            <button
              onClick={copyEmailToClipboard}
              className="relative block bg-purple-800/50 hover:bg-purple-700 text-white p-4 sm:p-6 rounded-lg font-semibold transition-all duration-300 hover:scale-105 cursor-pointer shadow-lg hover:shadow-purple-500/25 border border-purple-600 hover:border-purple-400 no-underline"
            >
              {emailCopied && (
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white px-3 py-1 rounded-lg text-sm font-medium animate-fade-in shadow-lg">
                  Email copiado
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-purple-600"></div>
                </div>
              )}
              <div className="flex flex-col items-center gap-3">
                <Mail className="w-6 h-6 sm:w-8 sm:h-8" />
                <span className="text-sm sm:text-base">Email</span>
              </div>
            </button>
          </div>

          <p className="text-purple-400 text-sm sm:text-base mt-8 sm:mt-12">
            Conecta con Frescomenta en todas las plataformas
          </p>

          <div className="mt-6">
            <a
              href="https://drive.google.com/drive/folders/1d2J0DQXaMjQwtRns5WWW-p6D7AvJP0aF"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-purple-800/50 hover:bg-purple-700 text-white px-8 sm:px-12 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-purple-500/25 border border-purple-600 hover:border-purple-400 text-center"
            >
              Press Media
            </a>
          </div>
        </div>
      </section>

      <footer className="py-8 sm:py-12 px-4 border-t border-purple-800/30 relative z-20">
        <div className="container mx-auto text-center">
          <div className="mb-6 sm:mb-8">
            <h3 className="text-xl sm:text-2xl font-bold mb-4 gothic-title">TRAP POCKET</h3>
            <p className="text-purple-400 text-sm sm:text-base">Disponible en todas las plataformas digitales</p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mb-6 sm:mb-8 px-4">
            <a
              href="https://www.youtube.com/watch?v=ESKsCaLHAGQ"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-purple-800/50 hover:bg-purple-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 cursor-pointer border border-purple-600 hover:border-purple-400 min-w-[100px] sm:min-w-[120px] block text-center text-sm sm:text-base"
            >
              YouTube
            </a>
            <a
              href="https://open.spotify.com/intl-es/album/3vXuS2IHxN2t7kIcODXgNq?si=KCtE-SdjSI64d7y9x1QuhA"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-purple-800/50 hover:bg-purple-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 cursor-pointer shadow-lg hover:shadow-purple-500/25 border border-purple-600 hover:border-purple-400 min-w-[100px] sm:min-w-[120px] block text-center text-sm sm:text-base"
            >
              Spotify
            </a>
            <a
              href="https://www.instagram.com/frescomenta__/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-purple-800/50 hover:bg-purple-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 cursor-pointer border border-purple-600 hover:border-purple-400 min-w-[100px] sm:min-w-[120px] block text-center text-sm sm:text-base"
            >
              Instagram
            </a>
          </div>

          <p className="text-purple-500 text-xs sm:text-sm">© 2026 Frescomenta. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
