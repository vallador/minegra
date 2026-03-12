'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGiftStore } from '@/store/useGiftStore'
import { TulipFlower } from './TulipFlower'

export function Login() {
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const { login, isLoggedIn } = useGiftStore()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Botón presionado, enviando:', password)
        const success = login(password)
        if (!success) {
            console.log('Resultado del login: fallido')
            setError(true)
            setTimeout(() => setError(false), 800)
        } else {
            console.log('Resultado del login: exitoso, isLoggedIn:', useGiftStore.getState().isLoggedIn)
        }
    }

    return (
        <div className="min-h-screen w-full relative flex items-center justify-center overflow-hidden">
            {/* Fondo Geométrico Dinámico */}
            <GeometricBackground />

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
                        Para mi Negra
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

                    {/* Botón de reseteo de emergencia - muy discreto */}
                    <div className="pt-8 text-center">
                        <button
                            type="button"
                            onClick={() => {
                                localStorage.clear();
                                window.location.reload();
                            }}
                            className="text-[10px] text-pink-200 hover:text-pink-300 transition-colors uppercase tracking-widest"
                        >
                            Limpiar caché del regalo
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    )
}

function GeometricBackground() {
    return (
        <div className="absolute inset-0 overflow-hidden bg-[#fff5f7]">
            {/* Imagen de fondo pexels */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: 'url("/pexels-background.jpg")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'brightness(0.9) saturate(1.2)'
                }}
            />

            {/* Overlay suave para legibilidad */}
            <div
                className="absolute inset-0 z-1"
                style={{
                    background: 'radial-gradient(circle at 50% 50%, rgba(255,245,247,0.3) 0%, rgba(255,238,242,0.6) 100%)'
                }}
            />

            {/* Formas geométricas animadas (ahora como decoración sobre la imagen) */}
            {[...Array(8)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute opacity-10 z-2"
                    style={{
                        width: Math.random() * 200 + 50,
                        height: Math.random() * 200 + 50,
                        backgroundColor: i % 2 === 0 ? '#ffdae0' : '#ffd1dc',
                        borderRadius: i % 3 === 0 ? '30% 70% 70% 30% / 30% 30% 70% 70%' : i % 3 === 1 ? '50%' : '0%',
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        filter: 'blur(30px)',
                    }}
                    animate={{
                        x: [0, Math.random() * 50 - 25, 0],
                        y: [0, Math.random() * 50 - 25, 0],
                        rotate: [0, 360],
                    }}
                    transition={{
                        duration: 20 + Math.random() * 10,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
            ))}
        </div>
    )
}
