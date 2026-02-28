'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface FlowerInicioProps {
  onComplete: () => void
}

export function FlowerInicio({ onComplete }: FlowerInicioProps) {
  const [phase, setPhase] = useState(0)

  return (
    <div className="p-6 text-center">
      {/* Header con título */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <span className="text-3xl">🌅</span>
        <h2 className="text-xl font-light text-pink-600 mt-2" style={{ fontFamily: 'Georgia, serif' }}>
          La rutina
        </h2>
        <div className="w-16 h-0.5 bg-pink-300 mx-auto mt-3" />
      </motion.div>

      {/* Escena del atardecer en la cancha */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="relative w-full h-52 rounded-xl overflow-hidden mb-6"
        style={{
          background: 'linear-gradient(to bottom, #FF6B35 0%, #F7931E 30%, #FFD700 50%, #87CEEB 80%)',
        }}
      >
        {/* Sol atardeciendo */}
        <motion.div
          className="absolute w-16 h-16 rounded-full"
          style={{
            background: 'radial-gradient(circle, #FFD700, #FF8C00)',
            left: '50%',
            bottom: '35%',
            transform: 'translateX(-50%)',
            boxShadow: '0 0 60px rgba(255,140,0,0.6)',
          }}
          animate={{
            opacity: [0.8, 1, 0.8],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />

        {/* Cancha de voleibol */}
        <div className="absolute bottom-0 left-0 right-0 h-24">
          {/* Arena/cesped */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-16"
            style={{ 
              background: 'linear-gradient(to top, #5D4E37, #6B5B45)',
            }}
          />
          
          {/* Red de voleibol */}
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2">
            <div className="w-0.5 h-20 bg-gray-300" />
            <div className="absolute top-0 -left-16 w-32 h-px bg-gray-300" />
            <div className="absolute top-2 -left-16 w-32 h-px bg-gray-300 opacity-50" />
          </div>

          {/* Balón de voleibol animado */}
          <motion.div
            className="absolute bottom-20"
            style={{ left: '30%' }}
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <div className="w-6 h-6 rounded-full bg-white border-2 border-gray-300" />
          </motion.div>

          {/* Dos figuras pequeñas */}
          <motion.div
            className="absolute bottom-4"
            style={{ left: '35%' }}
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-3 h-3 rounded-full bg-pink-200" />
            <div className="w-2 h-4 rounded-t bg-pink-300 mx-auto" />
          </motion.div>
          
          <motion.div
            className="absolute bottom-4"
            style={{ left: '50%' }}
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
          >
            <div className="w-3 h-3 rounded-full bg-amber-200" />
            <div className="w-2 h-4 rounded-t bg-blue-400 mx-auto" />
          </motion.div>
        </div>

        {/* Texto flotante */}
        <motion.div
          className="absolute top-3 left-0 right-0 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p className="text-white/90 text-xs font-medium drop-shadow-lg">
            Cancha de voleibol
          </p>
        </motion.div>
      </motion.div>

      {/* Texto minimalista */}
      <div className="space-y-6">
        {phase === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-1"
          >
            <p className="text-gray-700 text-lg tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
              5:20 pm.
            </p>
            <p className="text-gray-700 text-lg tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
              Cancha.
            </p>
            <p className="text-gray-700 text-lg tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
              Hasta que se iba la luz.
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setPhase(1)}
              className="mt-6 text-pink-400 text-sm"
            >
              →
            </motion.button>
          </motion.div>
        )}

        {phase === 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            {/* Escena comiendo juntos */}
            <div 
              className="w-full h-32 rounded-xl flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #2d2d44, #1a1a2e)',
              }}
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl">🥐</span>
                <div className="flex flex-col items-center">
                  <div className="flex gap-1">
                    <div className="w-4 h-4 rounded-full bg-pink-200" />
                    <div className="w-4 h-4 rounded-full bg-amber-200" />
                  </div>
                  <p className="text-white/60 text-xs mt-1">en la oscuridad</p>
                </div>
              </div>
            </div>
            
            <p className="text-gray-500 text-sm italic">
              Comiendo en la cancha, mirando las estrellas.
            </p>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setPhase(2)}
              className="text-pink-400 text-sm"
            >
              →
            </motion.button>
          </motion.div>
        )}

        {phase === 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            {/* Caminando hacia la estación */}
            <div 
              className="w-full h-32 rounded-xl overflow-hidden"
              style={{
                background: 'linear-gradient(to bottom, #4a5568, #2d3748)',
              }}
            >
              <div className="h-full flex items-end justify-center pb-4">
                <div className="flex gap-2">
                  <motion.div
                    animate={{ x: [-2, 2, -2] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex flex-col items-center"
                  >
                    <div className="w-5 h-5 rounded-full bg-pink-200" />
                    <div className="w-4 h-6 rounded-t bg-gray-400" />
                  </motion.div>
                  <motion.div
                    animate={{ x: [2, -2, 2] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex flex-col items-center"
                  >
                    <div className="w-5 h-5 rounded-full bg-amber-200" />
                    <div className="w-4 h-6 rounded-t bg-blue-500" />
                  </motion.div>
                </div>
              </div>
              {/* Estación de policía simplificada */}
              <div 
                className="absolute bottom-2 right-2 w-12 h-8 rounded"
                style={{ background: '#4a5568' }}
              >
                <div className="w-2 h-2 bg-blue-400 rounded-full absolute top-1 left-1" />
              </div>
            </div>

            <p className="text-gray-500 text-sm italic">
              Caminando hacia la estación.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="pt-4"
            >
              <p className="text-pink-600 font-medium" style={{ fontFamily: 'Georgia, serif' }}>
                Nuestra rutina favorita.
              </p>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onComplete}
              className="mt-4 text-pink-400 text-sm"
            >
              ✓
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
