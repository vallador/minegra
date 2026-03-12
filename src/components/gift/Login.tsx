'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGiftStore } from '@/store/useGiftStore'
import { TulipFlower } from './TulipFlower'

export function Login() {
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const login = useGiftStore(state => state.login)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const success = login(password)
        if (!success) {
            setError(true)
            setTimeout(() => setError(false), 800)
        }
    }

    return (
        <div className="min-h-screen w-full relative flex items-center justify-center overflow-hidden">
            {/* Fondo con gradiente cálido similar al bouquet */}
            <div
                className="absolute inset-0"
                style={{
                    background: `
            radial-gradient(ellipse at top, #fff5f5 0%, #fff0f5 30%, #ffe5ec 60%, #ffd6e7 100%)
          `,
                }}
            />

            {/* Partículas flotantes */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 rounded-full"
                        style={{
                            background: 'rgba(255,182,193,0.3)',
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -30, 0],
                            opacity: [0.2, 0.4, 0.2],
                        }}
                        transition={{
                            duration: 4 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                    />
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 w-full max-w-sm p-8"
            >
                <div className="text-center mb-8">
                    <motion.div
                        animate={{
                            rotate: [0, 5, -5, 0],
                            y: [0, -5, 0]
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="inline-block mb-4"
                    >
                        <span className="text-4xl">🌷</span>
                    </motion.div>
                    <h1
                        className="text-3xl font-light text-pink-600 tracking-wide"
                        style={{ fontFamily: 'Georgia, serif' }}
                    >
                        Para Vale
                    </h1>
                    <p className="text-pink-400 mt-2 text-sm italic">
                        Introduce la clave para entrar
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                        <motion.input
                            animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Contraseña..."
                            className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border-b-2 border-pink-200 text-pink-700 placeholder:text-pink-300 focus:outline-none focus:border-pink-500 transition-colors text-center"
                        />
                        {error && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="absolute -bottom-6 left-0 right-0 text-center text-xs text-pink-500"
                            >
                                Esa no es...
                            </motion.p>
                        )}
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-3 bg-pink-500 text-white rounded-full font-light tracking-widest shadow-lg shadow-pink-200 hover:bg-pink-600 transition-colors"
                        type="submit"
                    >
                        ENTRAR
                    </motion.button>
                </form>
            </motion.div>
        </div>
    )
}
