'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

interface FlowerContentProps {
  flowerId: number
  onContinue: () => void
}

const moments = [
  {
    id: 1,
    title: 'Zootopia',
    emoji: '🎬',
    description: 'Centro comercial vacío, solo nosotros',
    color: 'from-purple-400 to-indigo-500',
    icon: '🐰🦊',
  },
  {
    id: 2,
    title: 'Cine de Contrabando',
    emoji: '🍿',
    description: 'Metiendo comida al cine a escondidas',
    color: 'from-yellow-400 to-orange-500',
    icon: '🍔🥤',
  },
  {
    id: 3,
    title: 'Arbolito de Navidad',
    emoji: '🎄',
    description: 'Armando juntos el arbolito',
    color: 'from-red-400 to-green-500',
    icon: '⭐🎁',
  },
  {
    id: 4,
    title: 'Día de Compras',
    emoji: '🛍️',
    description: 'Recorriendo tiendas, probándonos cosas',
    color: 'from-pink-400 to-rose-500',
    icon: '👗👔',
  },
]

export default function FlowerMomentos({ onContinue }: FlowerContentProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % moments.length)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + moments.length) % moments.length)
  }

  return (
    <div className="relative bg-gradient-to-b from-rose-50 to-pink-50 rounded-3xl p-6 shadow-2xl border border-rose-100 overflow-hidden">
      {/* Número de flor */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
        <motion.div
          className="w-8 h-8 bg-rose-500 rounded-full flex items-center justify-center text-white text-sm shadow-lg"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          5
        </motion.div>
      </div>

      {/* Decoración de fondo */}
      <div className="absolute inset-0 opacity-5">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 10 + Math.random() * 5,
              repeat: Infinity,
            }}
          >
            {['💕', '✨', '🌸', '💫'][i % 4]}
          </motion.div>
        ))}
      </div>

      {/* Título */}
      <motion.div
        className="text-center mb-4 relative z-10"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-bold text-rose-600 mb-2" style={{ fontFamily: 'Georgia, serif' }}>
          📸 MOMENTOS 📸
        </h2>
        <p className="text-xs text-rose-400">Nuestros recuerdos favoritos</p>
      </motion.div>

      {/* Carrusel */}
      <div className="relative h-48 mb-4">
        {/* Botón anterior */}
        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-white/80 rounded-full shadow-lg flex items-center justify-center text-rose-500 hover:bg-white transition-colors"
        >
          ←
        </button>

        {/* Contenido del carrusel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className={`absolute inset-x-10 inset-y-0 bg-gradient-to-br ${moments[currentIndex].color} rounded-2xl overflow-hidden shadow-lg`}
            initial={{ opacity: 0, x: 100, rotateY: -15 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            exit={{ opacity: 0, x: -100, rotateY: 15 }}
            transition={{ duration: 0.4 }}
          >
            {/* Decoración interior */}
            <div className="absolute inset-0 bg-white/10" />
            
            {/* Iconos */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 text-4xl">
              {moments[currentIndex].icon}
            </div>

            {/* Placeholder para foto */}
            <div className="absolute inset-x-6 top-16 bottom-12 bg-white/20 rounded-xl backdrop-blur-sm flex items-center justify-center">
              <motion.div
                className="text-center"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="text-5xl mb-2">{moments[currentIndex].emoji}</div>
                <div className="text-white/80 text-xs bg-black/20 px-3 py-1 rounded-full">
                  Foto aquí
                </div>
              </motion.div>
            </div>

            {/* Título del momento */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-3">
              <h3 className="text-white font-bold text-lg text-center">
                {moments[currentIndex].title}
              </h3>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Botón siguiente */}
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-white/80 rounded-full shadow-lg flex items-center justify-center text-rose-500 hover:bg-white transition-colors"
        >
          →
        </button>
      </div>

      {/* Descripción */}
      <motion.p
        key={`desc-${currentIndex}`}
        className="text-center text-rose-600 text-sm mb-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        "{moments[currentIndex].description}"
      </motion.p>

      {/* Indicadores */}
      <div className="flex justify-center gap-2 mb-4">
        {moments.map((moment, index) => (
          <motion.button
            key={moment.id}
            className={`w-2 h-2 rounded-full transition-colors ${
              currentIndex === index ? 'bg-rose-500' : 'bg-rose-200'
            }`}
            onClick={() => setCurrentIndex(index)}
            whileHover={{ scale: 1.3 }}
          />
        ))}
      </div>

      {/* Frase final */}
      <motion.p
        className="text-center text-pink-600 italic relative z-10"
        style={{ fontFamily: 'Georgia, serif' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        "Cada momento contigo es un tesoro."
      </motion.p>

      {/* Botón continuar */}
      <motion.div
        className="mt-6 text-center relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <Button
          onClick={onContinue}
          className="bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white rounded-full px-8 shadow-lg"
        >
          Continuar 📸
        </Button>
      </motion.div>
    </div>
  )
}
