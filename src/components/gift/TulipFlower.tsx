'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGiftStore, FlowerStatus } from '@/store/useGiftStore'

interface TulipFlowerProps {
  id: number
  status: FlowerStatus
  index: number
  canOpen: boolean
  onClick: () => void
}

export function TulipFlower({ id, status, index, canOpen, onClick }: TulipFlowerProps) {
  const isClosed = status === 'closed'
  const isOpen = status === 'open'
  const isBloomed = status === 'bloomed'
  const isWithered = status === 'withered'
  const isIncomplete = status === 'incomplete'

  // Posiciones MÁS AMPLIAS para los 8 tulipanes en el ramo (ajustado a bouquet más grande)
  const positions = [
    { x: -55, y: -45, rotate: -22 },
    { x: -25, y: -70, rotate: -5 },
    { x: 15, y: -60, rotate: 12 },
    { x: 50, y: -40, rotate: 25 },
    { x: -45, y: 15, rotate: -12 },
    { x: 0, y: 35, rotate: 0 },
    { x: 45, y: 20, rotate: 15 },
    { x: 15, y: 75, rotate: 10 }, // La flor especial
  ]

  const pos = positions[index] || { x: 0, y: 0, rotate: 0 }

  // Colores según estado y disponibilidad
  const getColors = () => {
    // Si está marchita, usar tonos tierra/apagados
    if (isWithered) {
      return { primary: '#d4a5a5', secondary: '#c49090', petal: '#b89999', text: '#8b7355' }
    }
    // Si está bloqueada, usar Blanco Perla / Crema
    if (!canOpen && isClosed) {
      return {
        primary: '#ffffff',
        secondary: '#f9f9f9',
        petal: '#fffefc',
        text: '#c9c4b9'
      }
    }
    // Si está disponible o ya en interacción, usar Rosado
    if (isIncomplete) {
      return { primary: '#e8c8c8', secondary: '#d4a5a5', petal: '#c4b0b0', text: '#ff69b4' }
    }
    if (isBloomed || isOpen || (canOpen && isClosed)) {
      return { primary: '#ffb6c1', secondary: '#ff91a4', petal: '#ffc8d6', text: '#ff1493' }
    }

    return { primary: '#ffb6c1', secondary: '#ff91a4', petal: '#ffc8d6', text: '#ff1493' }
  }

  const colors = getColors()

  return (
    <motion.div
      className="absolute"
      style={{
        left: `calc(50% + ${pos.x}px)`,
        top: `calc(45% + ${pos.y}px)`, // Un poco más arriba del centro vertical para balancear
        transform: `translate(-50%, -50%)`,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: 1,
        opacity: 1,
        rotate: pos.rotate
      }}
      transition={{
        delay: index * 0.1,
        duration: 0.8,
        type: 'spring',
        stiffness: 80
      }}
      whileHover={isClosed && canOpen ? { scale: 1.1, y: -10 } : {}}
      whileTap={isClosed && canOpen ? { scale: 0.95 } : {}}
      onClick={isClosed && canOpen ? onClick : undefined}
    >
      {/* Tallo */}
      <motion.div
        className="absolute"
        style={{
          width: '3.5px',
          height: '110px',
          background: isWithered
            ? 'linear-gradient(to bottom, #8b7355, #6b5344)'
            : 'linear-gradient(to bottom, #3d7a35, #1a3d15)',
          borderRadius: '2px',
          left: '50%',
          top: '50%',
          transform: 'translateX(-50%)',
          boxShadow: '1px 2px 4px rgba(0,0,0,0.15)',
          opacity: (isWithered || (!canOpen && isClosed)) ? 0.6 : 1,
        }}
        animate={isClosed && canOpen ? {
          rotate: [0, 1.5, -1.5, 0],
        } : {}}
        transition={{
          duration: 4 + index * 0.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {/* Hojas del tallo */}
        <div
          style={{
            position: 'absolute',
            width: '20px',
            height: '35px',
            background: isWithered || (!canOpen && isClosed)
              ? 'linear-gradient(135deg, #8b7355, #6b5344)'
              : 'linear-gradient(135deg, #3d7a35, #2d5a27)',
            borderRadius: '0 50% 50% 50%',
            left: '2px',
            top: '25px',
            transform: 'rotate(-40deg)',
            opacity: 0.6,
          }}
        />
      </motion.div>

      {/* Flor del tulipán */}
      <motion.div
        className="relative z-10"
        style={{
          width: '46px',
          height: '58px',
          top: '-15px',
          filter: !canOpen && isClosed ? 'drop-shadow(0 4px 12px rgba(0,0,0,0.03))' : 'drop-shadow(0 4px 15px rgba(255,182,193,0.3))',
        }}
      >
        {/* Pétalos exteriores */}
        <TulipPetal
          color={colors.primary}
          darkerColor={colors.secondary}
          style={{
            left: '50%',
            top: '0%',
            transform: 'translateX(-50%) rotate(0deg)',
            width: '32px',
            height: '48px',
          }}
          isWithered={isWithered}
        />

        {/* Pétalo izquierdo */}
        <TulipPetal
          color={colors.petal}
          darkerColor={colors.primary}
          style={{
            left: '4px',
            top: '5px',
            transform: 'rotate(-15deg)',
            width: '26px',
            height: '42px',
          }}
          isWithered={isWithered}
        />

        {/* Pétalo derecho */}
        <TulipPetal
          color={colors.petal}
          darkerColor={colors.primary}
          style={{
            right: '4px',
            top: '5px',
            transform: 'rotate(15deg)',
            width: '26px',
            height: '42px',
          }}
          isWithered={isWithered}
        />

        {/* Centro del tulipán - Orden (Número) */}
        {!isBloomed && !isOpen && !isWithered && (
          <div
            className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
          >
            <span
              className="text-[10px] font-bold tracking-tighter"
              style={{ color: colors.text, opacity: 0.8 }}
            >
              {id === 8 ? '?' : id}
            </span>
          </div>
        )}

        {/* Badge para incompleta/bloomed */}
        <AnimatePresence>
          {(isBloomed || isWithered) && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute -top-3 -right-1 bg-white/90 rounded-full w-5 h-5 flex items-center justify-center shadow-sm"
            >
              <span className="text-[10px] text-pink-400">❤</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Indicador de "toca aquí" o "timer" */}
      <div className="absolute top-[60px] left-1/2 -translate-x-1/2 whitespace-nowrap text-center">
        <AnimatePresence mode="wait">
          {isClosed && canOpen ? (
            <motion.div
              key="toca"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-0.5"
            >
              <span
                className="text-[10px] text-white font-bold uppercase tracking-[0.15em]"
                style={{
                  textShadow: '1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 0 2px 4px rgba(0,0,0,0.5)'
                }}
              >
                Abrir
              </span>
              <motion.div
                className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          ) : isClosed && !canOpen ? (
            <motion.div
              key="timer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white/40 backdrop-blur-[2px] px-2 py-0.5 rounded-full border border-white/50"
            >
              <div className="flex items-center gap-1">
                <span className="text-[9px] text-gray-400">🔒</span>
                <span className="text-[9px] text-gray-500 font-medium tracking-tight">
                  <Countdown id={id} />
                </span>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

function Countdown({ id }: { id: number }) {
  const getTimeUntilUnlock = useGiftStore(state => state.getTimeUntilUnlock)
  const [timeLeft, setTimeLeft] = React.useState(getTimeUntilUnlock(id))

  React.useEffect(() => {
    if (timeLeft <= 0) return

    const timer = setInterval(() => {
      const remaining = getTimeUntilUnlock(id)
      setTimeLeft(remaining)
      if (remaining <= 0) {
        clearInterval(timer)
        // Forzar re-render de la flor si es necesario (el store canOpen ya cambiará)
        window.location.reload() // O simplemente dejar que el estado global maneje el cambio
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [id, getTimeUntilUnlock, timeLeft])

  if (timeLeft <= 0) return null

  const hours = Math.floor(timeLeft / (1000 * 60 * 60))
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000)

  return (
    <span>
      {hours > 0 && `${hours}h `}
      {minutes > 0 ? `${minutes}m` : hours > 0 ? '0m' : `${seconds}s`}
    </span>
  )
}

interface TulipPetalProps {
  color: string
  darkerColor: string
  style: React.CSSProperties
  isWithered: boolean
}

export function TulipPetal({ color, darkerColor, style, isWithered }: TulipPetalProps) {
  return (
    <motion.div
      style={{
        position: 'absolute',
        width: style.width,
        height: style.height,
        background: `linear-gradient(to bottom, ${color}, ${darkerColor})`,
        borderRadius: '50% 50% 45% 45%',
        left: style.left,
        top: style.top,
        right: (style as any).right,
        transform: style.transform,
        boxShadow: isWithered
          ? 'inset 0 2px 8px rgba(0,0,0,0.2)'
          : `inset 0 5px 15px rgba(255,255,255,0.3), inset 0 -5px 10px rgba(0,0,0,0.1), 2px 4px 8px rgba(0,0,0,0.15)`,
        opacity: isWithered ? 0.6 : 1,
      }}
    />
  )
}
