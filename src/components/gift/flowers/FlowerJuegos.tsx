'use client'

import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { CheckCircle2 } from 'lucide-react'

interface FlowerJuegosProps {
  onComplete: () => void
}

export function FlowerJuegos({ onComplete }: FlowerJuegosProps) {
  const [phase, setPhase] = useState(0) // 0: Intro, 1: Box, 2: Notebook, 3: Balloons, 4: Mites, 5: Penguins, 6: Summary
  const [subPhase, setSubPhase] = useState(0)

  // Game 1: Box
  const [boxShakes, setBoxShakes] = useState(0)
  const boxControls = useAnimation()

  // Game 3: Balloons
  const [poppedBalloons, setPoppedBalloons] = useState<number[]>([])
  const totalBalloons = 6

  // Game 4: Mites
  const [killedMites, setKilledMites] = useState<number[]>([])
  const totalMites = 8

  const handleNextPhase = () => {
    setPhase(prev => prev + 1)
    setSubPhase(0)
  }

  return (
    <div className="p-6 text-center min-h-[450px] flex flex-col items-center justify-between">
      {/* Header */}
      {phase < 6 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4"
        >
          <div className="flex justify-center gap-2 mb-1">
            <span className="text-2xl">🎮</span>
            <span className="text-2xl font-bold text-pink-500">Tulipán 4</span>
          </div>
          <p className="text-xs text-gray-500 italic">"Ya que te gusta tanto jugar Preguntados..."</p>
          <div className="w-16 h-0.5 bg-pink-200 mx-auto mt-2" />
        </motion.div>
      )}

      <div className="flex-1 w-full flex items-center justify-center py-4">
        <AnimatePresence mode="wait">
          {phase === 0 && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="space-y-6"
            >
              <p className="text-gray-600 text-lg leading-relaxed">
                Veamos qué tanto recuerdas.<br />
                <span className="text-pink-500 font-bold">Cada respuesta correcta desbloquea un recuerdo.</span>
              </p>
              <button
                onClick={handleNextPhase}
                className="bg-pink-500 text-white px-8 py-3 rounded-full shadow-lg font-bold"
              >
                Empezar 🚀
              </button>
            </motion.div>
          )}

          {/* GAME 1: LA CAJA DE BARTOLITO */}
          {phase === 1 && (
            <motion.div
              key="game1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6 w-full"
            >
              <p className="text-gray-500 text-sm italic">🎮 Minijuego 1 — La caja de Bartolito</p>

              <div className="relative h-48 flex items-center justify-center">
                {subPhase === 0 ? (
                  <motion.div
                    animate={boxControls}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setBoxShakes(s => s + 1)
                      boxControls.start({
                        x: [0, -10, 10, -10, 10, 0],
                        transition: { duration: 0.3 }
                      })
                      if (boxShakes >= 5) setSubPhase(1)
                    }}
                    className="text-8xl cursor-pointer select-none drop-shadow-xl"
                  >
                    📦
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ y: 20, opacity: 0, scale: 0.5 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    className="flex flex-col items-center"
                  >
                    <motion.span
                      animate={{ y: [0, -10, 0] }}
                      transition={{ repeat: Infinity, duration: 1 }}
                      className="text-8xl"
                    >
                      🐓
                    </motion.span>
                    <p className="text-pink-600 font-bold mt-2">Bartolito ha aparecido.</p>
                  </motion.div>
                )}
              </div>

              <div className="h-20 flex flex-col justify-center">
                {subPhase === 0 ? (
                  <p className="text-gray-600">Parece que aquí hay algo adentro.<br /><span className="text-[10px] uppercase tracking-widest text-pink-300">Sacude la caja</span></p>
                ) : (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-gray-400 text-xs italic"
                  >
                    sí… regalar un pollo vivo sigue siendo cuestionable.
                  </motion.p>
                )}
              </div>

              {subPhase === 1 && (
                <button
                  onClick={handleNextPhase}
                  className="text-pink-400 text-xl"
                >
                  →
                </button>
              )}
            </motion.div>
          )}

          {/* GAME 2: LA LIBRETA */}
          {phase === 2 && (
            <motion.div
              key="game2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4 w-full"
            >
              <p className="text-gray-500 text-sm italic">📓 Minijuego 2 — La libreta</p>

              <div className="relative h-56 flex flex-col items-center justify-center">
                {subPhase === 0 ? (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSubPhase(1)}
                    className="text-9xl cursor-pointer drop-shadow-lg"
                  >
                    📓
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ rotateY: 90, opacity: 0 }}
                    animate={{ rotateY: 0, opacity: 1 }}
                    className="w-full flex flex-col items-center"
                  >
                    <div className="w-40 h-40 bg-white p-2 rounded-lg shadow-xl border border-gray-100 rotate-[-2deg]">
                      <img src="/rony.png" alt="Recuerdo" className="w-full h-full object-cover rounded" />
                    </div>
                    <p className="text-pink-600 font-medium mt-4">algunas historias necesitan escribirse.</p>
                  </motion.div>
                )}
              </div>

              <p className="text-gray-600 text-sm">
                {subPhase === 0 ? "Hay algo guardado aquí." : ""}
              </p>

              {subPhase === 1 && (
                <button
                  onClick={handleNextPhase}
                  className="text-pink-400 text-xl"
                >
                  →
                </button>
              )}
            </motion.div>
          )}

          {/* GAME 3: FERIA DE GLOBOS */}
          {phase === 3 && (
            <motion.div
              key="game3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4 w-full"
            >
              <p className="text-gray-500 text-sm italic">🎯 Minijuego 3 — Feria de globos</p>

              <div className="relative h-64 bg-blue-50/50 rounded-2xl border-2 border-dashed border-blue-100 overflow-hidden">
                {poppedBalloons.length < totalBalloons ? (
                  <div className="grid grid-cols-3 gap-4 p-4">
                    {[...Array(totalBalloons)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{
                          y: [0, -10, 0],
                          rotate: [0, 5, -5, 0]
                        }}
                        transition={{ duration: 2 + i % 2, repeat: Infinity }}
                        className={`text-4xl cursor-pointer select-none transition-opacity ${poppedBalloons.includes(i) ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                        onClick={() => setPoppedBalloons(prev => [...prev, i])}
                      >
                        🎈
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute inset-0 flex flex-col items-center justify-center bg-white/40 backdrop-blur-sm"
                  >
                    <div className="w-44 h-44 bg-white p-2 rounded-lg shadow-2xl border-4 border-yellow-400 rotate-[3deg]">
                      <img src="/fresis.png" alt="Premio" className="w-full h-full object-cover rounded" />
                    </div>
                    <p className="text-pink-600 font-bold mt-4 uppercase tracking-widest">premio desbloqueado</p>
                  </motion.div>
                )}
              </div>

              <p className="text-gray-600 text-sm font-medium">
                {poppedBalloons.length < totalBalloons ? "Nivel feria desbloqueado. Revienta los globos." : "¡Excelente puntería!"}
              </p>

              {poppedBalloons.length === totalBalloons && (
                <button
                  onClick={handleNextPhase}
                  className="text-pink-400 text-xl"
                >
                  →
                </button>
              )}
            </motion.div>
          )}

          {/* GAME 4: ATAQUE DE ACAROS */}
          {phase === 4 && (
            <motion.div
              key="game4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4 w-full"
            >
              <p className="text-gray-500 text-sm italic">🦠 Minijuego 4 — Ataque de ácaros</p>

              <div className="relative h-64 bg-gray-50 rounded-2xl border overflow-hidden">
                {killedMites.length < totalMites ? (
                  <div className="relative w-full h-full">
                    {[...Array(totalMites)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{
                          x: Math.random() * 200 - 100,
                          y: Math.random() * 200 - 100
                        }}
                        animate={{
                          x: [Math.random() * 100, Math.random() * -100, Math.random() * 100],
                          y: [Math.random() * 100, Math.random() * -100, Math.random() * 100],
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className={`absolute text-2xl cursor-pointer select-none left-1/2 top-1/2 ${killedMites.includes(i) ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                        onClick={() => setKilledMites(prev => [...prev, i])}
                      >
                        🦠
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 flex flex-col items-center justify-center bg-green-50/50"
                  >
                    <CheckCircle2 size={60} className="text-green-500 mb-2" />
                    <p className="text-green-700 font-bold uppercase tracking-widest">invasión controlada</p>
                  </motion.div>
                )}
              </div>

              <p className="text-gray-600 text-sm">
                {killedMites.length < totalMites ? "parece que hay una invasión." : "Todo limpio ahora."}
              </p>

              {killedMites.length === totalMites && (
                <button
                  onClick={handleNextPhase}
                  className="text-pink-400 text-xl"
                >
                  →
                </button>
              )}
            </motion.div>
          )}

          {/* GAME 5: PINGÜINOS */}
          {phase === 5 && (
            <motion.div
              key="game5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4 w-full"
            >
              <p className="text-gray-500 text-sm italic">🐧 Minijuego 5 — Pingüinos</p>

              <div
                className="relative h-64 rounded-2xl border overflow-hidden bg-cover bg-center"
                style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.7)), url("/pexels-background.jpg")' }}
              >
                <div className="absolute inset-x-0 bottom-4 flex justify-center items-end h-32">
                  <motion.div
                    animate={{
                      x: subPhase * 40 - 100,
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ type: 'spring' }}
                    onClick={() => {
                      if (subPhase < 5) setSubPhase(s => s + 1)
                    }}
                    className="text-7xl cursor-pointer select-none"
                  >
                    🐧
                  </motion.div>
                </div>

                <div className="absolute top-4 left-1/2 -translate-x-1/2 text-[10px] text-gray-400 uppercase tracking-tighter">
                  Pasillo del centro comercial
                </div>
              </div>

              <div className="h-16 flex flex-col justify-center">
                {subPhase < 5 ? (
                  <p className="text-gray-600 text-sm italic">nivel final.<br /><span className="text-[10px] font-bold text-pink-300">TOCA EL PINGÜINO PARA HACERLO AVANZAR</span></p>
                ) : (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-pink-600 font-bold"
                  >
                    confirmado… corríamos como pingüinos.
                  </motion.p>
                )}
              </div>

              {subPhase === 5 && (
                <button
                  onClick={handleNextPhase}
                  className="text-pink-400 text-xl"
                >
                  →
                </button>
              )}
            </motion.div>
          )}

          {/* SUMMARY */}
          {phase === 6 && (
            <motion.div
              key="summary"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-8 w-full"
            >
              <div className="flex justify-center gap-4 text-4xl">
                {['📦', '🐔', '📓', '🎈', '🐧'].map((emoji, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: i * 0.2 }}
                  >
                    {emoji}
                  </motion.span>
                ))}
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="text-gray-600 text-lg md:text-xl font-medium"
              >
                parece que acumulamos bastantes historias.
              </motion.p>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onComplete}
                className="bg-pink-500 text-white px-10 py-4 rounded-full font-bold shadow-xl shadow-pink-200"
              >
                Cosechar Tulipán 🌷
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Barra de progreso */}
      {phase > 0 && phase < 6 && (
        <div className="w-full grid grid-cols-5 gap-1 pt-4">
          {[1, 2, 3, 4, 5].map((p) => (
            <div
              key={p}
              className={`h-1 rounded-full transition-all duration-500 ${p <= phase ? 'bg-pink-400' : 'bg-pink-100'
                }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

