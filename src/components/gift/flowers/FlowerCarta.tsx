'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart } from 'lucide-react'

interface FlowerCartaProps {
    onComplete: () => void
}

export function FlowerCarta({ onComplete }: FlowerCartaProps) {
    const [showButton, setShowButton] = useState(false)

    // Confetti particles
    const [particles, setParticles] = useState<{ id: number; x: number; color: string; delay: number }[]>([])

    useEffect(() => {
        // Show button after a delay to ensure reading
        const timer = setTimeout(() => setShowButton(true), 15000)
        return () => clearTimeout(timer)
    }, [])

    const handleHarvest = () => {
        // Generate particles
        const newParticles = Array.from({ length: 40 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            color: ['#F472B6', '#EC4899', '#FB7185', '#FFF1F2'][Math.floor(Math.random() * 4)],
            delay: Math.random() * 2
        }))
        setParticles(newParticles)

        // Complete after animation
        setTimeout(onComplete, 3000)
    }

    const paragraphs = [
        "Siempre has tenido algo que me llamó mucho la atención.",
        "Esa forma tuya de ir detrás de lo que quieres, incluso cuando no parece el mejor día para hacerlo.",
        "Aunque te dolieran las manos de usar esa máquina tantas horas.\nAunque estuvieras pasando por una de esas crisis donde todo pesa más de la cuenta.\nAunque tocará madrugar para ir a un lugar que, seamos honestos… tampoco te llenaba tanto.",
        "Aun así ibas.",
        "Y eso… yo lo veía.",
        "Siempre pensé lo mismo de ti:",
        "cuando decides algo, lo persigues de verdad.",
        "Por eso nunca me sorprendió imaginarte siendo cualquier cosa.",
        "Doctora.\nPsicóloga.\nBailarina de ballet.\nCompositora.\nTiktoker.\nIncluso basquetbolista… aunque en eso seas sospechosamente mala.",
        "Pero lo curioso es que ninguna de esas cosas es lo que más me impresiona.",
        "Lo que realmente me gustaba ver…\nera a esa tipa guerrera que se levantaba y seguía intentando.",
        "La misma que a veces dudaba…\npero igual avanzaba.",
        "Y no sé si alguien te lo dijo muchas veces…",
        "pero esa determinación tuya\nte va a llevar muy lejos.",
        "Mucho más de lo que tú misma crees."
    ]

    return (
        <div className="relative p-8 text-center min-h-[500px] flex flex-col items-center justify-center bg-white rounded-3xl overflow-hidden shadow-inner border border-pink-50">

            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-100 via-rose-200 to-pink-100" />
            <div className="absolute bottom-10 left-4 text-pink-50 opacity-20 -rotate-12 select-none">
                <Heart size={120} fill="currentColor" />
            </div>

            <div className="max-w-md mx-auto space-y-6 py-10 z-10 transition-all duration-1000">
                {paragraphs.map((text, idx) => (
                    <motion.p
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 1.5, duration: 1 }}
                        className={`text-gray-700 font-serif text-lg leading-relaxed whitespace-pre-line ${idx === paragraphs.length - 1 ? 'font-black text-pink-600 text-xl pt-4' : 'font-medium'
                            }`}
                    >
                        {text}
                    </motion.p>
                ))}
            </div>

            <AnimatePresence>
                {showButton && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-10 pb-10 z-20"
                    >
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleHarvest}
                            className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-10 py-4 rounded-full font-black text-lg shadow-xl shadow-pink-200"
                        >
                            Cosechar Tulipán 5 ✨🌷
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Confetti particles */}
            {particles.map(p => (
                <motion.div
                    key={p.id}
                    initial={{ top: '100%', left: `${p.x}%`, scale: 1 }}
                    animate={{
                        top: '-10%',
                        left: `${p.x + (Math.random() * 20 - 10)}%`,
                        rotate: 360,
                        scale: 0
                    }}
                    transition={{ duration: 2 + Math.random(), delay: p.delay, ease: 'easeOut' }}
                    className="absolute w-3 h-3 rounded-full z-50 pointer-events-none"
                    style={{ backgroundColor: p.color }}
                />
            ))}

            {/* Final Unlock Message */}
            {particles.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm z-[60]"
                >
                    <motion.span
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="text-7xl mb-4"
                    >
                        🌷
                    </motion.span>
                    <h2 className="text-3xl font-black text-pink-600">Determinación</h2>
                    <p className="text-gray-500 font-bold uppercase tracking-widest mt-2">Tulipán 5 Desbloqueado</p>
                    <div className="flex gap-2 mt-4">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <motion.span key={i} animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, delay: i * 0.1 }}>✨</motion.span>
                        ))}
                    </div>
                </motion.div>
            )}
        </div>
    )
}
