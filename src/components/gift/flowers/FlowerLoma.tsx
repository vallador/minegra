'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'

interface FlowerLomaProps {
  onComplete: () => void
}

interface Dog {
  id: string
  name: string
  image: string
  subtitle: string
}

const DOGS: Dog[] = [
  { id: 'rony', name: 'Rony', image: '/rony.png', subtitle: 'El negro más temido' },
  { id: 'princesa', name: 'Princesa', image: '/princesa.png', subtitle: 'Mi bebé conscentida' },
  { id: 'fresis', name: 'Fresis', image: '/FRESIS.png', subtitle: 'la que tiene una cama mas grande que la mía' },
  { id: 'celes', name: 'Celes', image: '/CELES.png', subtitle: 'la mas salvaje, dijiste que eras tu' },
]

export function FlowerLoma({ onComplete }: FlowerLomaProps) {
  const [phase, setPhase] = useState(0)
  const [selectedDogs, setSelectedDogs] = useState<string[]>([])
  const [choice, setChoice] = useState<null | 'dar' | 'caer'>(null)
  const [isCameraMode, setIsCameraMode] = useState(false)
  const [focusSection, setFocusSection] = useState<null | 1 | 2>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const toggleDog = (id: string) => {
    setSelectedDogs(prev =>
      prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]
    )
  }

  // Auto-scroll logic when phase changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [phase])

  return (
    <div
      ref={scrollRef}
      className={`p-6 text-center relative max-h-[80vh] overflow-y-auto custom-scrollbar ${isCameraMode ? 'cursor-camera' : ''}`}
      style={isCameraMode ? { cursor: 'crosshair' } : {}} // Custom cursor logic can be added to CSS
    >
      <style jsx global>{`
        .cursor-camera {
          cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>') 16 16, auto;
        }
      `}</style>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <span className="text-3xl">🏞️</span>
        <h2 className="text-xl font-light text-pink-600 mt-2" style={{ fontFamily: 'Georgia, serif' }}>
          La loma
        </h2>
        <div className="w-16 h-0.5 bg-pink-300 mx-auto mt-3" />
      </motion.div>

      <AnimatePresence mode="wait">
        {/* Phase 0: Dog Selection */}
        {phase === 0 && (
          <motion.div
            key="p0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <p className="text-gray-600 italic">¿A quién quieres llevar a pasear hoy?</p>

            <div className="grid grid-cols-2 gap-4">
              {DOGS.map(dog => (
                <motion.div
                  key={dog.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => toggleDog(dog.id)}
                  className={`p-2 rounded-2xl border-2 transition-all cursor-pointer bg-white ${selectedDogs.includes(dog.id)
                      ? 'border-pink-500 shadow-lg shadow-pink-100'
                      : 'border-transparent shadow-sm'
                    }`}
                >
                  <img src={dog.image} alt={dog.name} className="w-full h-32 object-cover rounded-xl mb-2" />
                  <p className="text-xs font-bold text-pink-600 uppercase tracking-tighter">{dog.name}</p>
                  <p className="text-[10px] text-gray-400 leading-tight italic px-1">{dog.subtitle}</p>
                </motion.div>
              ))}
            </div>

            <motion.button
              disabled={selectedDogs.length === 0}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setPhase(1)}
              className="w-full py-4 bg-pink-500 text-white rounded-full font-bold shadow-xl shadow-pink-100 transition-all disabled:opacity-50 disabled:grayscale"
            >
              Sacar a pasear
            </motion.button>
          </motion.div>
        )}

        {/* Phase 1: Missing Dogs */}
        {phase === 1 && (
          <motion.div
            key="p1"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="space-y-6"
          >
            <p className="text-gray-600 italic">"Creo que te faltaron algunos..."</p>
            <h3 className="text-pink-600 font-bold text-lg">¡Así que vamos a llevarlos también!</h3>

            <motion.div
              className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white"
              initial={{ rotate: -2 }}
              animate={{ rotate: 0 }}
            >
              <img src="/ilustracionperros.png" alt="Todos los perros" className="w-full h-auto" />
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setPhase(2)}
              className="w-full py-4 bg-pink-500 text-white rounded-full font-bold shadow-xl shadow-pink-100"
            >
              Le debes una salida a los perros oiste
            </motion.button>
          </motion.div>
        )}

        {/* Phase 2: Up Choice */}
        {phase === 2 && (
          <motion.div
            key="p2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-8"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img src="/ilustracionup.png" alt="Estilo Up" className="w-full h-auto" />
            </div>

            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => { setChoice('dar'); setPhase(3); }}
                className="flex-1 py-4 bg-green-500 text-white rounded-2xl font-bold shadow-lg shadow-green-100"
              >
                Dar la mano
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => { setChoice('caer'); setPhase(3); }}
                className="flex-1 py-4 bg-red-500 text-white rounded-2xl font-bold shadow-lg shadow-red-100"
              >
                Dejarla caer
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Phase 3: Choice Result */}
        {phase === 3 && (
          <motion.div
            key="p3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ scale: 0.8, rotate: choice === 'dar' ? -5 : 5 }}
              animate={{ scale: 1, rotate: 0 }}
              className="relative rounded-[40px] overflow-hidden shadow-2xl border-8 border-white"
            >
              <img
                src={choice === 'dar' ? '/ilustraciondar.png' : '/ilustracioncaer.png'}
                alt="Resultado"
                className="w-full h-auto"
              />
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => { setPhase(4); setIsCameraMode(true); }}
              className="w-16 h-16 bg-pink-500 text-white rounded-full flex items-center justify-center shadow-xl mx-auto text-3xl font-bold"
            >
              →
            </motion.button>
          </motion.div>
        )}

        {/* Phase 4: Mountain Camera */}
        {phase === 4 && (
          <motion.div
            key="p4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <p className="text-gray-500 text-xs italic animate-pulse">
              {focusSection ? 'Pulsa en la foto para volver' : 'Usa tu cámara para explorar la montaña...'}
            </p>

            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              {!focusSection ? (
                <div className="flex w-full h-full divide-x-2 divide-white/30">
                  <div
                    onClick={() => setFocusSection(1)}
                    className="w-1/2 h-full bg-cover bg-center cursor-camera hover:brightness-110 transition-all"
                    style={{ backgroundImage: 'url("/ilustraciongeneralmontaña.png")', backgroundPosition: 'left' }}
                  />
                  <div
                    onClick={() => setFocusSection(2)}
                    className="w-1/2 h-full bg-cover bg-center cursor-camera hover:brightness-110 transition-all"
                    style={{ backgroundImage: 'url("/ilustraciongeneralmontaña.png")', backgroundPosition: 'right' }}
                  />
                </div>
              ) : (
                <motion.div
                  layoutId="focus"
                  className="w-full h-full relative"
                  onClick={() => setFocusSection(null)}
                >
                  <img
                    src={focusSection === 1 ? '/imagengen1.png' : '/imagengen2.png'}
                    alt="Detalle"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-white/10 pointer-events-none border-[20px] border-white/20" />
                </motion.div>
              )}
            </div>

            {!focusSection && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                onClick={() => { setPhase(5); setIsCameraMode(false); }}
                className="w-full py-4 bg-gray-800 text-white rounded-full font-bold shadow-lg"
              >
                He terminado de explorar
              </motion.button>
            )}
          </motion.div>
        )}

        {/* Phase 5: Final Message */}
        {phase === 5 && (
          <motion.div
            key="p5"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-8 py-10"
          >
            <div className="space-y-6">
              <p className="text-xl text-pink-700 leading-relaxed font-light" style={{ fontFamily: 'Georgia, serif' }}>
                "No sé si es el lugar o la compañía…"
              </p>
              <p className="text-xl text-pink-700 leading-relaxed font-light" style={{ fontFamily: 'Georgia, serif' }}>
                "Al final no importa mucho el plan…"
              </p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="text-2xl text-pink-600 font-bold"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                "contigo siempre termina pasando algo."
              </motion.p>
            </div>

            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 3, type: 'spring' }}
              onClick={onComplete}
              className="w-20 h-20 bg-pink-500 text-white rounded-full flex items-center justify-center shadow-2xl mx-auto text-4xl font-bold"
            >
              ❤️
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
