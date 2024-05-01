import { useState, useEffect } from 'react'
import { Item, UseMockApiState } from '../types/types'

const mockItems: Item[] = [
  { id: 1, name: 'Item A', price: 125 },
  { id: 2, name: 'Item B', price: 230 },
  { id: 3, name: 'Item C', price: 295 },
  { id: 4, name: 'Item D', price: 245 },
  { id: 5, name: 'Item E', price: 900 },
  { id: 6, name: 'Item F', price: 875 },
  { id: 7, name: 'Item G', price: 235 },
  { id: 8, name: 'Item H', price: 400 }
]

const useMockApi = (): UseMockApiState => {
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    // Simulate an async API call
    const timeout = setTimeout(() => {
      try {
        setItems(mockItems)
        setLoading(false)
      } catch (e) {
        setError('Failed to fetch items')
        setLoading(false)
      }
    }, 1000) // Simulates network delay

    return () => clearTimeout(timeout) // Cleanup the timeout
  }, [])

  return { items, loading, error }
}

export default useMockApi
