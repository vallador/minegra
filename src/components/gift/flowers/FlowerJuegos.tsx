'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import { CheckCircle2, XCircle, Trophy } from 'lucide-react'

interface FlowerJuegosProps {
  onComplete: () => void
}

type Phase = 'intro' | 'trivia' | 'game' | 'summary'

interface TriviaQuestion {
  question: string
  options: string[]
  correctIndex: number
}

const TRIVIA_QUESTIONS: TriviaQuestion[] = [
  {
    question: "¿Cuál es el nombre del pollo que nos persigue?",
    options: ["Claudio", "Bartolito", "Pío Pío"],
    correctIndex: 1
  },
  {
    question: "¿Qué nombre tiene el perrito de la libreta?",
    options: ["Rony", "Firu", "Bobby"],
    correctIndex: 0
  },
  {
    question: "¿Dónde ganamos el premio de los globos?",
    options: ["El parque", "La calle", "La feria"],
    correctIndex: 2
  },
  {
    question: "¿Quiénes hicieron la invasión?",
    options: ["Los marcianos", "Los ácaros", "Las hormigas"],
    correctIndex: 1
  },
  {
    question: "¿Cómo hacíamos que corríamos en el mall?",
    options: ["Como ninjas", "Como pingüinos", "Como atletas"],
    correctIndex: 1
  },
]

export function FlowerJuegos({ onComplete }: FlowerJuegosProps) {
  const [phase, setPhase] = useState<Phase>('intro')
  const [currentGameIndex, setCurrentGameIndex] = useState(0)
  const [triviaState, setTriviaState] = useState<'selecting' | 'correct' | 'incorrect'>('selecting')
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

  // Game 5: Penguins Obstacles
  const [penguinPos, setPenguinPos] = useState(0)
  const [obstacles, setObstacles] = useState<{ id: number; x: number; y: number }[]>([])
  const obstacleInterval = useRef<NodeJS.Timeout | null>(null)
  const collisionInterval = useRef<NodeJS.Timeout | null>(null)

  const handleNextPhase = () => {
    if (phase === 'intro') {
      setPhase('trivia')
    } else if (phase === 'trivia') {
      setPhase('game')
      setSubPhase(0)
      if (currentGameIndex === 4) startPenguinGame()
    } else if (phase === 'game') {
      if (currentGameIndex < 4) {
        setCurrentGameIndex(prev => prev + 1)
        setPhase('trivia')
        setTriviaState('selecting')
      } else {
        setPhase('summary')
      }
    }
  }

  const startPenguinGame = () => {
    setPenguinPos(0)
    setObstacles([])

    // Generar obstáculos
    obstacleInterval.current = setInterval(() => {
      setObstacles(prev => [
        ...prev.filter(o => o.y < 350),
        { id: Math.random(), x: Math.random() * 200 - 100, y: -50 }
      ])
    }, 1500)

    // Logica de caída
    collisionInterval.current = setInterval(() => {
      setObstacles(prev => prev.map(o => ({ ...o, y: o.y + 10 })))
    }, 100)
  }

  // Colisión
  useEffect(() => {
    if (phase === 'game' && currentGameIndex === 4) {
      const hit = obstacles.find(o =>
        Math.abs(o.x - (penguinPos * 40 - 100)) < 40 &&
        o.y > 180 && o.y < 220
      )
      if (hit) {
        setPenguinPos(0)
        setObstacles([])
      }
    }
  }, [obstacles, penguinPos, phase, currentGameIndex])

  // Limpieza
  useEffect(() => {
    return () => {
      if (obstacleInterval.current) clearInterval(obstacleInterval.current)
      if (collisionInterval.current) clearInterval(collisionInterval.current)
    }
  }, [])

  const handleTriviaAnswer = (index: number) => {
    if (index === TRIVIA_QUESTIONS[currentGameIndex].correctIndex) {
      setTriviaState('correct')
      setTimeout(handleNextPhase, 1500)
    } else {
      setTriviaState('incorrect')
      setTimeout(() => setTriviaState('selecting'), 2000)
    }
  }

  return (
    <div className="p-6 text-center min-h-[500px] flex flex-col items-center justify-between bg-white rounded-3xl overflow-hidden shadow-sm">

      {/* ProgressBar */}
      {phase !== 'summary' && (
        <div className="w-full flex gap-1 mb-4">
          {TRIVIA_QUESTIONS.map((_, i) => (
            <div key={i} className="flex-1 h-1.5 flex gap-0.5">
              <div className={`h-full flex-1 rounded-l-full ${i < currentGameIndex || (i === currentGameIndex && phase === 'game') ? 'bg-pink-400' : 'bg-pink-100'}`} />
              <div className={`h-full w-2 ${i < currentGameIndex ? 'bg-pink-400' : 'bg-pink-100'}`} />
            </div>
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        {phase === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="space-y-8 py-10"
          >
            <div className="space-y-2">
              <span className="text-6xl">👑</span>
              <h2 className="text-3xl font-black text-pink-600">Preguntados</h2>
              <p className="text-gray-500 font-medium">Versión Edición Especial</p>
            </div>

            <p className="text-gray-600 px-4">
              Cada respuesta correcta desbloquea un minijuego y un recuerdo. ¿Estás lista?
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNextPhase}
              className="bg-pink-500 text-white px-12 py-4 rounded-full shadow-xl font-black tracking-wider"
            >
              ¡SÍ, VAMOS! 🚀
            </motion.button>
          </motion.div>
        )}

        {phase === 'trivia' && (
          <motion.div
            key={`trivia-${currentGameIndex}`}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            className="w-full space-y-8"
          >
            <div className="bg-pink-50 p-4 rounded-2xl border-b-4 border-pink-200">
              <span className="text-xs font-bold text-pink-400 uppercase tracking-widest">Pregunta {currentGameIndex + 1}</span>
              <h3 className="text-xl font-bold text-gray-800 mt-2">{TRIVIA_QUESTIONS[currentGameIndex].question}</h3>
            </div>

            <div className="space-y-3">
              {TRIVIA_QUESTIONS[currentGameIndex].options.map((opt, i) => (
                <motion.button
                  key={i}
                  disabled={triviaState !== 'selecting'}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleTriviaAnswer(i)}
                  className={`w-full p-4 rounded-2xl font-bold text-left transition-all border-b-4 ${triviaState === 'selecting'
                    ? 'bg-white border-gray-200 text-gray-700 hover:border-pink-300'
                    : i === TRIVIA_QUESTIONS[currentGameIndex].correctIndex
                      ? 'bg-green-500 border-green-700 text-white'
                      : 'bg-white border-gray-200 opacity-50 text-gray-400'
                    }`}
                >
                  {opt}
                </motion.button>
              ))}
            </div>

            <AnimatePresence>
              {triviaState === 'incorrect' && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center gap-2"
                >
                  <XCircle size={60} className="text-red-500" />
                  <p className="text-red-600 font-black">INTÉNTALO NUEVAMENTE</p>
                </motion.div>
              )}
              {triviaState === 'correct' && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center gap-2"
                >
                  <CheckCircle2 size={60} className="text-green-500" />
                  <p className="text-green-600 font-black">¡CORRECTO!</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {phase === 'game' && (
          <motion.div
            key={`game-${currentGameIndex}`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full flex-1 flex flex-col items-center justify-center pt-10"
          >
            {/* GAME 1: BOX */}
            {currentGameIndex === 0 && (
              <div className="space-y-6 w-full">
                <p className="text-pink-500 font-bold">📦 Nivel: La caja</p>
                <div className="h-48 flex items-center justify-center">
                  {subPhase === 0 ? (
                    <motion.div
                      animate={boxControls}
                      onClick={() => {
                        setBoxShakes(s => s + 1)
                        boxControls.start({ x: [0, -10, 10, -10, 10, 0], transition: { duration: 0.2 } })
                        if (boxShakes >= 5) setSubPhase(1)
                      }}
                      className="text-8xl cursor-pointer"
                    >📦</motion.div>
                  ) : (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex flex-col items-center">
                      <span className="text-8xl">🐓</span>
                      <p className="text-pink-600 font-bold mt-2 italic">"Bartolito ha aparecido"</p>
                    </motion.div>
                  )}
                </div>
                {subPhase === 1 && <button onClick={handleNextPhase} className="bg-pink-100 text-pink-600 px-6 py-2 rounded-full font-bold">Siguiente Mini-Juego →</button>}
              </div>
            )}

            {/* GAME 2: NOTEBOOK */}
            {currentGameIndex === 1 && (
              <div className="space-y-6 w-full">
                <p className="text-pink-500 font-bold">📓 Nivel: La libreta</p>
                <div className="h-48 flex items-center justify-center">
                  {subPhase === 0 ? (
                    <motion.div whileTap={{ rotateY: 180 }} onClick={() => setSubPhase(1)} className="text-8xl cursor-pointer">📓</motion.div>
                  ) : (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-4">
                      <div className="w-32 h-32 rounded-xl overflow-hidden shadow-xl border-4 border-white rotate-3">
                        <img src="/libreta.jpeg" className="w-full h-full object-cover" />
                      </div>
                      <p className="text-gray-500 font-medium italic">"tu y tu poesía"</p>
                    </motion.div>
                  )}
                </div>
                {subPhase === 1 && <button onClick={handleNextPhase} className="bg-pink-100 text-pink-600 px-6 py-2 rounded-full font-bold">Siguiente Mini-Juego →</button>}
              </div>
            )}

            {/* GAME 3: BALLOONS */}
            {currentGameIndex === 2 && (
              <div className="space-y-4 w-full h-[350px] flex flex-col items-center">
                <p className="text-pink-500 font-bold">🎈 Nivel: Feria</p>
                <div className="flex-1 w-full bg-blue-50 relative rounded-2xl overflow-hidden grid grid-cols-3 gap-2 p-4 border border-blue-100">
                  {poppedBalloons.length < totalBalloons ? [...Array(totalBalloons)].map((_, i) => (
                    <motion.div key={i} animate={{ y: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 2 + i }} onClick={() => setPoppedBalloons([...poppedBalloons, i])} className={`text-4xl cursor-pointer ${poppedBalloons.includes(i) ? 'opacity-0 scale-0 pointer-events-none' : ''}`}>🎈</motion.div>
                  )) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-white/20 backdrop-blur-sm">
                      <div className="w-32 h-32 rounded-xl overflow-hidden shadow-xl border-4 border-white -rotate-3">
                        <img src="/mundoaventura.jpg" className="w-full h-full object-cover" />
                      </div>
                      <p className="text-yellow-600 font-black text-xs text-center px-4">"te has ganado un hijo murciélago BATI"</p>
                      <button onClick={handleNextPhase} className="bg-pink-500 text-white px-6 py-2 rounded-full font-bold">Siguiente →</button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* GAME 4: MITES */}
            {currentGameIndex === 3 && (
              <div className="space-y-4 w-full h-[350px] flex flex-col items-center">
                <p className="text-pink-500 font-bold">🦠 Nivel: Invasión</p>
                <div
                  className="flex-1 w-full relative rounded-2xl overflow-hidden border bg-cover bg-center"
                  style={{ backgroundImage: 'url("/acaros.png")' }}
                >
                  {killedMites.length < 15 ? [...Array(15)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{
                        x: Math.random() * 200 - 100,
                        y: Math.random() * 200 - 100
                      }}
                      animate={{
                        x: [Math.random() * 150, Math.random() * -150, Math.random() * 150],
                        y: [Math.random() * 150, Math.random() * -150, Math.random() * 150],
                        rotate: [0, 360]
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 2 + Math.random() * 2,
                        ease: 'linear'
                      }}
                      onClick={() => setKilledMites(prev => [...prev, i])}
                      className={`absolute text-3xl cursor-pointer left-1/2 top-1/2 ${killedMites.includes(i) ? 'scale-0 opacity-0 pointer-events-none' : ''}`}
                    >
                      🦠
                    </motion.div>
                  )) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-green-50/80 backdrop-blur-sm">
                      <CheckCircle2 size={50} className="text-green-500" />
                      <p className="text-green-700 font-black tracking-widest">INVASIÓN CONTROLADA</p>
                      <button onClick={handleNextPhase} className="bg-green-500 text-white px-8 py-2 rounded-full font-bold mt-4 shadow-lg">Continuar</button>
                    </div>
                  )}
                </div>
                {killedMites.length < 15 && <p className="text-[10px] text-white bg-black/50 px-2 rounded">¡Rápido, elimínalos a todos!</p>}
              </div>
            )}

            {/* GAME 5: PENGUINS */}
            {currentGameIndex === 4 && (
              <div className="space-y-4 w-full h-[350px] flex flex-col items-center">
                <p className="text-pink-500 font-bold">🐧 Nivel Final: Mall</p>
                <div className="flex-1 w-full bg-sky-50 relative rounded-2xl overflow-hidden flex flex-col items-center">
                  {/* Obstaculos */}
                  {obstacles.map(o => (
                    <motion.span
                      key={o.id}
                      style={{ x: o.x, y: o.y, position: 'absolute' }}
                      className="text-2xl"
                    >
                      📦
                    </motion.span>
                  ))}

                  <div className="absolute bottom-10 flex flex-col items-center">
                    <motion.div
                      animate={{ x: penguinPos * 40 - 100 }}
                      onClick={() => {
                        if (penguinPos < 5) setPenguinPos(p => p + 1)
                      }}
                      className="text-7xl cursor-pointer drop-shadow-md"
                    >
                      🐧
                    </motion.div>
                    {penguinPos === 0 && <span className="text-[10px] text-gray-400 font-bold animate-pulse mt-2">TOCA EL PINGÜINO PARA AVANZAR</span>}
                    {penguinPos > 0 && penguinPos < 5 && <div className="h-1 w-24 bg-gray-200 rounded-full mt-2"><div className="h-full bg-blue-400 rounded-full transition-all" style={{ width: `${penguinPos * 20}%` }} /></div>}
                  </div>

                  <div className="absolute top-2 right-4 text-[10px] font-black text-blue-200">ESQUIVA LAS CAJAS</div>
                </div>
                {penguinPos >= 5 && <p className="text-pink-600 font-bold animate-bounce mt-2 text-center text-xs">"confirmado… corríamos como pingüinos"</p>}
                {penguinPos >= 5 && <button onClick={handleNextPhase} className="bg-pink-500 text-white px-10 py-3 rounded-full font-black shadow-xl mt-2">Finalizar Historias ✨</button>}
              </div>
            )}
          </motion.div>
        )}

        {phase === 'summary' && (
          <motion.div
            key="summary"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-10 py-6"
          >
            <Trophy size={80} className="text-yellow-400 mx-auto" />
            <div className="flex justify-center gap-4 text-4xl">
              {['📦', '🐔', '📓', '🎈', '🐧'].map((e, i) => (
                <motion.span key={i} animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, delay: i * 0.2 }}>{e}</motion.span>
              ))}
            </div>
            <p className="text-gray-600 text-xl font-medium px-4">
              parece que acumulamos bastantes historias.
            </p>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onComplete}
              className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-12 py-5 rounded-full font-black text-xl shadow-2xl shadow-pink-200"
            >
              Cosechar Tulipán 🌷
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

