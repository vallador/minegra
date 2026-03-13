import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type FlowerStatus = 'closed' | 'open' | 'bloomed' | 'withered' | 'incomplete'

export interface Flower {
  id: number
  title: string
  status: FlowerStatus
  unlockTime?: number
}

interface GiftState {
  // Seguridad
  isLoggedIn: boolean
  isAdmin: boolean

  // Flores
  flowers: Flower[]
  persistedFlowers: Flower[]
  currentFlower: number | null

  // Estados finales
  showTrivia: boolean
  showLetter: boolean
  showBlackScreen: boolean
  triviaCompleted: boolean

  // Acciones
  login: (password: string) => boolean
  logout: () => void
  resetProgress: () => void
  openFlower: (id: number) => void
  closeFlower: () => void
  bloomFlower: (id: number) => void
  witherAllFlowers: () => void
  markIncomplete: (id: number) => void
  completeTrivia: () => void
  showFinalLetter: () => void
  showBlackScreenFinal: () => void

  // Helpers
  allBloomed: () => boolean
  canOpenFlower: (id: number) => boolean
  getTimeUntilUnlock: (id: number) => number // ms
}

// 8 tulipanes - el último será especial
const initialFlowers: Flower[] = [
  { id: 1, title: 'La rutina', status: 'closed' },
  { id: 2, title: 'La loma', status: 'closed' },
  { id: 3, title: 'Lluvia', status: 'closed' },
  { id: 4, title: 'Humor', status: 'closed' },
  { id: 5, title: 'Determinación', status: 'closed' },
  { id: 6, title: 'Hogar', status: 'closed' },
  { id: 7, title: 'Tú', status: 'closed' },
  { id: 8, title: '?', status: 'closed' },
]

const START_TIME = new Date('2026-03-13T00:00:00-04:00').getTime()
const INTERVAL = 4 * 60 * 60 * 1000 // 4 horas (el 4to se abre a mediodía)

export const useGiftStore = create<GiftState>()(
  persist(
    (set, get) => ({
      isLoggedIn: false,
      isAdmin: false,
      flowers: initialFlowers,
      persistedFlowers: initialFlowers,
      currentFlower: null,
      showTrivia: false,
      showLetter: false,
      showBlackScreen: false,
      triviaCompleted: false,

      login: (password: string) => {
        const pass = password.trim().toLowerCase()
        console.log('Intentando login con:', pass) // Debug para el usuario en consola
        if (pass === 'bartolito') {
          console.log('Login exitoso como Negra')

          const now = Date.now()
          const newFlowers = initialFlowers.map(f => {
            // 1 al 3 ya cosechados (bloomed)
            if (f.id <= 3) return { ...f, status: 'bloomed' as FlowerStatus }

            // 4 y 5 habilitados (tiempo = ahora)
            if (f.id === 4 || f.id === 5) return { ...f, unlockTime: now }

            // 6: 2 horas, 7: 1 hora, 8: 1.5 horas
            if (f.id === 6) return { ...f, unlockTime: now + 2 * 60 * 60 * 1000 }
            if (f.id === 7) return { ...f, unlockTime: now + 1 * 60 * 60 * 1000 }
            if (f.id === 8) return { ...f, unlockTime: now + 1.5 * 60 * 60 * 1000 }

            return f
          })

          set({
            isLoggedIn: true,
            isAdmin: false,
            flowers: newFlowers,
            persistedFlowers: newFlowers,
            currentFlower: null,
            showTrivia: false,
            showLetter: false,
            showBlackScreen: false,
            triviaCompleted: false
          })
          return true
        }
        if (pass === 'adminnegra') {
          console.log('Login exitoso como Admin')
          // Admin inicia con el estado actual de las flores para probar, 
          // pero sus acciones no se guardarán en persistedFlowers
          set({ isLoggedIn: true, isAdmin: true })
          return true
        }
        console.log('Contraseña incorrecta')
        return false
      },

      logout: () => {
        // Al cerrar sesión, nos aseguramos de que el estado real (persisted) sea el que quede
        // por si el admin estuvo jugueteando.
        const persisted = get().persistedFlowers
        set({
          isLoggedIn: false,
          isAdmin: false,
          flowers: persisted.length > 0 ? persisted : initialFlowers,
          currentFlower: null
        })
      },

      resetProgress: () => {
        set({
          flowers: initialFlowers,
          persistedFlowers: initialFlowers,
          currentFlower: null,
          showTrivia: false,
          showLetter: false,
          showBlackScreen: false,
          triviaCompleted: false
        })
      },

      getTimeUntilUnlock: (id: number) => {
        if (get().isAdmin) return 0
        const flower = get().flowers.find(f => f.id === id)
        const now = Date.now()
        const unlockTime = flower?.unlockTime ?? (START_TIME + (id - 1) * INTERVAL)
        return Math.max(0, unlockTime - now)
      },

      canOpenFlower: (id: number) => {
        const state = get()

        // Bypass para admin
        if (state.isAdmin) return true

        // Desbloqueo manual del tulipán 3 (solicitud del usuario)
        if (id === 3) return true

        const flower = state.flowers.find(f => f.id === id)
        const now = Date.now()
        const unlockTime = flower?.unlockTime ?? (START_TIME + (id - 1) * INTERVAL)
        if (now < unlockTime) return false

        // La primera flor siempre se puede abrir si el tiempo pasó
        if (id === 1) return true

        // Habilitar 4 y 5 directamente si tienen tiempo override (bartolito login)
        if ((id === 4 || id === 5) && flower?.unlockTime !== undefined && now >= flower.unlockTime) {
          return true
        }

        // Para abrir la flor N, la flor N-1 debe estar florecida o marchita o incompleta
        const previousFlower = state.flowers.find(f => f.id === id - 1)
        if (!previousFlower) return false

        return (
          previousFlower.status === 'bloomed' ||
          previousFlower.status === 'withered' ||
          previousFlower.status === 'incomplete'
        )
      },

      openFlower: (id: number) => {
        const state = get()

        // Verificar si puede abrir esta flor
        if (!state.canOpenFlower(id)) return

        // La flor 8 es especial - mensaje de futuro e "intriga"
        if (id === 8) {
          set(state => {
            const newFlowers = state.flowers.map(f =>
              f.id === id ? { ...f, status: 'incomplete' as FlowerStatus } : f
            )
            return {
              flowers: newFlowers,
              persistedFlowers: state.isAdmin ? state.persistedFlowers : newFlowers,
              currentFlower: id
            }
          })
          return
        }

        set(state => {
          const newFlowers = state.flowers.map(f =>
            f.id === id ? { ...f, status: 'open' as FlowerStatus } : f
          )
          return {
            flowers: newFlowers,
            persistedFlowers: state.isAdmin ? state.persistedFlowers : newFlowers,
            currentFlower: id
          }
        })
      },

      closeFlower: () => {
        set({ currentFlower: null })
      },

      bloomFlower: (id: number) => {
        set(state => {
          const newFlowers = state.flowers.map(f =>
            f.id === id ? { ...f, status: 'bloomed' as FlowerStatus } : f
          )

          // Verificar si todas las flores están completas (7 normales florecidas + 1 incompleta)
          const allComplete = newFlowers.every(f =>
            f.status === 'bloomed' || f.status === 'withered' || f.status === 'incomplete'
          )

          return {
            flowers: newFlowers,
            persistedFlowers: state.isAdmin ? state.persistedFlowers : newFlowers,
            currentFlower: null,
            showTrivia: allComplete
          }
        })
      },

      witherAllFlowers: () => {
        set(state => {
          const newFlowers = state.flowers.map(f =>
            f.status === 'bloomed' ? { ...f, status: 'withered' as FlowerStatus } : f
          )
          return {
            flowers: newFlowers,
            persistedFlowers: state.isAdmin ? state.persistedFlowers : newFlowers
          }
        })
      },

      markIncomplete: (id: number) => {
        set(state => {
          const newFlowers = state.flowers.map(f =>
            f.id === id ? { ...f, status: 'incomplete' as FlowerStatus } : f
          )
          return {
            flowers: newFlowers,
            persistedFlowers: state.isAdmin ? state.persistedFlowers : newFlowers,
            currentFlower: null
          }
        })
      },

      completeTrivia: () => {
        set({
          showTrivia: false,
          triviaCompleted: true,
          showLetter: true
        })
      },

      showFinalLetter: () => {
        set({ showLetter: true })
      },

      showBlackScreenFinal: () => {
        set({
          showLetter: false,
          showBlackScreen: true
        })
      },

      allBloomed: () => {
        return get().flowers.every(f =>
          f.status === 'bloomed' || f.status === 'withered' || f.status === 'incomplete'
        )
      }
    }),
    {
      name: 'gift-storage',
      version: 5, // Forzar limpieza v5
      partialize: (state) => ({
        isLoggedIn: state.isLoggedIn,
        isAdmin: state.isAdmin,
        persistedFlowers: state.persistedFlowers,
        showTrivia: state.showTrivia,
        showLetter: state.showLetter,
        showBlackScreen: state.showBlackScreen,
        triviaCompleted: state.triviaCompleted
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          // Al cargar el storage, sincronizar flowers con persistedFlowers
          state.flowers = state.persistedFlowers.length > 0
            ? state.persistedFlowers
            : initialFlowers
        }
      }
    }
  )
)
