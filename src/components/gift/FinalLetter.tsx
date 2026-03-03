'use client'

import { motion } from 'framer-motion'
import { useGiftStore } from '@/store/useGiftStore'
import { useEffect, useState } from 'react'

export function FinalLetter() {
  const { showBlackScreenFinal, witherAllFlowers } = useGiftStore()
  const [showFinalButton, setShowFinalButton] = useState(false)

  useEffect(() => {
    // Marcar flores como marchitas cuando se muestra la carta
    witherAllFlowers()
    
    // Mostrar botón final después de un tiempo
    const timer = setTimeout(() => setShowFinalButton(true), 3500)
    return () => clearTimeout(timer)
  }, [witherAllFlowers])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
      style={{ 
        background: 'linear-gradient(135deg, #fff5f5 0%, #ffe5ec 50%, #ffd6e7 100%)',
      }}
    >
      <motion.div
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', damping: 20 }}
        className="w-full max-w-lg relative"
      >
        {/* Contenedor */}
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="relative bg-gradient-to-br from-pink-50 to-pink-100 rounded-3xl p-6 shadow-xl border border-pink-200"
        >
          {/* Decoración */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
            className="text-center mb-4"
          >
            <span className="text-4xl">🌷</span>
          </motion.div>

          {/* Título */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mb-6"
          >
            <h1 className="text-xl font-light text-pink-600" style={{ fontFamily: 'Georgia, serif' }}>
              Para Valentina
            </h1>
            <div className="w-16 h-0.5 bg-pink-300 mx-auto mt-2" />
          </motion.div>

          {/* Carta */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white rounded-2xl p-5 shadow-inner"
          >
            {/* Contenido de la carta */}
            <div className="space-y-4 text-gray-600 leading-relaxed text-sm" style={{ fontFamily: 'Georgia, serif' }}>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="text-pink-600"
              >
                Te vi completa.
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
              >
                Tus luces y tus sombras.
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3 }}
              >
                Y elegí quedarme mientras pude.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="pt-4 border-t border-pink-100 mt-4"
              >
                <p className="text-gray-500 text-xs italic">
                  Esto es lo que quedó.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Flores decorativas */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.7 }}
            className="flex justify-center gap-2 mt-6"
          >
            {['🌷', '🌸', '🌷'].map((emoji, i) => (
              <motion.span
                key={i}
                className="text-xl"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
              >
                {emoji}
              </motion.span>
            ))}
          </motion.div>

          {/* Cierre final */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2 }}
            className="mt-8 pt-6 border-t border-pink-200 text-center"
          >
            <p className="text-gray-400 text-sm mb-1">
              Esto era lo que me faltaba decir.
            </p>
            <p className="text-gray-500 text-sm">
              Ya está dicho.
            </p>
            <p className="text-pink-400 mt-3 text-sm">
              — D
            </p>
          </motion.div>

          {/* Botón final para pantalla negra */}
          {showFinalButton && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8 text-center"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={showBlackScreenFinal}
                className="text-gray-300 text-xs hover:text-gray-400 transition-colors"
              >
                .
              </motion.button>
            </motion.div>
          )}
        </motion.div>

        {/* Partículas flotantes */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-sm pointer-events-none"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            {['🌸', '✨', '🌷'][i % 3]}
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}
