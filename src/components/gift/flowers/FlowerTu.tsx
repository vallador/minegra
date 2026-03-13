'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Heart } from 'lucide-react'

interface FlowerTuProps {
  onComplete: () => void
}

export function FlowerTu({ onComplete }: FlowerTuProps) {
  const [showButton, setShowButton] = useState(false)
  const [particles, setParticles] = useState<{ id: number; x: number; color: string; delay: number }[]>([])

  const paragraphs = [
    "Más allá de todo lo que sueñas…\nhay algo en ti que siempre me ha dejado sin palabras:",
    "La manera en que estás presente,\ncomo si el mundo se detuviera para que los que amas se sientan cuidados.",
    "La forma en que ríes, incluso cuando todo a tu alrededor parece desmoronarse,\ncomo si tu alegría pudiera abrazar cualquier tormenta.",
    "Algunas personas dejan una marca pequeña.\nTú… dejas huellas que el tiempo no puede borrar.",
    "Y quiero que sientas esto en lo más profundo:",
    "en algún momento estarás junto a Génesis, tu mamá y tu papá,\ny ese día, cada risa, cada abrazo, cada instante…\nserá exactamente como debe ser.",
    "Eso no es un deseo, es una certeza que nace de algo que va más allá de mí."
  ]

  useEffect(() => {
    // Mostrar botón después de que todos los párrafos se hayan revelado
    const totalTime = paragraphs.length * 2500 + 1000
    const timer = setTimeout(() => setShowButton(true), totalTime)
    return () => clearTimeout(timer)
  }, [])

  const handleHarvest = () => {
    const newParticles = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: ['#F472B6', '#EC4899', '#FB7185', '#FFF1F2'][Math.floor(Math.random() * 4)],
      delay: Math.random() * 2
    }))
    setParticles(newParticles)
    setTimeout(onComplete, 3000)
  }

  return (
    <div className="relative p-6 text-center min-h-[600px] flex flex-col items-center justify-start bg-white rounded-3xl overflow-y-auto custom-scrollbar shadow-inner border border-pink-50">

      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-100 via-purple-100 to-pink-100" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 mt-4 shrink-0"
      >
        <span className="text-3xl">✨</span>
        <h2 className="text-xl font-light text-pink-600 mt-2" style={{ fontFamily: 'Georgia, serif' }}>
          Más allá de todo
        </h2>
        <div className="w-16 h-0.5 bg-pink-300 mx-auto mt-3" />
      </motion.div>

      {/* Carta */}
      <div className="w-full space-y-8 pb-8 z-10 shrink-0">
        {paragraphs.map((text, idx) => (
          <motion.p
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 + idx * 2.5, duration: 1.2 }}
            className={`text-gray-700 font-serif text-lg leading-relaxed whitespace-pre-line ${idx === paragraphs.length - 1 ? 'font-black text-pink-600 text-xl' : 'font-medium'
              }`}
          >
            {text}
          </motion.p>
        ))}
      </div>

      {/* Ilustración Final ( family.png ) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={showButton ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
        transition={{ duration: 1 }}
        className="w-full aspect-[3/4] max-h-[50vh] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/50 mb-8 shrink-0 relative"
      >
        <img
          src="/family.png"
          alt="Family"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-pink-100/20 to-transparent" />
      </motion.div>

      <AnimatePresence>
        {showButton && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 pb-10 z-20 shrink-0"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleHarvest}
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-10 py-4 rounded-full font-black text-lg shadow-xl shadow-pink-200"
            >
              Cosechar Tulipán 7 ✨🌷
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confetti particles */}
      {particles.map(p => (
        <motion.div
          key={p.id}
          initial={{ top: '100%', left: `${p.x}%`, scale: 1 }}
          animate={{
            top: '-10%',
            left: `${p.x + (Math.random() * 20 - 10)}%`,
            rotate: 360,
            scale: 0
          }}
          transition={{ duration: 2 + Math.random(), delay: p.delay, ease: 'easeOut' }}
          className="absolute w-3 h-3 rounded-full z-50 pointer-events-none"
          style={{ backgroundColor: p.color }}
        />
      ))}
    </div>
  )
}
