'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface FlowerLluviaProps {
  onComplete: () => void
}

export function FlowerLluvia({ onComplete }: FlowerLluviaProps) {
  const [phase, setPhase] = useState(0)
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    if (phase === 2) {
      // Silencio de 2 segundos antes de mostrar el botón
      const timer = setTimeout(() => setShowButton(true), 2000)
      return () => clearTimeout(timer)
    }
  }, [phase])

  return (
    <div className="p-6 text-center">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4"
      >
        <span className="text-3xl">🌧️</span>
        <h2 className="text-xl font-light text-pink-600 mt-2" style={{ fontFamily: 'Georgia, serif' }}>
          Lluvia
        </h2>
        <div className="w-16 h-0.5 bg-pink-300 mx-auto mt-3" />
      </motion.div>

      {/* Escena de lluvia */}
      <div
        className="relative w-full h-52 rounded-xl overflow-hidden mb-4"
        style={{
          background: 'linear-gradient(to bottom, #4a5568 0%, #718096 50%, #a0aec0 100%)',
        }}
      >
        {/* Estructura semitransparente del beso */}
        {phase >= 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            className="absolute top-4 right-4 w-16 h-20 rounded border-2 border-gray-500"
            style={{
              background: 'repeating-linear-gradient(0deg, #555 0px, #555 2px, #444 2px, #444 8px)',
            }}
          />
        )}

        {/* Gotas de lluvia */}
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 bg-blue-200/40"
            style={{
              left: `${Math.random() * 100}%`,
              height: `${8 + Math.random() * 12}px`,
            }}
            animate={{
              y: [-20, 240],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 0.8 + Math.random() * 0.4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Dos figuras mojadas */}
        <motion.div
          className="absolute bottom-8 flex gap-4"
          style={{ left: '35%' }}
        >
          <motion.div
            animate={{ rotate: [-2, 2, -2] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <div className="w-6 h-6 rounded-full bg-pink-200" />
            <div className="w-5 h-8 rounded-t-lg bg-blue-400" />
          </motion.div>
          <motion.div
            animate={{ rotate: [2, -2, 2] }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.3 }}
          >
            <div className="w-6 h-6 rounded-full bg-amber-200" />
            <div className="w-5 h-8 rounded-t-lg bg-gray-800" />
          </motion.div>
        </motion.div>
      </div>

      {/* Interacción */}
      <div className="space-y-4">
        {phase === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-gray-500 text-sm mb-4">
              Estaban mojados...
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setPhase(1)}
              className="px-6 py-3 bg-blue-100 text-blue-600 rounded-full text-sm"
            >
              ¿Bailamos o te mojo? 🌧️
            </motion.button>
          </motion.div>
        )}

        {phase === 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-3"
          >
            <p className="text-gray-600 text-sm">
              "Yo no bailo"
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setPhase(2)
                const audio = new Audio('/tercertulipan.ogg')
                audio.play().catch(e => console.error("Error playing audio:", e))
              }}
              className="px-6 py-2 bg-blue-100 text-blue-600 rounded-full text-sm"
            >
              💦 Entonces te mojo
            </motion.button>
          </motion.div>
        )}

        {phase === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="space-y-2 mb-6">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-gray-600 font-medium"
              >
                Esta vez no es una imagen.
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-pink-600 font-bold text-lg"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                Es tu podcast.
              </motion.p>
            </div>

            <p className="text-gray-500 text-sm italic">
              Subieron a las cuerdas del parque...
            </p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="text-pink-600" style={{ fontFamily: 'Georgia, serif' }}
            >
              Yo lo recordé siempre. Tú decidiste cuándo.
            </motion.p>

            {/* Botón después del silencio */}
            {showButton && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onComplete}
                className="bg-pink-100 text-pink-600 px-6 py-2 rounded-full text-sm font-bold shadow-sm mt-4"
              >
                Cosechar Tulipán 🌷
              </motion.button>
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}
