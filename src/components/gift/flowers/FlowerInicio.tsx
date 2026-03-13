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
  const [choice, setChoice] = useState<null | 'accept' | 'reject'>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [])

  // El timer de showButton se usa al final de la historia
  useEffect(() => {
    if (phase === 5) { // Fase final después de los videos
      const timer = setTimeout(() => setShowButton(true), 1500)
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
    <div className="p-6 text-center relative max-h-[80vh] overflow-y-auto custom-scrollbar">
      {/* Elemento de Audio - Único y siempre presente */}
      <audio
        ref={audioRef}
        src="/primer tulipan audio.ogg"
        onEnded={() => setIsPlaying(false)}
        preload="auto"
      />

      {/* Botón de Cerrar (Solo al final) */}
      {showButton && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => { toggleAudio(false); onComplete(); }}
          className="absolute top-0 right-0 p-2 text-pink-500 hover:text-pink-700 z-50"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-8 h-8">
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </motion.button>
      )}

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

      {/* Texto e Interacción */}
      <div className="space-y-6">
        {phase === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-6 px-4">
            <div className="mb-8">
              <span className="text-5xl animate-pulse inline-block mb-4">🎵</span>
              <p className="text-pink-600 text-lg font-medium" style={{ fontFamily: 'Georgia, serif' }}>
                Antes de comenzar...
              </p>
              <p className="text-gray-500 text-sm mt-2">
                Escucha lo que tengo que decirte
              </p>
            </div>

            {/* Reproductor Central Prominente */}
            <div className="flex flex-col items-center gap-6 mb-12">
              <motion.div
                className="flex flex-col items-center gap-4 bg-pink-50 p-8 rounded-[40px] shadow-xl border-4 border-white relative overflow-hidden"
                whileHover={{ scale: 1.02 }}
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => toggleAudio()}
                  className="w-24 h-24 bg-pink-500 text-white rounded-full flex items-center justify-center shadow-2xl shadow-pink-200 border-[6px] border-white z-10"
                >
                  {isPlaying ? (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12">
                      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 ml-2">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </motion.button>

                <div className="w-full space-y-2 z-10">
                  <input
                    type="range" min="0" max="1" step="0.01" value={volume}
                    onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                    className="w-48 h-2 bg-pink-200 rounded-lg appearance-none cursor-pointer accent-pink-500"
                  />
                </div>
              </motion.div>
            </div>

            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.1, backgroundColor: '#db2777' }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setPhase(1)}
                className="w-20 h-20 bg-pink-500 text-white rounded-full flex items-center justify-center shadow-2xl shadow-pink-200 border-4 border-white mx-auto text-4xl font-bold transition-colors"
              >
                →
              </motion.button>
              <p className="text-pink-300 text-[10px] mt-4 tracking-[0.3em] uppercase font-black">
                Comenzar historia
              </p>
            </div>
          </motion.div>
        )}

        {phase === 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="relative w-full rounded-2xl overflow-hidden shadow-xl border-4 border-white">
              <img src="/captura 1.png" alt="Cancha" className="w-full h-auto" />
            </div>

            <div className="space-y-4">
              <p className="text-gray-600 italic text-sm">¿Te acuerdas de este momento?</p>

              <div className="flex justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => { setChoice('accept'); setPhase(2); }}
                  className="px-8 py-3 bg-green-500 text-white rounded-full font-bold shadow-lg shadow-green-100 uppercase tracking-widest text-xs"
                >
                  Acepto
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => { setChoice('reject'); setPhase(2); }}
                  className="px-8 py-3 bg-red-500 text-white rounded-full font-bold shadow-lg shadow-red-100 uppercase tracking-widest text-xs"
                >
                  Rechazo
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {phase === 2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative w-full rounded-2xl overflow-hidden shadow-xl border-4 border-white"
            >
              <img
                src={choice === 'accept' ? "/captura 2.png" : "/captura 3.png"}
                alt="Resultado"
                className="w-full h-auto"
              />
            </motion.div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setPhase(3)}
              className="w-14 h-14 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center shadow-md mx-auto text-3xl font-bold"
            >
              →
            </motion.button>
          </motion.div>
        )}

        {phase === 3 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 py-4">
            <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-black">
              <video
                src="/video 1.mp4"
                controls
                autoPlay
                className="w-full h-auto"
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-pink-100 shadow-sm"
            >
              <p className="text-gray-700 leading-relaxed font-medium text-sm" style={{ fontFamily: 'Georgia, serif' }}>
                "Los dos la dabamos toda jaja no queriamos perder y yo pensando jaaa yo no le voy a soltar la mano a valentina jaja pero me mirabas mal sino te a soltaba"
              </p>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setPhase(4)}
              className="w-14 h-14 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center shadow-md mx-auto text-3xl font-bold"
            >
              →
            </motion.button>
          </motion.div>
        )}

        {phase === 4 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 py-4">
            <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-black">
              <video
                src="/video 2.mp4"
                controls
                autoPlay
                className="w-full h-auto"
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-pink-100 shadow-sm"
            >
              <p className="text-gray-700 leading-relaxed font-medium text-sm" style={{ fontFamily: 'Georgia, serif' }}>
                "Cuando empezaste a jugar mejor basket me sentía re orgulloso me posteabas y todo, esos triples que buenos eran, aprendiste la vuelta que te enseñé jaja y decias 'balerina capuccina' que lindo recordarlo extraño jugar contigo, baskeeeet basket"
              </p>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setPhase(5)}
              className="w-14 h-14 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center shadow-md mx-auto text-3xl font-bold"
            >
              →
            </motion.button>
          </motion.div>
        )}

        {phase === 5 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 py-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative w-full max-w-sm mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-white"
            >
              <img src="/ilustracion.png" alt="Ilustración" className="w-full h-auto" />
              <div className="absolute top-4 right-4 text-4xl animate-bounce">
                ❤️
              </div>
            </motion.div>

            <div className="space-y-4 pt-4">
              <p className="text-pink-600 font-medium text-2xl" style={{ fontFamily: 'Georgia, serif' }}>
                Elegí el hábito de estar.
              </p>

              <div className="space-y-2">
                <p className="text-gray-600 text-sm italic">
                  Algunas historias empiezan con una rutina.
                </p>
                <p className="text-gray-700 font-medium">
                  La nuestra empezó muchas veces a las 5:20.
                </p>
              </div>
            </div>

            <p className="text-gray-400 text-[10px] italic mt-12 bg-gray-50 py-2 rounded-full">
              Puedes cerrar esta historia arriba a la derecha.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
