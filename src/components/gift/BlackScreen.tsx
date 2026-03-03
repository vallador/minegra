'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export function BlackScreen() {
  const [showDot, setShowDot] = useState(false)

  useEffect(() => {
    // El punto aparece después de 1 segundo
    const timer = setTimeout(() => setShowDot(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: '#000' }}
    >
      {showDot && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-white text-2xl"
        >
          .
        </motion.span>
      )}
    </motion.div>
  )
}
