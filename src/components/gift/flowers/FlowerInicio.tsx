'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

interface FlowerInicioProps {
  onComplete: () => void
}

export function FlowerInicio({ onComplete }: FlowerInicioProps) {
  const [phase, setPhase] = useState(0)
  const [showButton, setShowButton] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.6)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [])
  useEffect(() => {
    if (phase === 2) {
      // Silencio de 2 segundos antes de mostrar el botón
      const timer = setTimeout(() => setShowButton(true), 2000)
      return () => clearTimeout(timer)
    }
  }, [phase])

  const toggleAudio = (playing?: boolean) => {
    const audio = audioRef.current
    if (!audio) return

    if (playing !== undefined) {
      if (playing) {
        audio.play().catch(e => console.log("Audio play blocked:", e))
        setIsPlaying(true)
      } else {
        audio.pause()
        setIsPlaying(false)
      }
      return
    }

    if (audio.paused) {
      audio.play().catch(e => console.log("Audio play blocked:", e))
      setIsPlaying(true)
    } else {
      audio.pause()
      setIsPlaying(false)
    }
  }

  const handleVolumeChange = (newVolume: number) => {
    const audio = audioRef.current
    if (audio) {
      audio.volume = newVolume
      setVolume(newVolume)
    }
  }

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

      {/* Escena del atardecer - SOLO SE MUESTRA DESDE LA FASE 1 */}
      <AnimatePresence>
        {phase > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.3 }}
            className="relative w-full h-52 rounded-xl overflow-hidden mb-6 shadow-md"
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
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 4, repeat: Infinity }}
            />

            {/* Cancha de voleibol */}
            <div className="absolute bottom-0 left-0 right-0 h-24">
              <div
                className="absolute bottom-0 left-0 right-0 h-16"
                style={{ background: 'linear-gradient(to top, #5D4E37, #6B5B45)' }}
              />
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2">
                <div className="w-0.5 h-20 bg-gray-300" />
                <div className="absolute top-0 -left-16 w-32 h-px bg-gray-300" />
              </div>
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

            {/* Control de Audio Mejorado */}
            <div className="absolute top-4 right-4 z-20 flex flex-col items-end gap-2">
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-3 py-2 rounded-full border border-white/20 shadow-lg">
                <input
                  type="range" min="0" max="1" step="0.01" value={volume}
                  onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                  className="w-16 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer accent-white hover:bg-white/50 transition-all outline-none"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => toggleAudio()}
                  className="w-8 h-8 flex items-center justify-center text-white"
                >
                  {isPlaying ? (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 ml-1">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </motion.button>
              </div>
            </div>

            {/* Audio Element */}
            <audio
              ref={audioRef}
              src="/primer tulipan audio.ogg"
              onEnded={() => setIsPlaying(false)}
            />

            <motion.div className="absolute top-3 left-0 right-0 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
              <p className="text-white/90 text-xs font-medium drop-shadow-lg">Cancha de voleibol</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Texto minimalista e Interacción */}
      <div className="space-y-6">
        {phase === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-12 px-4">
            <div className="mb-10">
              <span className="text-5xl animate-pulse">🎵</span>
              <p className="text-pink-600 mt-6 text-lg font-medium" style={{ fontFamily: 'Georgia, serif' }}>
                Antes de comenzar...
              </p>
              <p className="text-gray-500 text-sm mt-2 italic">
                Dale al play arriba y usa la flecha para avanzar por la historia.
              </p>
            </div>

            <div className="relative">
              {!isPlaying && (
                <div className="absolute -top-32 right-0 left-0 flex justify-center">
                  <div className="bg-pink-100 text-pink-600 px-4 py-2 rounded-xl text-xs shadow-sm animate-bounce">
                    ¡Casi se me olvida! Dale al play aquí arriba ↗️
                  </div>
                </div>
              )}

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setPhase(1)}
                className="w-16 h-16 bg-pink-500 text-white rounded-full flex items-center justify-center shadow-xl shadow-pink-200 border-4 border-white mx-auto text-3xl font-bold"
              >
                →
              </motion.button>
              <p className="text-pink-400 text-xs mt-4 tracking-widest uppercase font-bold">
                COMENZAR HISTORIA
              </p>
            </div>

            {/* Audio element for Phase 0 (will be replaced by the one in phase > 0) */}
            {/* This audio element is only here to allow the audio to be played before the main scene is rendered.
                The audioRef will point to the one inside the phase > 0 block once it's mounted. */}
            <audio ref={audioRef} src="/primer tulipan audio.ogg" onEnded={() => setIsPlaying(false)} style={{ display: 'none' }} />

            {/* Control de Audio para Fase 0 (Fuera del container) */}
            <div className="fixed top-20 right-10 z-50">
              <div className="flex items-center gap-3 bg-pink-500 px-3 py-2 rounded-full border border-white shadow-lg text-white">
                <motion.button onClick={() => toggleAudio()} className="w-8 h-8 flex items-center justify-center">
                  {isPlaying ? (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 ml-1"><path d="M8 5v14l11-7z" /></svg>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {phase === 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <div className="space-y-1">
              <p className="text-gray-700 text-lg tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
                5:20 pm.
              </p>
              <p className="text-gray-700 text-lg tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
                Cancha.
              </p>
              <p className="text-gray-700 text-lg tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
                Hasta que se iba la luz.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setPhase(2)}
              className="w-12 h-12 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center shadow-md mx-auto text-2xl font-bold"
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
                    <div className="w-4 h-4 rounded-full bg-pink-200" /><div className="w-4 h-4 rounded-full bg-amber-200" />
                  </div>
                  <p className="text-white/60 text-xs mt-1">en la oscuridad</p>
                </div>
              </div>
            </div>

            <p className="text-gray-500 text-sm italic">
              Comiendo en la cancha, mirando las estrellas.
            </p>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setPhase(3)}
              className="w-12 h-12 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center shadow-md mx-auto text-2xl font-bold"
            >
              →
            </motion.button>
          </motion.div>
        )}

        {phase === 3 && (
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
                    <div className="w-5 h-5 rounded-full bg-pink-200" /><div className="w-4 h-6 rounded-t bg-gray-400" />
                  </motion.div>
                  <motion.div
                    animate={{ x: [2, -2, 2] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                    className="flex flex-col items-center"
                  >
                    <div className="w-5 h-5 rounded-full bg-amber-200" /><div className="w-4 h-6 rounded-t bg-blue-500" />
                  </motion.div>
                </div>
              </div>
            </div>

            <p className="text-gray-500 text-sm italic">
              Caminando hacia la estación.
            </p>

            {/* Silencio antes de la frase final */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="pt-4"
            >
              <p className="text-pink-600 font-medium" style={{ fontFamily: 'Georgia, serif' }}>
                Elegí el hábito de estar.
              </p>
            </motion.div>

            {/* Botón después del silencio */}
            {showButton && (
              <motion.button
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={() => { toggleAudio(false); onComplete(); }}
                className="w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center shadow-xl mx-auto text-2xl"
              >
                ✓
              </motion.button>
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}
