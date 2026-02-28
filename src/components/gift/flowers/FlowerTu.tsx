'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface FlowerTuProps {
  onComplete: () => void
}

export function FlowerTu({ onComplete }: FlowerTuProps) {
  const [selectedItems, setSelectedItems] = useState<number[]>([])

  const items = [
    { id: 1, emoji: '👨‍👩‍👧', text: 'Familia en USA' },
    { id: 2, emoji: '👧', text: 'Hermana' },
    { id: 3, emoji: '💜', text: 'Kate' },
    { id: 4, emoji: '🏀', text: 'Basket' },
    { id: 5, emoji: '🐱', text: 'Gatos' },
    { id: 6, emoji: '🐾', text: 'Animales' },
    { id: 7, emoji: '🏠', text: 'Casa' },
    { id: 8, emoji: '🍜', text: 'Comida' },
    { id: 9, emoji: '📺', text: 'Tele' },
  ]

  const toggleItem = (id: number) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(i => i !== id))
    } else {
      setSelectedItems([...selectedItems, id])
    }
  }

  const allSelected = selectedItems.length >= 6

  return (
    <div className="p-6 text-center">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4"
      >
        <span className="text-3xl">✨</span>
        <h2 className="text-xl font-light text-pink-600 mt-2" style={{ fontFamily: 'Georgia, serif' }}>
          Su vida
        </h2>
        <div className="w-16 h-0.5 bg-pink-300 mx-auto mt-3" />
      </motion.div>

      {/* Grid de aspectos */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-4"
      >
        <div className="grid grid-cols-3 gap-2">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.05 * index }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleItem(item.id)}
              className={`p-3 rounded-xl cursor-pointer transition-all ${
                selectedItems.includes(item.id) 
                  ? 'bg-pink-200' 
                  : 'bg-pink-50'
              }`}
            >
              <span className="text-xl">{item.emoji}</span>
              {selectedItems.includes(item.id) && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-3 h-3 bg-pink-500 rounded-full flex items-center justify-center"
                >
                  <span className="text-white text-xs">✓</span>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        <p className="text-pink-400 text-xs mt-3">
          {selectedItems.length}/6 para continuar
        </p>
      </motion.div>

      {/* Mensaje final */}
      {allSelected && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {/* Emoji de ella feliz */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-pink-200 to-pink-300 flex items-center justify-center"
          >
            <span className="text-2xl">😊</span>
          </motion.div>

          <p className="text-pink-600" style={{ fontFamily: 'Georgia, serif' }}>
            Siempre quise que tuvieras una vida grande.
          </p>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onComplete}
            className="text-pink-400 text-sm"
          >
            ✓
          </motion.button>
        </motion.div>
      )}
    </div>
  )
}
