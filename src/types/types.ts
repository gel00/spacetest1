export interface FilterBarProps {
  value: string
  onSearch: (query: string) => void
  maxItems: string
  onMaxItemsChange: (maxItems: string) => void
  placeholder?: string
}
export interface Item {
  id: number
  name: string
  price: number
}

export interface ItemListProps {
  items: Item[]
  loading: boolean
  error: string | null
}

export interface UseMockApiState {
  items: Item[]
  loading: boolean
  error: string | null
  updateParams: (params: { [key: string]: string }) => void
}
