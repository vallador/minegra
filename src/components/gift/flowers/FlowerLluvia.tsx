'use client'

import { motion } from 'framer-motion'
import React, { useState, useEffect, useRef } from 'react'
import { Play, Pause, Volume2, Music } from 'lucide-react'

interface FlowerLluviaProps {
  onComplete: () => void
}

export function FlowerLluvia({ onComplete }: FlowerLluviaProps) {
  const [phase, setPhase] = useState(0)
  const [showButton, setShowButton] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.8)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (phase === 2) {
      // Silencio de 3 segundos antes de mostrar el botón de cosecha
      const timer = setTimeout(() => setShowButton(true), 3000)
      return () => clearTimeout(timer)
    }
  }, [phase])

  const togglePlay = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play().catch(e => console.error("Error playing audio:", e))
    }
    setIsPlaying(!isPlaying)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }

  return (
    <div className="p-8 text-center min-h-[400px] flex flex-col justify-between">
      <audio
        ref={audioRef}
        src="/tercertulipan.ogg"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex justify-center gap-3 mb-2">
          <span className="text-3xl">🎙️</span>
          <span className="text-3xl">🎧</span>
        </div>
        <h2 className="text-2xl font-light text-pink-600 mt-2" style={{ fontFamily: 'Georgia, serif' }}>
          Lluvia
        </h2>
        <div className="w-16 h-0.5 bg-pink-300 mx-auto mt-3" />
      </motion.div>

      {/* Reproductor de Podcast */}
      <div className="flex-1 flex flex-col items-center justify-center space-y-8">
        {phase < 2 ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-48 h-48 rounded-3xl bg-white shadow-xl flex items-center justify-center relative overflow-hidden group"
            style={{
              background: 'linear-gradient(135deg, #fff5f5 0%, #ffe5ec 100%)',
            }}
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Music size={60} className="text-pink-300" />
            </motion.div>

            {/* Visualizer sutil */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1 h-8 items-end px-4">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1.5 bg-pink-400/30 rounded-full"
                  animate={{ height: ['20%', '100%', '40%', '80%', '20%'] }}
                  transition={{
                    duration: 1 + Math.random(),
                    repeat: Infinity,
                    delay: i * 0.1
                  }}
                />
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-xs space-y-6"
          >
            {/* Controles Principales */}
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-[2.5rem] shadow-lg border border-pink-100">
              <div className="flex flex-col items-center gap-6">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={togglePlay}
                  className="w-20 h-20 bg-pink-500 rounded-full flex items-center justify-center text-white shadow-xl shadow-pink-200"
                >
                  {isPlaying ? <Pause size={35} fill="white" /> : <Play size={35} fill="white" className="ml-1" />}
                </motion.button>

                {/* Slider de Volumen */}
                <div className="w-full flex items-center gap-3 px-2">
                  <Volume2 size={18} className="text-pink-400 shrink-0" />
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-full accent-pink-500 h-1.5 bg-pink-100 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Texto solicitado */}
            <div className="space-y-3">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-gray-600 font-medium text-sm"
              >
                Esta vez no es una imagen.
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-pink-600 font-bold text-xl"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                Es tu podcast.
              </motion.p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Interacción de Phasing */}
      <div className="mt-8">
        {phase === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p className="text-gray-500 text-sm mb-4 italic">Estaban mojados...</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setPhase(1)}
              className="px-8 py-3 bg-blue-100/80 text-blue-600 rounded-full text-sm font-medium backdrop-blur-sm border border-blue-200"
            >
              ¿Bailamos o te mojo? 🌧️
            </motion.button>
          </motion.div>
        )}

        {phase === 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <p className="text-gray-600 text-sm leading-relaxed">"Yo no bailo"</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setPhase(2)
                setTimeout(() => {
                  if (audioRef.current) {
                    audioRef.current.play().catch(e => console.error("Autoplay blocked:", e))
                    setIsPlaying(true)
                  }
                }, 500)
              }}
              className="px-8 py-3 bg-pink-100/80 text-pink-600 rounded-full text-sm font-medium backdrop-blur-sm border border-pink-200"
            >
              💦 Entonces te mojo
            </motion.button>
          </motion.div>
        )}

        {phase === 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="text-pink-600 italic text-sm px-4"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              "Yo lo recordé siempre. Tú decidiste cuándo."
            </motion.p>

            {showButton && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onComplete}
                className="bg-gradient-to-r from-pink-400 to-pink-500 text-white px-10 py-3 rounded-full text-sm font-bold shadow-lg shadow-pink-200 border-none"
              >
                Cosechar Tulipán 🌷
              </motion.button>
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}

