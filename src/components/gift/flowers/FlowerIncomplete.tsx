'use client'

import React, { useEffect } from 'react'
import { motion } from 'framer-motion'

interface FlowerIncompleteProps {
  onComplete?: () => void
}

export function FlowerIncomplete({ onComplete }: FlowerIncompleteProps) {

  useEffect(() => {
    // Auto-completar después de 5 segundos
    const timer = setTimeout(() => {
      if (onComplete) onComplete()
    }, 5000)

    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] bg-black flex flex-col items-center justify-center p-8 text-center"
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="text-white text-2xl md:text-3xl font-black tracking-tight leading-snug max-w-md"
      >
        El futuro siempre ha sido nuestro lugar favorito para imaginar
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          ...
        </motion.span>
      </motion.h2>

      {/* Sutil brillo ambiental */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)'
          }}
        />
      </div>
    </motion.div>
  )
}
