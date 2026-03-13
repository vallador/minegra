'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

interface FlowerHogarProps {
  onComplete: () => void
}

export function FlowerHogar({ onComplete }: FlowerHogarProps) {
  const [phase, setPhase] = useState<'playing' | 'solved'>('playing')
  const [inputWord, setInputWord] = useState('')
  const [showError, setShowError] = useState(false)
  const [lightIndex, setLightIndex] = useState(-1)
  const [isSequenceRunning, setIsSequenceRunning] = useState(true)

  const audioRef1 = useRef<HTMLAudioElement | null>(null)
  const audioRef2 = useRef<HTMLAudioElement | null>(null)

  const targetPhrase = 'LUCES RISAS COMIDA Y STRANGER THINGS SIEMPRE CONTIGO'
  // El usuario pidió: “Luces, risas comida y Stranger Things… siempre contigo"
  // Validaremos de forma flexible (sin distinguir mayúsculas/minúsculas ni caracteres especiales como coma/puntos)

  const alphabetRows = [
    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
    ['I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q'],
    ['R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  ]

  // Convertir frase a secuencia de índices de letras (o -1 para espacios/pausas)
  const sequence = targetPhrase.split('').map(char => {
    if (char === ' ') return -1
    const letter = char.toUpperCase()
    for (let r = 0; r < alphabetRows.length; r++) {
      for (let c = 0; c < alphabetRows[r].length; c++) {
        if (alphabetRows[r][c] === letter) return { r, c, char: letter }
      }
    }
    return -1
  })

  useEffect(() => {
    // Iniciar audio 1
    if (audioRef1.current) {
      audioRef1.current.volume = 0.5
      audioRef1.current.play().catch(e => console.log("Audio play blocked:", e))
    }

    return () => {
      if (audioRef1.current) audioRef1.current.pause()
      if (audioRef2.current) audioRef2.current.pause()
    }
  }, [])

  useEffect(() => {
    let timer: any
    if (isSequenceRunning && phase === 'playing') {
      const step = () => {
        setLightIndex(prev => {
          if (prev >= sequence.length - 1) return 0
          return prev + 1
        })
        const nextChar = sequence[(lightIndex + 1) % sequence.length]
        const delay = nextChar === -1 ? 400 : 600 // Velocidad rápida como se solicitó
        timer = setTimeout(step, delay)
      }
      timer = setTimeout(step, 600)
    }
    return () => clearTimeout(timer)
  }, [isSequenceRunning, phase, lightIndex])

  const checkPhrase = () => {
    const normalizedInput = inputWord.toLowerCase().replace(/[.,…]/g, '').trim()
    const normalizedTarget = targetPhrase.toLowerCase()

    // Comprobamos si contiene las palabras clave principales por si hay errores de puntuación
    if (normalizedInput === normalizedTarget ||
      (normalizedInput.includes('luces') && normalizedInput.includes('risas') &&
        normalizedInput.includes('comida') && normalizedInput.includes('stranger') &&
        normalizedInput.includes('siempre contigo'))) {
      setPhase('solved')
      if (audioRef1.current) {
        audioRef1.current.pause()
      }
      if (audioRef2.current) {
        audioRef2.current.volume = 0.6
        audioRef2.current.play()
      }
    } else {
      setShowError(true)
      setTimeout(() => setShowError(false), 2000)
    }
  }

  const restartSequence = () => {
    setLightIndex(-1)
    setIsSequenceRunning(true)
  }

  return (
    <div className="flex flex-col h-full bg-[#0a0a0a] text-white">
      <audio ref={audioRef1} src="/stranger.mp3" loop />
      <audio ref={audioRef2} src="/STRANGER2.mp3" />

      <AnimatePresence mode="wait">
        {phase === 'playing' ? (
          <motion.div
            key="game"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col p-4 items-center gap-4"
          >
            {/* Cabecera */}
            <div className="text-center mb-2">
              <h2 className="text-red-600 font-bold text-2xl tracking-[0.2em]" style={{ fontFamily: 'Georgia, serif' }}>
                STRANGER THINGS
              </h2>
              <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Descifra el mensaje de las luces</p>
            </div>

            {/* Pared de luces */}
            <div
              className="relative w-full aspect-[4/3] rounded-lg overflow-hidden border border-gray-800 shadow-2xl"
              style={{
                backgroundImage: 'url("/paredstranger.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="absolute inset-0 bg-black/40 flex flex-col justify-center gap-6 p-4">
                {alphabetRows.map((row, rIdx) => (
                  <div key={rIdx} className="flex justify-around items-center">
                    {row.map((letter, lIdx) => {
                      const isActive = typeof sequence[lightIndex] === 'object' &&
                        (sequence[lightIndex] as any).r === rIdx &&
                        (sequence[lightIndex] as any).c === lIdx

                      const lightColor = ['#ffed4a', '#ff4a4a', '#4aff62', '#4a90ff', '#f04aff'][(rIdx * 10 + lIdx) % 5]

                      return (
                        <div key={letter} className="relative flex flex-col items-center">
                          {/* Luz */}
                          <motion.div
                            animate={{
                              opacity: isActive ? 1 : 0.1,
                              scale: isActive ? 1.2 : 1,
                              boxShadow: isActive ? `0 0 20px ${lightColor}, 0 0 40px ${lightColor}` : 'none'
                            }}
                            className="w-3 h-3 rounded-full mb-1"
                            style={{ backgroundColor: lightColor }}
                          />
                          {/* Letra */}
                          <span
                            className={`text-xl font-bold font-mono transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/20'}`}
                          >
                            {letter}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>

            {/* Controles */}
            <div className="w-full space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputWord}
                  onChange={(e) => setInputWord(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && checkPhrase()}
                  placeholder="Escribe el mensaje aquí..."
                  className="flex-1 bg-gray-900 border border-red-900/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-600 transition-colors text-sm"
                />
                <button
                  onClick={checkPhrase}
                  className="bg-red-700 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-bold transition-colors"
                >
                  VALIDAR
                </button>
              </div>

              <div className="flex justify-between items-center">
                <button
                  onClick={restartSequence}
                  className="text-xs text-gray-400 hover:text-white flex items-center gap-1 transition-colors"
                >
                  <motion.span animate={{ rotate: isSequenceRunning ? 0 : 360 }}>🔄</motion.span>
                  REINICIAR SEQUENCIA
                </button>

                <AnimatePresence>
                  {showError && (
                    <motion.span
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-red-500 text-xs font-bold"
                    >
                      ¡Mensaje incorrecto! Intenta de nuevo...
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="solved"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center p-6 text-center gap-6"
          >
            <div className="relative w-full aspect-[9/16] max-h-[50vh] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10">
              <img
                src="/ilustracionstranger.png"
                alt="Stranger Things Illustration"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-red-600 tracking-wider">SIEMPRE CONTIGO</h3>
              <p className="text-gray-300 italic text-sm leading-relaxed px-4">
                "Luces, risas comida y Stranger Things… siempre contigo"
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onComplete}
              className="mt-4 bg-white text-black px-10 py-3 rounded-full font-bold shadow-lg hover:bg-gray-200 transition-colors"
            >
              CONTINUAR
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
