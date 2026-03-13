'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface HarvestAchievementProps {
    onClose: () => void
    imagePath: string
    title: string
    audioSrc?: string
}

export function HarvestAchievement({ onClose, imagePath, title, audioSrc }: HarvestAchievementProps) {
    const [showConfetti, setShowConfetti] = useState(false)

    useEffect(() => {
        setShowConfetti(true)

        if (audioSrc) {
            const audio = new Audio(audioSrc)
            audio.play().catch(e => console.error("Error reproduciendo audio:", e))

            return () => {
                audio.pause()
                audio.currentTime = 0
            }
        }
    }, [audioSrc])

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
        >
            <motion.div
                initial={{ scale: 0.8, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="relative bg-white rounded-[40px] p-8 max-w-sm w-full shadow-2xl overflow-hidden text-center"
            >
                {/* Confetti Particles (Basic CSS implementation) */}
                {showConfetti && (
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        {[...Array(30)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{
                                    top: '-10%',
                                    left: `${Math.random() * 100}%`,
                                    rotate: 0,
                                    opacity: 1
                                }}
                                animate={{
                                    top: '110%',
                                    rotate: 360,
                                    opacity: 0
                                }}
                                transition={{
                                    duration: 2 + Math.random() * 2,
                                    delay: Math.random() * 2,
                                    repeat: Infinity
                                }}
                                className="absolute w-2 h-2 rounded-full"
                                style={{
                                    backgroundColor: ['#ff80b0', '#ffdeeb', '#ffd700', '#7fd3ed'][i % 4]
                                }}
                            />
                        ))}
                    </div>
                )}

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-gray-400 hover:text-pink-500 transition-colors z-10"
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-8 h-8">
                        <path d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="relative z-10">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', damping: 12, delay: 0.2 }}
                        className="w-full aspect-square rounded-3xl overflow-hidden shadow-xl border-4 border-pink-50 mb-6 bg-pink-50/50"
                    >
                        <img src={imagePath} alt="Tulipán" className="w-full h-full object-cover" />
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-2xl font-bold text-pink-600 mb-2"
                        style={{ fontFamily: 'Georgia, serif' }}
                    >
                        {title}
                    </motion.h2>

                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '60px' }}
                        transition={{ delay: 0.8 }}
                        className="h-1 bg-pink-200 mx-auto rounded-full"
                    />
                </div>
            </motion.div>
        </motion.div>
    )
}
