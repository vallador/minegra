'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface FlowerLomaProps {
  onComplete: () => void
}

export function FlowerLoma({ onComplete }: FlowerLomaProps) {
  const [handExtended, setHandExtended] = useState(false)
  const [reachedTop, setReachedTop] = useState(false)
  const [flowersAdded, setFlowersAdded] = useState(false)
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    if (flowersAdded) {
      // Silencio de 2 segundos antes de mostrar el botón
      const timer = setTimeout(() => setShowButton(true), 2000)
      return () => clearTimeout(timer)
    }
  }, [flowersAdded])

  return (
    <div className="p-6 text-center">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4"
      >
        <span className="text-3xl">🌷</span>
        <h2 className="text-xl font-light text-pink-600 mt-2" style={{ fontFamily: 'Georgia, serif' }}>
          La loma
        </h2>
        <div className="w-16 h-0.5 bg-pink-300 mx-auto mt-3" />
      </motion.div>

      {/* Escena de la montaña */}
      <div 
        className="relative w-full h-52 rounded-xl overflow-hidden mb-4"
        style={{
          background: 'linear-gradient(to bottom, #87CEEB 0%, #98D8C8 50%, #7CB342 70%, #558B2F 100%)',
        }}
      >
        {/* Montaña */}
        <div 
          className="absolute bottom-0 left-1/4 right-1/4"
          style={{
            height: '75%',
            background: 'linear-gradient(to top, #5D4E37, #8B7355, #6B8E23)',
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
          }}
        />

        {/* Personaje intentando subir */}
        <motion.div
          className="absolute"
          animate={{ 
            bottom: reachedTop ? '55%' : handExtended ? '45%' : '38%',
          }}
          transition={{ duration: 0.8 }}
          style={{ 
            left: '38%',
          }}
        >
          <div className="flex flex-col items-center">
            <div className="w-5 h-5 rounded-full bg-pink-200" />
            <div className="w-4 h-5 rounded-t-lg bg-gray-400" />
          </div>
          {!handExtended && (
            <motion.div
              className="absolute -right-6 top-0 text-xs"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              😤
            </motion.div>
          )}
        </motion.div>

        {/* Mano extendida */}
        {handExtended && (
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 20, opacity: 1 }}
            className="absolute"
            style={{ 
              bottom: '42%',
              left: '45%',
            }}
          >
            <div className="text-2xl">🤚</div>
          </motion.div>
        )}

        {/* Tulipanes en el cabello */}
        {flowersAdded && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute"
            style={{ bottom: '58%', left: '38%' }}
          >
            <div className="flex gap-0.5 -mt-2">
              <span className="text-sm">🌷</span>
              <span className="text-sm">🌸</span>
              <span className="text-sm">🌷</span>
            </div>
          </motion.div>
        )}

        {/* Perros */}
        <motion.div
          className="absolute bottom-4 right-4"
          animate={{ x: [0, 3, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="text-lg">🐕🐕</div>
        </motion.div>
      </div>

      {/* Interacción */}
      {!handExtended && !reachedTop && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-gray-500 text-sm mb-4">
            Toca para extender la mano
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setHandExtended(true)}
            className="px-6 py-2 bg-green-100 text-green-700 rounded-full text-sm"
          >
            🤝 Dar la mano
          </motion.button>
        </motion.div>
      )}

      {handExtended && !reachedTop && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-3"
        >
          <p className="text-gray-500 text-sm">
            Arrastra hacia arriba para ayudarla a subir
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setReachedTop(true)}
            className="px-6 py-2 bg-pink-100 text-pink-600 rounded-full text-sm"
          >
            ⬆️ Subir
          </motion.button>
        </motion.div>
      )}

      {reachedTop && !flowersAdded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-3"
        >
          <p className="text-gray-600 text-sm">
            Llegaron a la cima 🏔️
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFlowersAdded(true)}
            className="px-6 py-2 bg-pink-100 text-pink-600 rounded-full text-sm"
          >
            🌷 Poner tulipanes en su cabello
          </motion.button>
        </motion.div>
      )}

      {flowersAdded && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {/* Silencio antes de la frase */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-pink-600" style={{ fontFamily: 'Georgia, serif' }}
          >
            Te di mi mano cada vez que la necesitaste.
          </motion.p>
          
          {/* Botón después del silencio */}
          {showButton && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onComplete}
              className="text-pink-400 text-sm"
            >
              ✓
            </motion.button>
          )}
        </motion.div>
      )}
    </div>
  )
}
