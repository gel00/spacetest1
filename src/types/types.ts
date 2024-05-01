export interface Item {
  id: number
  name: string
  price: number
}

export interface UseMockApiState {
  items: Item[]
  loading: boolean
  error: string | null
}
