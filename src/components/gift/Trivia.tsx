'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useGiftStore } from '@/store/useGiftStore'

interface Question {
  question: string
  options: string[]
  correct: number
  hint?: string
}

export function Trivia() {
  const { completeTrivia } = useGiftStore()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [showHint, setShowHint] = useState(false)

  const questions: Question[] = [
    {
      question: '¿A qué hora nos encontrábamos en la cancha hasta que se iba la luz?',
      options: ['6:00 pm', '5:20 pm 🌅', '7:30 pm', '4:45 pm'],
      correct: 1,
    },
    {
      question: '¿Qué perdí en la loma y nunca encontré?',
      options: ['Mi gorra', 'Tu chaleco y tu gloss 💄', 'Las llaves', 'Mi teléfono'],
      correct: 1,
    },
    {
      question: '¿Qué intenté ser de disfraz pero no me salió?',
      options: ['Fantasma', 'Momia 🧟', 'Vampiro', 'Zombi'],
      correct: 1,
    },
    {
      question: '¿Cómo se llama nuestro "hijo" peluche murciélago?',
      options: ['Batbat', 'Abati 🦇', 'Murci', 'Drácula'],
      correct: 1,
    },
    {
      question: '¿Qué animal me despertó mientras tú no podías dormir por alergia?',
      options: ['Los perros', 'Los gatos', 'Los gallos finos de mi papá 🐓', 'Los pájaros'],
      correct: 2,
    },
  ]

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index)
    setShowResult(true)
    
    if (index === questions[currentQuestion].correct) {
      setScore(score + 1)
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
        setShowResult(false)
        setShowHint(false)
      } else {
        // Trivia completada
        completeTrivia()
      }
    }, 1500)
  }

  const getOptionColor = (index: number) => {
    if (!showResult) return 'bg-white hover:bg-pink-50'
    if (index === questions[currentQuestion].correct) return 'bg-green-100 border-green-500'
    if (index === selectedAnswer) return 'bg-red-100 border-red-500'
    return 'bg-white opacity-50'
  }

  const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3']

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
    >
      <motion.div
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
        className="w-full max-w-md"
      >
        {/* Header estilo Preguntados */}
        <div className="text-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="inline-block"
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center mx-auto mb-3 shadow-xl">
              <span className="text-4xl">❓</span>
            </div>
          </motion.div>
          <h2 className="text-2xl font-bold text-white">Trivia</h2>
          <p className="text-white/80 text-sm">¿Cuánto me conoces?</p>
        </div>

        {/* Barra de progreso */}
        <div className="mb-6">
          <div className="flex justify-between text-white/80 text-xs mb-2">
            <span>Pregunta {currentQuestion + 1}</span>
            <span>{questions.length - currentQuestion - 1} restantes</span>
          </div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-pink-400 to-yellow-400"
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
          {/* Puntos de preguntas */}
          <div className="flex justify-center gap-2 mt-3">
            {questions.map((_, i) => (
              <motion.div
                key={i}
                className="w-3 h-3 rounded-full"
                style={{
                  background: i < currentQuestion 
                    ? '#4ADE80' 
                    : i === currentQuestion 
                      ? '#F472B6' 
                      : 'rgba(255,255,255,0.3)',
                }}
                animate={i === currentQuestion ? { scale: [1, 1.3, 1] } : {}}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
            ))}
          </div>
        </div>

        {/* Pregunta */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="bg-white rounded-2xl p-6 shadow-2xl"
          >
            <p className="text-lg font-medium text-gray-800 text-center mb-6">
              {questions[currentQuestion].question}
            </p>

            {/* Opciones */}
            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <motion.button
                  key={index}
                  whileHover={!showResult ? { scale: 1.02 } : {}}
                  whileTap={!showResult ? { scale: 0.98 } : {}}
                  onClick={() => !showResult && handleAnswer(index)}
                  disabled={showResult}
                  className={`w-full p-4 rounded-xl border-2 transition-all ${getOptionColor(index)} flex items-center gap-3`}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                    style={{ background: colors[index] }}
                  >
                    {['A', 'B', 'C', 'D'][index]}
                  </div>
                  <span className="text-gray-700">{option}</span>
                  {showResult && index === questions[currentQuestion].correct && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="ml-auto text-green-500"
                    >
                      ✓
                    </motion.span>
                  )}
                </motion.button>
              ))}
            </div>

            {/* Pista */}
            {!showResult && questions[currentQuestion].hint && (
              <button
                onClick={() => setShowHint(!showHint)}
                className="mt-4 text-pink-500 text-sm underline"
              >
                {showHint ? questions[currentQuestion].hint : '💡 Ver pista'}
              </button>
            )}

            {/* Resultado */}
            {showResult && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-4 p-3 rounded-lg text-center ${
                  selectedAnswer === questions[currentQuestion].correct
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {selectedAnswer === questions[currentQuestion].correct
                  ? '¡Correcto! 🎉'
                  : '¡Ups! No era esa 😅'}
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Score */}
        <div className="mt-4 text-center">
          <span className="text-white/80 text-sm">
            Puntos: {score}/{questions.length}
          </span>
        </div>
      </motion.div>
    </motion.div>
  )
}
