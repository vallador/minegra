'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface FlowerBasketProps {
  onComplete: () => void
}

export function FlowerBasket({ onComplete }: FlowerBasketProps) {
  const [score, setScore] = useState(0)
  const [ballPosition, setBallPosition] = useState({ x: 50, y: 80 })
  const [isAnimating, setIsAnimating] = useState(false)
  const [showMessage, setShowMessage] = useState(false)

  const handleShoot = () => {
    if (isAnimating || score >= 3) return
    
    setIsAnimating(true)
    
    // Animación del tiro
    setBallPosition({ x: 50, y: 30 })
    
    setTimeout(() => {
      // Determinar si encesta (70% probabilidad)
      const scored = Math.random() < 0.7
      
      if (scored) {
        setScore(prev => prev + 1)
      }
      
      // Resetear posición
      setTimeout(() => {
        setBallPosition({ x: 50, y: 80 })
        setIsAnimating(false)
        
        if (score + 1 >= 3) {
          setTimeout(() => setShowMessage(true), 500)
        }
      }, 300)
    }, 500)
  }

  return (
    <div className="p-6 text-center">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4"
      >
        <span className="text-3xl">🏀</span>
        <h2 className="text-xl font-light text-pink-600 mt-2" style={{ fontFamily: 'Georgia, serif' }}>
          Basket
        </h2>
        <div className="w-16 h-0.5 bg-pink-300 mx-auto mt-3" />
      </motion.div>

      {/* Cancha de basketball */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative w-full h-52 rounded-xl overflow-hidden mb-4"
        style={{
          background: 'linear-gradient(to bottom, #1a1a2e 0%, #16213e 100%)',
        }}
      >
        {/* Tablero y aro */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2">
          {/* Tablero */}
          <div 
            className="w-24 h-16 rounded border-4 border-white/30"
            style={{ background: 'rgba(255,255,255,0.1)' }}
          >
            {/* Cuadro del tablero */}
            <div className="w-10 h-8 border-2 border-white/50 mx-auto mt-2 rounded-sm" />
          </div>
          {/* Aro */}
          <div 
            className="w-12 h-1 mx-auto mt-1 rounded-full"
            style={{ background: '#ff6b35' }}
          />
          {/* Red simplificada */}
          <div 
            className="w-10 h-6 mx-auto"
            style={{
              background: 'repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(255,255,255,0.2) 3px, rgba(255,255,255,0.2) 6px)',
            }}
          />
        </div>

        {/* Balón animado */}
        <motion.div
          className="absolute"
          style={{
            left: `${ballPosition.x}%`,
            top: `${ballPosition.y}%`,
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            scale: isAnimating ? [1, 0.8, 1] : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-4xl">🏀</div>
        </motion.div>

        {/* Marcador */}
        <div className="absolute top-2 right-2 bg-white/10 px-3 py-1 rounded-full">
          <span className="text-white text-sm">{score}/3</span>
        </div>
      </motion.div>

      {/* Interacción */}
      {!showMessage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-gray-500 text-sm mb-4">
            Toca para encestar
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleShoot}
            disabled={isAnimating}
            className={`px-6 py-3 rounded-full text-sm ${
              isAnimating 
                ? 'bg-gray-200 text-gray-400' 
                : 'bg-orange-100 text-orange-600'
            }`}
          >
            {isAnimating ? '...' : '🏀 Tirar'}
          </motion.button>
        </motion.div>
      )}

      {/* Mensaje final */}
      {showMessage && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <p className="text-pink-600" style={{ fontFamily: 'Georgia, serif' }}>
            Me encantaba verte competir.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onComplete}
            className="text-pink-400 text-sm"
          >
            ✓
          </motion.button>
        </motion.div>
      )}
    </div>
  )
}
