'use client'

import { useEffect, useState } from 'react'
import { TulipBouquet } from '@/components/gift/TulipBouquet'
import { Login } from '@/components/gift/Login'
import { useGiftStore } from '@/store/useGiftStore'

export default function Home() {
  const isLoggedIn = useGiftStore(state => state.isLoggedIn)
  const [isHydrated, setIsHydrated] = useState(false)

  // Manejar hidratación de Zustand persistido
  useEffect(() => {
    setIsHydrated(true)
  }, [])

  if (!isHydrated) return null

  return isLoggedIn ? <TulipBouquet /> : <Login />
}
