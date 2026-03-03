'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface FlowerJuegosProps {
  onComplete: () => void
}

export function FlowerJuegos({ onComplete }: FlowerJuegosProps) {
  const [currentItem, setCurrentItem] = useState(0)
  const [showButton, setShowButton] = useState(false)

  const items = [
    { emoji: '🧩', title: 'Tetris cama', desc: 'Armando figuras con el cuerpo' },
    { emoji: '🦠', title: 'Ácaros del trasero', desc: 'Tu imaginación sin límites' },
    { emoji: '🐓', title: 'Gallo fino tap tap', desc: 'Los sonidos de mi papá' },
    { emoji: '📦', title: 'Caja sorpresa', desc: 'Siempre algo nuevo' },
  ]

  useEffect(() => {
    if (currentItem === items.length - 1) {
      // Silencio de 2 segundos en el último item
      const timer = setTimeout(() => setShowButton(true), 2000)
      return () => clearTimeout(timer)
    }
  }, [currentItem, items.length])

  const handleNext = () => {
    if (currentItem < items.length - 1) {
      setCurrentItem(currentItem + 1)
    } else {
      onComplete()
    }
  }

  return (
    <div className="p-6 text-center">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <span className="text-3xl">🎮</span>
        <h2 className="text-xl font-light text-pink-600 mt-2" style={{ fontFamily: 'Georgia, serif' }}>
          Humor absurdo
        </h2>
        <div className="w-16 h-0.5 bg-pink-300 mx-auto mt-3" />
      </motion.div>

      {/* Item actual */}
      <motion.div
        key={currentItem}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="space-y-6"
      >
        <div 
          className="w-full h-40 rounded-xl flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
          >
            <span className="text-6xl">{items[currentItem].emoji}</span>
          </motion.div>
        </div>

        <div>
          <p className="text-pink-600 font-medium text-lg">
            {items[currentItem].title}
          </p>
          <p className="text-gray-400 text-sm mt-1">
            {items[currentItem].desc}
          </p>
        </div>

        {/* Indicadores */}
        <div className="flex justify-center gap-2">
          {items.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === currentItem ? 'bg-pink-500' : 'bg-pink-200'
              }`}
            />
          ))}
        </div>

        {/* Botón después del silencio en el último */}
        {currentItem < items.length - 1 ? (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleNext}
            className="text-pink-400 text-sm"
          >
            →
          </motion.button>
        ) : (
          showButton && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleNext}
              className="text-pink-400 text-sm"
            >
              ✓
            </motion.button>
          )
        )}
      </motion.div>
    </div>
  )
}
