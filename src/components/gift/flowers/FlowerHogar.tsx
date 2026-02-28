'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

interface FlowerHogarProps {
  onComplete: () => void
}

export function FlowerHogar({ onComplete }: FlowerHogarProps) {
  const [inputWord, setInputWord] = useState('')
  const [isCorrect, setIsCorrect] = useState(false)
  const [showError, setShowError] = useState(false)
  const [carouselIndex, setCarouselIndex] = useState(0)

  const secretWord = 'HOGAR'
  const displayWord = '_ _ G _ R'

  const checkWord = () => {
    if (inputWord.toUpperCase() === secretWord) {
      setIsCorrect(true)
    } else {
      setShowError(true)
      setTimeout(() => setShowError(false), 1500)
    }
  }

  const carouselItems = [
    { emoji: '🍜', text: 'Ramen' },
    { emoji: '💧', text: 'Casa inundada, trapeando' },
    { emoji: '🕯️', text: 'Velitas' },
    { emoji: '🏬', text: 'Centro comercial vacío' },
    { emoji: '💡', text: 'Pared de Stranger Things' },
    { emoji: '🎄', text: 'Árbol de navidad' },
    { emoji: '🌙', text: 'Madrugada' },
  ]

  return (
    <div className="p-6 text-center">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <span className="text-3xl">💡</span>
        <h2 className="text-xl font-light text-pink-600 mt-2" style={{ fontFamily: 'Georgia, serif' }}>
          Stranger Things
        </h2>
        <div className="w-16 h-0.5 bg-pink-300 mx-auto mt-3" />
      </motion.div>

      <AnimatePresence mode="wait">
        {!isCorrect ? (
          <motion.div
            key="puzzle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50 }}
          >
            {/* Escena estilo Stranger Things */}
            <div 
              className="relative w-full h-44 rounded-xl overflow-hidden mb-4"
              style={{
                background: 'linear-gradient(to bottom, #0a0a0a, #1a1a2e)',
              }}
            >
              {/* Luces navideñas */}
              <div className="absolute top-4 left-0 right-0 flex justify-around">
                {['_', '_', 'G', '_', 'R'].map((letter, i) => (
                  <motion.div
                    key={i}
                    className="flex flex-col items-center"
                    animate={{
                      opacity: letter !== '_' ? 1 : [0.3, 1, 0.3],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  >
                    <div 
                      className="w-2 h-2 rounded-full mb-1"
                      style={{
                        background: ['#ff6b6b', '#4ecdc4', '#ffe66d', '#ff8fab', '#a29bfe'][i % 5],
                        boxShadow: `0 0 8px ${['#ff6b6b', '#4ecdc4', '#ffe66d', '#ff8fab', '#a29bfe'][i % 5]}`,
                      }}
                    />
                    <span className="text-white font-mono text-base tracking-widest">
                      {letter}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Cable de luces */}
              <div 
                className="absolute top-8 left-4 right-4 h-px"
                style={{
                  background: '#333',
                }}
              />
            </div>

            {/* Input para adivinar */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              <div className="flex gap-2 justify-center">
                <input
                  type="text"
                  value={inputWord}
                  onChange={(e) => setInputWord(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && checkWord()}
                  placeholder="Escribe la palabra..."
                  className="px-3 py-2 rounded-full border border-pink-300 focus:border-pink-500 focus:outline-none text-center text-pink-600 bg-white/50 text-sm"
                  maxLength={10}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={checkWord}
                  className="px-4 py-2 bg-pink-500 text-white rounded-full text-sm"
                >
                  ✓
                </motion.button>
              </div>

              <AnimatePresence>
                {showError && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-red-400 text-xs"
                  >
                    Intenta de nuevo...
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="carousel"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            {/* Carrusel de momentos */}
            <div className="relative w-full h-36 rounded-xl overflow-hidden mb-4 bg-gradient-to-br from-pink-50 to-purple-50">
              <AnimatePresence mode="wait">
                <motion.div
                  key={carouselIndex}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  className="absolute inset-0 flex flex-col items-center justify-center"
                >
                  <span className="text-4xl mb-2">
                    {carouselItems[carouselIndex].emoji}
                  </span>
                  <p className="text-pink-600 text-sm">
                    {carouselItems[carouselIndex].text}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Navegación */}
              <button
                onClick={() => setCarouselIndex(i => i > 0 ? i - 1 : carouselItems.length - 1)}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-6 h-6 bg-white/80 rounded-full flex items-center justify-center text-pink-500 text-sm"
              >
                ‹
              </button>
              <button
                onClick={() => setCarouselIndex(i => i < carouselItems.length - 1 ? i + 1 : 0)}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 bg-white/80 rounded-full flex items-center justify-center text-pink-500 text-sm"
              >
                ›
              </button>

              {/* Indicadores */}
              <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
                {carouselItems.map((_, i) => (
                  <div
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${
                      i === carouselIndex ? 'bg-pink-500' : 'bg-pink-200'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Frase final */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-pink-600 mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                Contigo, una casa podía aparecer en cualquier parte.
              </p>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onComplete}
                className="text-pink-400 text-sm"
              >
                ✓
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
