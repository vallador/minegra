'use client'

import { motion } from 'framer-motion'
import { useGiftStore } from '@/store/useGiftStore'

export function FlowerIncomplete() {
  const { markIncomplete } = useGiftStore()

  return (
    <div className="p-6 text-center">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <span className="text-3xl">🥀</span>
        <h2 className="text-xl font-light text-pink-600 mt-2" style={{ fontFamily: 'Georgia, serif' }}>
          ...
        </h2>
        <div className="w-16 h-0.5 bg-pink-300 mx-auto mt-3" />
      </motion.div>

      {/* Flor semiabierta */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="relative w-full h-48 rounded-xl overflow-hidden mb-6 flex items-center justify-center"
        style={{
          background: 'linear-gradient(to bottom, #f5f5f5, #ebebeb)',
        }}
      >
        {/* Tulipán semiabierto/gris */}
        <motion.div
          animate={{ 
            rotate: [0, 2, -2, 0],
          }}
          transition={{ duration: 5, repeat: Infinity }}
          className="relative"
        >
          {/* Tallo */}
          <div 
            className="absolute left-1/2 -translate-x-1/2"
            style={{
              width: '3px',
              height: '60px',
              background: 'linear-gradient(to bottom, #9e9e9e, #757575)',
              top: '20px',
            }}
          />
          
          {/* Flor semiabierta */}
          <div className="relative">
            {/* Pétalos semiabiertos */}
            <div
              style={{
                width: '32px',
                height: '40px',
                background: 'linear-gradient(to bottom, #d4a5a5, #c49090)',
                borderRadius: '50% 50% 45% 45%',
                transform: 'rotate(-8deg)',
                opacity: 0.6,
              }}
            />
            <div
              style={{
                position: 'absolute',
                width: '32px',
                height: '40px',
                background: 'linear-gradient(to bottom, #d4a5a5, #c49090)',
                borderRadius: '50% 50% 45% 45%',
                right: '-8px',
                top: '0',
                transform: 'rotate(8deg)',
                opacity: 0.6,
              }}
            />
            {/* Centro */}
            <div
              style={{
                position: 'absolute',
                width: '10px',
                height: '14px',
                background: '#8b7355',
                borderRadius: '50%',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -30%)',
              }}
            />
          </div>
        </motion.div>

        {/* Partículas cayendo */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-pink-200"
            style={{
              left: `${30 + Math.random() * 40}%`,
              top: '-5%',
            }}
            animate={{
              y: [0, 200],
              opacity: [0.5, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
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
        transition={{ delay: 0.8 }}
        className="space-y-4"
      >
        <p className="text-gray-400 text-sm italic">
          Esa flor ya no estaba lista.
        </p>
        
        <p className="text-pink-400" style={{ fontFamily: 'Georgia, serif' }}>
          Algunas cosas no alcanzan a florecer.
        </p>

        {/* Silencio antes del botón */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => markIncomplete(8)}
            className="text-gray-400 text-sm mt-4"
          >
            ...
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  )
}
