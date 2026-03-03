import { create } from 'zustand'

export type FlowerStatus = 'closed' | 'open' | 'bloomed' | 'withered' | 'incomplete'

export interface Flower {
  id: number
  title: string
  status: FlowerStatus
}

interface GiftState {
  // Flores
  flowers: Flower[]
  currentFlower: number | null
  
  // Estados finales
  showTrivia: boolean
  showLetter: boolean
  showBlackScreen: boolean
  triviaCompleted: boolean
  
  // Acciones
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
}

// 8 tulipanes - el último será especial
const initialFlowers: Flower[] = [
  { id: 1, title: 'La rutina', status: 'closed' },
  { id: 2, title: 'La loma', status: 'closed' },
  { id: 3, title: 'Lluvia', status: 'closed' },
  { id: 4, title: 'Humor', status: 'closed' },
  { id: 5, title: 'Basket', status: 'closed' },
  { id: 6, title: 'Hogar', status: 'closed' },
  { id: 7, title: 'Tú', status: 'closed' },
  { id: 8, title: '?', status: 'closed' }, // La flor especial que nunca florece
]

export const useGiftStore = create<GiftState>((set, get) => ({
  flowers: initialFlowers,
  currentFlower: null,
  showTrivia: false,
  showLetter: false,
  showBlackScreen: false,
  triviaCompleted: false,
  
  canOpenFlower: (id: number) => {
    const state = get()
    // La primera flor siempre se puede abrir
    if (id === 1) return true
    
    // Para abrir la flor N, la flor N-1 debe estar florecida o marchita
    const previousFlower = state.flowers.find(f => f.id === id - 1)
    if (!previousFlower) return false
    
    return previousFlower.status === 'bloomed' || previousFlower.status === 'withered'
  },
  
  openFlower: (id: number) => {
    const state = get()
    
    // Verificar si puede abrir esta flor
    if (!state.canOpenFlower(id)) return
    
    // La flor 8 es especial - nunca florece completamente
    if (id === 8) {
      set(state => ({
        flowers: state.flowers.map(f => 
          f.id === id ? { ...f, status: 'incomplete' as FlowerStatus } : f
        ),
        currentFlower: id
      }))
      return
    }
    
    set(state => ({
      flowers: state.flowers.map(f => 
        f.id === id ? { ...f, status: 'open' as FlowerStatus } : f
      ),
      currentFlower: id
    }))
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
        currentFlower: null,
        showTrivia: allComplete
      }
    })
  },
  
  witherAllFlowers: () => {
    set(state => ({
      flowers: state.flowers.map(f => 
        f.status === 'bloomed' ? { ...f, status: 'withered' as FlowerStatus } : f
      )
    }))
  },
  
  markIncomplete: (id: number) => {
    set(state => ({
      flowers: state.flowers.map(f => 
        f.id === id ? { ...f, status: 'incomplete' as FlowerStatus } : f
      ),
      currentFlower: null
    }))
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
}))
