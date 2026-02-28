'use client'

import { motion } from 'framer-motion'

export function FinalLetter() {
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
            <div className="space-y-3 text-gray-600 leading-relaxed text-sm" style={{ fontFamily: 'Georgia, serif' }}>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                Todo esto quedó grabado.
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
              >
                No como un recuerdo triste.
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3 }}
              >
                Sino como algo que valió la pena.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="pt-3 border-t border-pink-100 mt-4"
              >
                <p className="text-pink-500 italic">
                  Siempre quise que tuvieras una vida grande.
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
