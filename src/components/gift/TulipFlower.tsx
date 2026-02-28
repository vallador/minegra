'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useGiftStore, FlowerStatus } from '@/store/useGiftStore'

interface TulipFlowerProps {
  id: number
  status: FlowerStatus
  index: number
  onClick: () => void
}

export function TulipFlower({ id, status, index, onClick }: TulipFlowerProps) {
  const isClosed = status === 'closed'
  const isOpen = status === 'open'
  const isBloomed = status === 'bloomed'

  // Posiciones de los tulipanes en el ramo (dispersos naturalmente)
  const positions = [
    { x: -35, y: -20, rotate: -15 },
    { x: -15, y: -35, rotate: 5 },
    { x: 10, y: -25, rotate: 12 },
    { x: 30, y: -15, rotate: 20 },
    { x: -25, y: 15, rotate: -8 },
    { x: 5, y: 25, rotate: -3 },
    { x: 28, y: 20, rotate: 15 },
  ]

  const pos = positions[index] || { x: 0, y: 0, rotate: 0 }

  return (
    <motion.div
      className="absolute cursor-pointer"
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
        delay: index * 0.15,
        duration: 0.6,
        type: 'spring',
        stiffness: 100
      }}
      whileHover={isClosed ? { scale: 1.15, y: -5 } : {}}
      whileTap={isClosed ? { scale: 0.95 } : {}}
      onClick={isClosed ? onClick : undefined}
    >
      {/* Tallo */}
      <motion.div
        className="absolute"
        style={{
          width: '4px',
          height: '80px',
          background: 'linear-gradient(to bottom, #2d5a27, #1a3d15)',
          borderRadius: '2px',
          left: '50%',
          top: '50%',
          transform: 'translateX(-50%)',
          boxShadow: '1px 2px 4px rgba(0,0,0,0.2)',
        }}
        animate={isClosed ? {
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
            width: '20px',
            height: '35px',
            background: 'linear-gradient(135deg, #3d7a35, #2d5a27)',
            borderRadius: '0 50% 50% 50%',
            left: '2px',
            top: '20px',
            transform: 'rotate(-30deg)',
            boxShadow: '1px 1px 3px rgba(0,0,0,0.15)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: '18px',
            height: '30px',
            background: 'linear-gradient(135deg, #4a8a42, #3d7a35)',
            borderRadius: '50% 0 50% 50%',
            right: '2px',
            top: '35px',
            transform: 'rotate(25deg)',
            boxShadow: '-1px 1px 3px rgba(0,0,0,0.15)',
          }}
        />
      </motion.div>

      {/* Flor del tulipán */}
      <motion.div
        className="relative z-10"
        style={{
          width: '45px',
          height: '55px',
          top: '-15px',
        }}
        animate={isClosed ? {
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
          color={isBloomed ? '#ff69b4' : '#ffb6c1'} 
          darkerColor={isBloomed ? '#ff1493' : '#ff91a4'}
          style={{
            left: '50%',
            top: '0%',
            transform: 'translateX(-50%) rotate(0deg)',
            width: '32px',
            height: '48px',
          }}
          isBloomed={isBloomed}
        />
        
        {/* Pétalo izquierdo */}
        <TulipPetal 
          color={isBloomed ? '#ff85c1' : '#ffc8d6'} 
          darkerColor={isBloomed ? '#ff69b4' : '#ffb6c1'}
          style={{
            left: '5px',
            top: '5px',
            transform: 'rotate(-15deg)',
            width: '26px',
            height: '42px',
          }}
          isBloomed={isBloomed}
        />
        
        {/* Pétalo derecho */}
        <TulipPetal 
          color={isBloomed ? '#ff85c1' : '#ffc8d6'} 
          darkerColor={isBloomed ? '#ff69b4' : '#ffb6c1'}
          style={{
            right: '5px',
            top: '5px',
            transform: 'rotate(15deg)',
            width: '26px',
            height: '42px',
          }}
          isBloomed={isBloomed}
        />

        {/* Brillo interior */}
        <div
          style={{
            position: 'absolute',
            width: '15px',
            height: '25px',
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)',
            borderRadius: '50%',
            left: '50%',
            top: '8px',
            transform: 'translateX(-50%)',
          }}
        />

        {/* Centro de la flor */}
        <div
          style={{
            position: 'absolute',
            width: '8px',
            height: '12px',
            background: 'linear-gradient(to bottom, #8b4513, #654321)',
            borderRadius: '50%',
            left: '50%',
            bottom: '8px',
            transform: 'translateX(-50%)',
          }}
        />

        {/* Badge para florecida */}
        <AnimatePresence>
          {isBloomed && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute -bottom-2 left-1/2 -translate-x-1/2"
            >
              <span className="text-xs">✨</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Indicador de "toca aquí" cuando está cerrada */}
      <AnimatePresence>
        {isClosed && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap"
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
    </motion.div>
  )
}

interface TulipPetalProps {
  color: string
  darkerColor: string
  style: React.CSSProperties
  isBloomed: boolean
}

function TulipPetal({ color, darkerColor, style, isBloomed }: TulipPetalProps) {
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
        boxShadow: `
          inset 0 5px 15px rgba(255,255,255,0.3),
          inset 0 -5px 10px rgba(0,0,0,0.1),
          2px 4px 8px rgba(0,0,0,0.15)
        `,
      }}
      animate={isBloomed ? {
        boxShadow: [
          `inset 0 5px 15px rgba(255,255,255,0.3), inset 0 -5px 10px rgba(0,0,0,0.1), 2px 4px 8px rgba(0,0,0,0.15)`,
          `inset 0 5px 20px rgba(255,255,255,0.5), inset 0 -5px 10px rgba(0,0,0,0.1), 2px 4px 12px rgba(255,105,180,0.3)`,
          `inset 0 5px 15px rgba(255,255,255,0.3), inset 0 -5px 10px rgba(0,0,0,0.1), 2px 4px 8px rgba(0,0,0,0.15)`,
        ]
      } : {}}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  )
}
