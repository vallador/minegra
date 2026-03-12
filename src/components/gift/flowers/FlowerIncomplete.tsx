'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useGiftStore } from '@/store/useGiftStore'

export function FlowerIncomplete() {
  const { markIncomplete } = useGiftStore()

  return (
    <div className="p-8 text-center min-h-[400px] flex flex-col justify-center">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <span className="text-4xl">✨</span>
        <h2 className="text-2xl font-light text-pink-600 mt-4 leading-relaxed" style={{ fontFamily: 'Georgia, serif' }}>
          El futuro es inesperado...
        </h2>
        <div className="w-20 h-0.5 bg-pink-300 mx-auto mt-4" />
      </motion.div>

      {/* Flor especial */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="relative w-full h-56 rounded-2xl overflow-hidden mb-8 flex items-center justify-center shadow-inner"
        style={{
          background: 'linear-gradient(to bottom, #fffafa, #ffeeee)',
        }}
      >
        {/* Tulipán misterioso */}
        <motion.div
          animate={{
            rotate: [0, 1, -1, 0],
            scale: [1, 1.02, 1],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="relative"
        >
          {/* Brillo de fondo */}
          <motion.div
            className="absolute inset-x-0 top-0 blur-2xl rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(255,182,193,0.4) 0%, transparent 70%)',
              width: '100px',
              height: '100px',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)'
            }}
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          {/* Tallo */}
          <div
            className="absolute left-1/2 -translate-x-1/2"
            style={{
              width: '4px',
              height: '70px',
              background: 'linear-gradient(to bottom, #4a8a42, #2d5a27)',
              top: '25px',
              borderRadius: '2px',
            }}
          />

          {/* Flor */}
          <div className="relative">
            {/* Pétalos */}
            <div
              style={{
                width: '38px',
                height: '48px',
                background: 'linear-gradient(to bottom, #ffb6c1, #ff69b4)',
                borderRadius: '50% 50% 45% 45%',
                transform: 'rotate(-5deg)',
                boxShadow: 'inset 0 4px 10px rgba(255,255,255,0.4)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                width: '38px',
                height: '48px',
                background: 'linear-gradient(to bottom, #ffc8d6, #ff85c1)',
                borderRadius: '50% 50% 45% 45%',
                right: '-10px',
                top: '0',
                transform: 'rotate(5deg)',
                boxShadow: 'inset 0 4px 10px rgba(255,255,255,0.4)',
              }}
            />
          </div>
        </motion.div>

        {/* Partículas de brillo */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-pink-300"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
            }}
            animate={{
              scale: [0, 1.5, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </motion.div>

      {/* Mensaje */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="space-y-6"
      >
        <p className="text-pink-600 text-lg font-medium italic" style={{ fontFamily: 'Georgia, serif' }}>
          ...pero ya sé el resultado.
        </p>

        <p className="text-gray-500 text-sm leading-relaxed max-w-[250px] mx-auto font-light">
          Algunas cosas no necesitan revelarse por completo para saber qué son.
        </p>

        {/* Botón sutil */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
        >
          <motion.button
            whileHover={{ scale: 1.05, color: '#ff69b4' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => markIncomplete(8)}
            className="text-pink-300 text-sm mt-8 border-b border-transparent hover:border-pink-300 transition-all uppercase tracking-widest px-4 py-2"
          >
            Continuar
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  )
}
