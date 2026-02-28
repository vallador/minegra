import { create } from 'zustand'

export type FlowerStatus = 'closed' | 'open' | 'bloomed'

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
  triviaCompleted: boolean
  
  // Acciones
  openFlower: (id: number) => void
  closeFlower: () => void
  bloomFlower: (id: number) => void
  completeTrivia: () => void
  showFinalLetter: () => void
  
  // Helpers
  allBloomed: () => boolean
}

const initialFlowers: Flower[] = [
  { id: 1, title: 'La rutina', status: 'closed' },
  { id: 2, title: 'La loma', status: 'closed' },
  { id: 3, title: 'Lluvia', status: 'closed' },
  { id: 4, title: 'Humor', status: 'closed' },
  { id: 5, title: 'Basket', status: 'closed' },
  { id: 6, title: 'Hogar', status: 'closed' },
  { id: 7, title: 'Tú', status: 'closed' },
]

export const useGiftStore = create<GiftState>((set, get) => ({
  flowers: initialFlowers,
  currentFlower: null,
  showTrivia: false,
  showLetter: false,
  triviaCompleted: false,
  
  openFlower: (id: number) => {
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
      const allBloomedNow = newFlowers.every(f => f.status === 'bloomed')
      return {
        flowers: newFlowers,
        currentFlower: null,
        showTrivia: allBloomedNow
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
  
  allBloomed: () => {
    return get().flowers.every(f => f.status === 'bloomed')
  }
}))
