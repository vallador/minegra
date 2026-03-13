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
  type: string
  hp: number
  attack: string
  color: string
  imagePos?: string
}

const DOGS: Dog[] = [
  {
    id: 'rony',
    name: 'Rony',
    image: '/rony.png',
    subtitle: 'El negro más temido',
    type: 'Sombra 🌑',
    hp: 100,
    attack: 'Ladrido Feroz',
    color: '#374151',
    imagePos: '25% center' // Ajustado para que no quede tan bajo
  },
  {
    id: 'princesa',
    name: 'Princesa',
    image: '/princesa.png',
    subtitle: 'Mi bebé conscentida',
    type: 'Hada 💖',
    hp: 85,
    attack: 'Mirada Tierna',
    color: '#ec4899'
  },
  {
    id: 'fresis',
    name: 'Fresis',
    image: '/FRESIS.png',
    subtitle: 'la que tiene una cama mas grande que la mía',
    type: 'Siesta 💤',
    hp: 120,
    attack: 'Súper Ronquido',
    color: '#6366f1'
  },
  {
    id: 'celes',
    name: 'Celes',
    image: '/CELES.png',
    subtitle: 'la mas salvaje, dijiste que eras tu',
    type: 'Salvaje 🌿',
    hp: 95,
    attack: 'Mordisquito',
    color: '#10b981'
  },
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

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [phase])

  return (
    <div
      ref={scrollRef}
      className={`p-6 text-center relative max-h-[80vh] overflow-y-auto custom-scrollbar ${isCameraMode ? 'cursor-camera' : ''}`}
      style={isCameraMode ? { cursor: 'crosshair' } : {}}
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
        {/* Phase 0: Pokemon Dog Selection */}
        {phase === 0 && (
          <motion.div
            key="p0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <p className="text-gray-600 italic">¿A quién llevamos?</p>

            <div className="grid grid-cols-2 gap-4">
              {DOGS.map(dog => (
                <motion.div
                  key={dog.id}
                  whileHover={{ scale: 1.05, rotate: 1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleDog(dog.id)}
                  className={`relative p-3 rounded-xl border-4 transition-all cursor-pointer bg-white overflow-hidden ${selectedDogs.includes(dog.id)
                    ? 'border-yellow-400 shadow-xl ring-4 ring-yellow-200'
                    : 'border-gray-100'
                    }`}
                  style={{ backgroundImage: `linear-gradient(to bottom, white, ${dog.color}10)` }}
                >
                  {/* Header de la carta */}
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-tighter">Básico</span>
                    <span className="text-[10px] font-bold text-red-600">HP {dog.hp}</span>
                  </div>

                  {/* Imagen con ajuste para Rony */}
                  <div className="relative w-full h-28 rounded-md overflow-hidden bg-gray-50 border-2 border-yellow-500/30">
                    <img
                      src={dog.image}
                      alt={dog.name}
                      className="w-full h-full object-cover"
                      style={{ objectPosition: dog.imagePos || 'center' }}
                    />
                  </div>

                  {/* Info de la carta */}
                  <div className="mt-2 text-left">
                    <div className="flex justify-between items-center">
                      <p className="text-xs font-black text-gray-800 uppercase tracking-tight">{dog.name}</p>
                      <span className="text-[9px] bg-gray-100 px-1 rounded border border-gray-200">{dog.type}</span>
                    </div>
                    <p className="text-[8px] text-gray-400 italic mb-2 line-clamp-1">"{dog.subtitle}"</p>

                    {/* Stats de Pokemon */}
                    <div className="space-y-1 pt-1 border-t border-gray-100">
                      <div className="flex items-center gap-1">
                        <span className="text-[8px] font-bold text-pink-500">✷︎</span>
                        <p className="text-[9px] font-bold text-gray-700">{dog.attack}</p>
                        <p className="text-[9px] ml-auto font-bold text-gray-500">20+</p>
                      </div>
                    </div>
                  </div>

                  {selectedDogs.includes(dog.id) && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-1 right-1 bg-yellow-400 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px]"
                    >
                      ✓
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>

            <motion.button
              disabled={selectedDogs.length === 0}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setPhase(1)}
              className="w-full py-4 bg-yellow-400 text-gray-900 rounded-xl font-black shadow-xl shadow-yellow-100 transition-all border-b-4 border-yellow-600 uppercase tracking-widest disabled:opacity-50"
            >
              ¡Sacar a pasear!
            </motion.button>
          </motion.div>
        )}

        {/* Phase 1: Dramatic Text Reveal */}
        {phase === 1 && (
          <motion.div
            key="p1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center min-h-[400px] space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="space-y-4"
            >
              <p className="text-2xl text-gray-400 italic font-light">"Creo que te faltaron unos..."</p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1.5 }}
                className="text-3xl text-pink-600 font-bold"
              >
                "...así que vamos a llevarlos también"
              </motion.p>
            </motion.div>

            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 3.5, type: 'spring' }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setPhase(2)}
              className="w-16 h-16 bg-pink-500 text-white rounded-full flex items-center justify-center shadow-xl text-3xl font-bold"
            >
              →
            </motion.button>
          </motion.div>
        )}

        {/* Phase 2: Missing Dogs Illustration */}
        {phase === 2 && (
          <motion.div
            key="p2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="space-y-6"
          >
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
              onClick={() => setPhase(3)}
              className="w-full py-4 bg-pink-500 text-white rounded-full font-bold shadow-xl shadow-pink-100"
            >
              Le debes una salida a los perros oiste
            </motion.button>
          </motion.div>
        )}

        {/* Phase 3: Up Choice */}
        {phase === 3 && (
          <motion.div
            key="p3"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-8"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img src="/ilustracionup.png" alt="Estilo Up" className="w-full h-auto" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-pink-100 shadow-sm"
            >
              <p className="text-gray-700 leading-relaxed font-medium text-sm italic" style={{ fontFamily: 'Georgia, serif' }}>
                "El día en que tu asma me cayó bien fue cuando fue la excusa perfecta para llevarte de la mano por toda la montaña"
              </p>
            </motion.div>

            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => { setChoice('dar'); setPhase(4); }}
                className="flex-1 py-4 bg-green-500 text-white rounded-2xl font-bold shadow-lg shadow-green-100"
              >
                Dar la mano
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => { setChoice('caer'); setPhase(4); }}
                className="flex-1 py-4 bg-red-500 text-white rounded-2xl font-bold shadow-lg shadow-red-100"
              >
                Dejarla caer
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Phase 4: Choice Result */}
        {phase === 4 && (
          <motion.div
            key="p4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', damping: 12 }}
              className="bg-white p-8 rounded-[40px] shadow-2xl border-4 border-pink-100 flex items-center justify-center min-h-[250px]"
            >
              <p className="text-xl text-pink-700 leading-relaxed font-medium italic" style={{ fontFamily: 'Georgia, serif' }}>
                {choice === 'dar'
                  ? "Yo sabía que ibas a aceptar, solo excusas tuyas para sudar en mi mano"
                  : "¿Cómo se te ocurre? Yo solo te dejo caer en mis encantos"
                }
              </p>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => { setPhase(5); setIsCameraMode(true); }}
              className="w-16 h-16 bg-pink-500 text-white rounded-full flex items-center justify-center shadow-xl mx-auto text-3xl font-bold"
            >
              →
            </motion.button>
          </motion.div>
        )}

        {/* Phase 5: Mountain Camera */}
        {phase === 5 && (
          <motion.div
            key="p5"
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
                    style={{ backgroundImage: 'url("/ilustraciongeneralmontana.png")', backgroundPosition: 'left' }}
                  />
                  <div
                    onClick={() => setFocusSection(2)}
                    className="w-1/2 h-full bg-cover bg-center cursor-camera hover:brightness-110 transition-all"
                    style={{ backgroundImage: 'url("/ilustraciongeneralmontana.png")', backgroundPosition: 'right' }}
                  />
                </div>
              ) : (
                <motion.div
                  layoutId="focus"
                  className="w-full h-full relative"
                  onClick={() => setFocusSection(null)}
                >
                  <img
                    src={focusSection === 1 ? '/imagengen1.jpg' : '/imagengen2.jpg'}
                    alt="Detalle"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 pointer-events-none" />
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute bottom-4 left-4 right-4 bg-white/80 backdrop-blur-sm p-3 rounded-lg border border-white/50"
                  >
                    <p className="text-[10px] text-gray-800 italic font-medium leading-tight">
                      {focusSection === 1
                        ? "Siempre me ha gustado cómo miras el mundo cuando tomas fotos."
                        : "Entre luchitas y carreras por el bosque… nunca había forma de ganar limpio contigo, quiás un beso faltaba"
                      }
                    </p>
                  </motion.div>
                  <div className="absolute inset-0 border-[20px] border-white/20 pointer-events-none" />
                </motion.div>
              )}
            </div>

            {!focusSection && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                onClick={() => { setPhase(6); setIsCameraMode(false); }}
                className="w-full py-4 bg-gray-800 text-white rounded-full font-bold shadow-lg"
              >
                He terminado de explorar
              </motion.button>
            )}
          </motion.div>
        )}

        {/* Phase 6: Final Message */}
        {phase === 6 && (
          <motion.div
            key="p6"
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
              onClick={() => setPhase(7)}
              className="w-20 h-20 bg-pink-500 text-white rounded-full flex items-center justify-center shadow-2xl mx-auto text-4xl font-bold"
            >
              ❤️
            </motion.button>
          </motion.div>
        )}

        {/* Phase 7: Flores Final */}
        {phase === 7 && (
          <motion.div
            key="p7"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ scale: 0.9, rotate: -2 }}
              animate={{ scale: 1, rotate: 0 }}
              className="relative rounded-[40px] overflow-hidden shadow-2xl border-8 border-white"
            >
              <img src="/imagenflores.jpg" alt="Flores" className="w-full h-auto" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl border border-pink-100 shadow-sm"
            >
              <p className="text-gray-700 leading-relaxed font-medium text-sm italic" style={{ fontFamily: 'Georgia, serif' }}>
                "Lo que más me gustó de esa salida fue colocarte flores en tu cabello, y tú me las colocaras en mi calva... perdí el gloss y el chaleco a propósito."
              </p>
            </motion.div>

            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 2, type: 'spring' }}
              onClick={onComplete}
              className="w-20 h-20 bg-pink-500 text-white rounded-full flex items-center justify-center shadow-2xl mx-auto text-4xl font-bold"
            >
              🌻
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
