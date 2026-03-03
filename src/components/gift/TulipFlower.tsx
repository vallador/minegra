'use client'

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

  // Posiciones de los 8 tulipanes en el ramo (dispersos naturalmente)
  const positions = [
    { x: -40, y: -25, rotate: -18 },
    { x: -18, y: -38, rotate: 5 },
    { x: 8, y: -30, rotate: 15 },
    { x: 32, y: -18, rotate: 22 },
    { x: -32, y: 8, rotate: -10 },
    { x: 0, y: 20, rotate: -2 },
    { x: 30, y: 12, rotate: 12 },
    { x: 12, y: 35, rotate: 8 }, // La flor especial
  ]

  const pos = positions[index] || { x: 0, y: 0, rotate: 0 }

  // Colores según estado
  const getColors = () => {
    if (isWithered) {
      return { primary: '#d4a5a5', secondary: '#c49090', petal: '#b89999' }
    }
    if (isIncomplete) {
      return { primary: '#e8c8c8', secondary: '#d4a5a5', petal: '#c4b0b0' }
    }
    if (isBloomed) {
      return { primary: '#ff69b4', secondary: '#ff1493', petal: '#ff85c1' }
    }
    return { primary: '#ffb6c1', secondary: '#ff91a4', petal: '#ffc8d6' }
  }

  const colors = getColors()

  return (
    <motion.div
      className="absolute"
      style={{
        left: `calc(50% + ${pos.x}px)`,
        top: `calc(50% + ${pos.y}px)`,
        transform: `translate(-50%, -50%)`,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: 1, 
        opacity: 1,
        rotate: pos.rotate
      }}
      transition={{ 
        delay: index * 0.12,
        duration: 0.6,
        type: 'spring',
        stiffness: 100
      }}
      whileHover={isClosed && canOpen ? { scale: 1.15, y: -5 } : {}}
      whileTap={isClosed && canOpen ? { scale: 0.95 } : {}}
      onClick={isClosed && canOpen ? onClick : undefined}
    >
      {/* Tallo */}
      <motion.div
        className="absolute"
        style={{
          width: '4px',
          height: '75px',
          background: isWithered 
            ? 'linear-gradient(to bottom, #8b7355, #6b5344)' 
            : 'linear-gradient(to bottom, #2d5a27, #1a3d15)',
          borderRadius: '2px',
          left: '50%',
          top: '50%',
          transform: 'translateX(-50%)',
          boxShadow: '1px 2px 4px rgba(0,0,0,0.2)',
          opacity: isWithered ? 0.6 : 1,
        }}
        animate={isClosed && canOpen ? {
          rotate: [0, 2, -2, 0],
        } : {}}
        transition={{
          duration: 3 + index * 0.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {/* Hojas del tallo */}
        <div
          style={{
            position: 'absolute',
            width: '18px',
            height: '30px',
            background: isWithered 
              ? 'linear-gradient(135deg, #8b7355, #6b5344)' 
              : 'linear-gradient(135deg, #3d7a35, #2d5a27)',
            borderRadius: '0 50% 50% 50%',
            left: '2px',
            top: '18px',
            transform: 'rotate(-30deg)',
            opacity: isWithered ? 0.5 : 1,
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: '16px',
            height: '26px',
            background: isWithered 
              ? 'linear-gradient(135deg, #8b7355, #6b5344)' 
              : 'linear-gradient(135deg, #4a8a42, #3d7a35)',
            borderRadius: '50% 0 50% 50%',
            right: '2px',
            top: '30px',
            transform: 'rotate(25deg)',
            opacity: isWithered ? 0.5 : 1,
          }}
        />
      </motion.div>

      {/* Flor del tulipán */}
      <motion.div
        className="relative z-10"
        style={{
          width: '42px',
          height: '52px',
          top: '-12px',
          opacity: isWithered ? 0.5 : 1,
        }}
        animate={isClosed && canOpen ? {
          y: [0, -2, 0, 2, 0],
        } : {}}
        transition={{
          duration: 4 + index * 0.3,
          repeat: Infinity,
          ease: 'easeInOut',
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
            width: '30px',
            height: '45px',
          }}
          isWithered={isWithered}
        />
        
        {/* Pétalo izquierdo */}
        <TulipPetal 
          color={colors.petal} 
          darkerColor={colors.primary}
          style={{
            left: '4px',
            top: '4px',
            transform: 'rotate(-12deg)',
            width: '24px',
            height: '38px',
          }}
          isWithered={isWithered}
        />
        
        {/* Pétalo derecho */}
        <TulipPetal 
          color={colors.petal} 
          darkerColor={colors.primary}
          style={{
            right: '4px',
            top: '4px',
            transform: 'rotate(12deg)',
            width: '24px',
            height: '38px',
          }}
          isWithered={isWithered}
        />

        {/* Centro de la flor */}
        <div
          style={{
            position: 'absolute',
            width: '6px',
            height: '10px',
            background: isWithered ? '#5a4a3a' : '#8b4513',
            borderRadius: '50%',
            left: '50%',
            bottom: '6px',
            transform: 'translateX(-50%)',
          }}
        />

        {/* Badge para incompleta */}
        <AnimatePresence>
          {isIncomplete && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute -bottom-3 left-1/2 -translate-x-1/2"
            >
              <span className="text-xs opacity-60">...</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Badge para marchita */}
        <AnimatePresence>
          {isWithered && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute -bottom-3 left-1/2 -translate-x-1/2"
            >
              <span className="text-xs opacity-40">✓</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Indicador de "toca aquí" cuando está cerrada y disponible */}
      <AnimatePresence>
        {isClosed && canOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap"
          >
            <motion.span
              className="text-xs text-pink-400 font-medium"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              toca
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Indicador de bloqueado cuando está cerrada pero no disponible */}
      <AnimatePresence>
        {isClosed && !canOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap"
          >
            <span className="text-xs text-gray-300">🔒</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

interface TulipPetalProps {
  color: string
  darkerColor: string
  style: React.CSSProperties
  isWithered: boolean
}

function TulipPetal({ color, darkerColor, style, isWithered }: TulipPetalProps) {
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
