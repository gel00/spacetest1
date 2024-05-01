import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
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
  const [searchParams, setSearchParams] = useSearchParams()
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const filter = searchParams.get('filter') ?? ''
    const maxItems = searchParams.get('maxItems') ?? '5'

    // Set default search params if they are not present
    if (!searchParams.has('maxItems')) {
      searchParams.set('maxItems', '5')
      setSearchParams(searchParams)
    }

    setLoading(true)
    // Simulate an async API call
    const timeout = setTimeout(() => {
      try {
        let filteredItems = [...mockItems].sort((a, b) => a.price - b.price)

        if (filter !== null && filter.trim() !== '') {
          filteredItems = filteredItems.filter(item => item.name.toLowerCase().includes(filter.toLowerCase()))
        }

        if (maxItems !== null && maxItems.trim() !== '' && maxItems !== 'All') {
          const maxItemsParsed = parseInt(maxItems, 10)
          if (!isNaN(maxItemsParsed)) {
            filteredItems = filteredItems.slice(0, maxItemsParsed)
          }
        }

        setItems(filteredItems)
        setLoading(false)
      } catch (e) {
        setError('Failed to fetch items')
        setLoading(false)
      }
    }, 1000) // Simulates network delay

    return () => clearTimeout(timeout) // Cleanup the timeout
  }, [searchParams])

  const updateParams = (params: { [key: string]: string }): void => {
    setSearchParams(params)
  }

  return { items, loading, error, updateParams }
}

export default useMockApi
