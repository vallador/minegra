import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGiftStore } from '@/store/useGiftStore'
import { TulipFlower } from './TulipFlower'
import { FlowerInicio } from './flowers/FlowerInicio'
import { FlowerLoma } from './flowers/FlowerLoma'
import { FlowerLluvia } from './flowers/FlowerLluvia'
import { FlowerJuegos } from './flowers/FlowerJuegos'
import { FlowerBasket } from './flowers/FlowerBasket'
import { FlowerHogar } from './flowers/FlowerHogar'
import { FlowerTu } from './flowers/FlowerTu'
import { FlowerIncomplete } from './flowers/FlowerIncomplete'
import { Trivia } from './Trivia'
import { FinalLetter } from './FinalLetter'
import { BlackScreen } from './BlackScreen'
import { LogOut, RotateCcw } from 'lucide-react'

export function TulipBouquet() {
  const { flowers, currentFlower, openFlower, showTrivia, showLetter, showBlackScreen } = useGiftStore()

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-[#fffdfa]">
      {/* Fondo elaborado Blanco/Crema */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background: `
              radial-gradient(circle at 20% 20%, #fffaf0 0%, transparent 40%),
              radial-gradient(circle at 80% 80%, #fff5e6 0%, transparent 40%),
              linear-gradient(135deg, #ffffff 0%, #fff9f0 100%)
            `
          }}
        />
        {/* Patrón decorativo sutil */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <pattern id="leaf-pattern" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M50 20 Q60 40 50 60 Q40 40 50 20" fill="currentColor" className="text-pink-300" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#leaf-pattern)" />
        </svg>
      </div>

      {/* Partículas flotantes */}
      <FloatingParticles />

      {/* Contenido principal */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">

        {/* Título más ligero y elegante */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-12"
        >
          <h1
            className="text-3xl md:text-4xl font-light text-pink-500/80 tracking-[0.2em] uppercase mb-3"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Nuestro Ramo
          </h1>
          <div className="h-[1px] w-24 bg-pink-100 mx-auto" />
        </motion.div>

        {/* Ramo de tulipanes MÁS GRANDE */}
        <motion.div
          className="relative w-80 h-[450px] md:w-[400px] md:h-[500px]"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, type: 'spring' }}
        >
          {/* Hojitas verdes extra para el fondo del ramo */}
          <ExtraLeaves />

          {/* Moño decorativo */}
          <motion.div
            className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, duration: 0.5, type: 'spring' }}
          >
            <Ribbon />
          </motion.div>

          {/* Tulipanes */}
          {flowers.map((flower, index) => (
            <TulipFlower
              key={flower.id}
              id={flower.id}
              status={flower.status}
              index={index}
              canOpen={useGiftStore.getState().canOpenFlower(flower.id)}
              onClick={() => openFlower(flower.id)}
            />
          ))}
        </motion.div>

        {/* Indicador de progreso */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="mt-12 text-center"
        >
          <p className="text-pink-300 text-[10px] tracking-widest uppercase">
            {flowers.filter(f => f.status === 'bloomed' || f.status === 'withered' || f.status === 'incomplete').length} / 8 completados
          </p>
        </motion.div>
      </div>

      {/* Modal de flor abierta - SIN botón de cerrar */}
      <AnimatePresence>
        {currentFlower && (
          <FlowerModal flowerId={currentFlower} />
        )}
      </AnimatePresence>

      {/* Trivia */}
      <AnimatePresence>
        {showTrivia && !showLetter && <Trivia />}
      </AnimatePresence>

      {/* Carta final */}
      <AnimatePresence>
        {showLetter && !showBlackScreen && <FinalLetter />}
      </AnimatePresence>

      {/* Admin Panel */}
      <AdminPanel />

      {/* Pantalla negra final */}
      <AnimatePresence>
        {showBlackScreen && <BlackScreen />}
      </AnimatePresence>
    </div>
  )
}

function FlowerModal({ flowerId }: { flowerId: number }) {
  const { bloomFlower, flowers } = useGiftStore()
  const flower = flowers.find(f => f.id === flowerId)

  if (!flower) return null

  const handleComplete = () => {
    bloomFlower(flowerId)
  }

  const flowerComponents: Record<number, React.ReactNode> = {
    1: <FlowerInicio onComplete={handleComplete} />,
    2: <FlowerLoma onComplete={handleComplete} />,
    3: <FlowerLluvia onComplete={handleComplete} />,
    4: <FlowerJuegos onComplete={handleComplete} />,
    5: <FlowerBasket onComplete={handleComplete} />,
    6: <FlowerHogar onComplete={handleComplete} />,
    7: <FlowerTu onComplete={handleComplete} />,
    8: <FlowerIncomplete />,
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.9)' }}
    >
      {/* SIN onClick para cerrar - solo puede avanzar con el botón interno */}
      <motion.div
        initial={{ scale: 0.8, y: 50, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.8, y: 50, opacity: 0 }}
        transition={{ type: 'spring', damping: 25 }}
        className="w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl"
        style={{
          background: 'linear-gradient(to bottom, #fff5f5, #ffe5ec)',
        }}
      >
        {flowerComponents[flowerId]}
      </motion.div>
    </motion.div>
  )
}

function Ribbon() {
  return (
    <svg width="80" height="50" viewBox="0 0 80 50" className="drop-shadow-lg">
      {/* Lazos del moño */}
      <ellipse cx="20" cy="20" rx="18" ry="12" fill="#ff91a4" />
      <ellipse cx="60" cy="20" rx="18" ry="12" fill="#ff91a4" />

      {/* Centro del moño */}
      <circle cx="40" cy="20" r="10" fill="#ff69b4" />

      {/* Cintas que cuelgan */}
      <path d="M35 28 Q32 45 30 50 L38 40 Q40 35 40 30 Z" fill="#ffb6c1" />
      <path d="M45 28 Q48 45 50 50 L42 40 Q40 35 40 30 Z" fill="#ffb6c1" />

      {/* Brillos */}
      <ellipse cx="15" cy="16" rx="4" ry="3" fill="rgba(255,255,255,0.4)" />
      <ellipse cx="55" cy="16" rx="4" ry="3" fill="rgba(255,255,255,0.4)" />
    </svg>
  )
}

function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            background: i % 2 === 0 ? 'rgba(255,182,193,0.4)' : 'rgba(255,105,180,0.3)',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 5 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  )
}

function AdminPanel() {
  const { isAdmin, logout, resetProgress } = useGiftStore()

  if (!isAdmin) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-4 right-4 z-[60] flex flex-col gap-2"
    >
      <button
        onClick={resetProgress}
        className="p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg text-pink-500 hover:bg-pink-50 transition-colors flex items-center justify-center border border-pink-100"
        title="Reiniciar Progreso"
      >
        <RotateCcw size={20} />
      </button>
      <button
        onClick={logout}
        className="p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg text-pink-500 hover:bg-pink-50 transition-colors flex items-center justify-center border border-pink-100"
        title="Cerrar Sesión"
      >
        <LogOut size={20} />
      </button>
    </motion.div>
  )
}

function ExtraLeaves() {
  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            width: '28px',
            height: '50px',
            background: i % 2 === 0
              ? 'linear-gradient(to bottom, #4a8a42, #1a3d15)'
              : 'linear-gradient(to bottom, #5d9b54, #2d5a27)',
            borderRadius: i % 2 === 0 ? '0 50% 0 50%' : '50% 0 50% 0',
            left: `${10 + Math.random() * 80}%`,
            top: `${15 + Math.random() * 70}%`,
            opacity: 0.35,
            rotate: Math.random() * 360,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.35 }}
          transition={{
            delay: 0.5 + i * 0.1,
            duration: 1.5,
            type: 'spring'
          }}
        />
      ))}
    </div>
  )
}
