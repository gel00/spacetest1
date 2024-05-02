import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { createMemoryRouter, RouterProvider, RouteObject } from 'react-router-dom'
import App from './App'
import useMockApi from './hooks/useMockApi'

// Define the types for your items and the hook returns
interface Item {
  id: number
  name: string
  price: number
}

interface UseMockApiState {
  items: Item[]
  loading: boolean
  error: string | null
  updateParams: (params: { [key: string]: string }) => void
}

// Mock the custom hook
jest.mock('./hooks/useMockApi', () => ({
  __esModule: true,
  default: jest.fn()
}))

// Mock useSearchParams
jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom')
  return {
    __esModule: true,
    ...originalModule,
    useSearchParams: jest.fn(() => [
      new URLSearchParams(),
      jest.fn()
    ])
  }
})

jest.mock('react-dom/test-utils', () => ({
  ...jest.requireActual('react-dom/test-utils'),
  act: jest.requireActual('react').act
}))

// Utility function to setup the test environment
const setup = (hookReturns: Partial<UseMockApiState>): void => {
  (useMockApi as jest.Mock).mockReturnValue({
    items: [],
    loading: false,
    error: null,
    updateParams: jest.fn(),
    ...hookReturns
  })

  // Define routes using RouteObject[]
  const routes: RouteObject[] = [{
    path: '/',
    element: <App />
  }]

  // Create the router with the routes
  const router = createMemoryRouter(routes)
  render(
    <RouterProvider router={router} />
  )
}

// Mock URLSearchParams behavior
const mockSearchParams = new URLSearchParams()
mockSearchParams.set('filter', '')
mockSearchParams.set('maxItems', '5');
(global as any).URLSearchParams = jest.fn(() => mockSearchParams)

describe('App Component', () => {
  test('renders without crashing', () => {
    setup({})
    expect(screen.getByText(/Item List/i)).toBeInTheDocument()
  })

  test('shows loading indicator when data is loading', () => {
    setup({ loading: true })
    const loadingSkeletons = screen.queryAllByTestId('skeleton-loader')
    expect(loadingSkeletons.length).toBeGreaterThan(0)
  })

  test('displays error message when there is an error', () => {
    const errorMessage = 'Failed to fetch items'
    setup({ error: errorMessage })
    expect(screen.getByText(errorMessage)).toBeInTheDocument()
  })

  test('shows items when data is loaded', async () => {
    const items = [
      { id: 1, name: 'Item A', price: 125 },
      { id: 2, name: 'Item B', price: 230 }
    ]
    setup({ items, loading: false })

    await waitFor(() => {
      items.forEach(item => {
        expect(screen.getByText(item.name)).toBeInTheDocument()
      })
    })
  })

  test('renders the cheapest 5 items on landing sorted by price', async () => {
    const items = [
      { id: 1, name: 'Item A', price: 125 },
      { id: 2, name: 'Item B', price: 230 },
      { id: 3, name: 'Item C', price: 295 },
      { id: 4, name: 'Item D', price: 245 },
      { id: 5, name: 'Item E', price: 900 },
      { id: 6, name: 'Item F', price: 875 },
      { id: 7, name: 'Item G', price: 235 },
      { id: 8, name: 'Item H', price: 400 }
    ]

    setup({ items, loading: false })

    // Check if filter values are passed to FilterBar component
    const filterInput = screen.getByPlaceholderText('Search') as HTMLInputElement
    const maxItemsInput = screen.getByLabelText(/max items/i) as HTMLInputElement

    // Assert that the input is found and has a default value of '5'
    expect(filterInput.value).toBe('')
    expect(maxItemsInput.value).toBe('5')

    // Check if only the cheapest 5 items are rendered
    await waitFor(() => {
      expect(screen.getByText('Item A')).toBeInTheDocument()
      expect(screen.getByText('Item B')).toBeInTheDocument()
      expect(screen.getByText('Item G')).toBeInTheDocument()
      expect(screen.getByText('Item D')).toBeInTheDocument()
      expect(screen.getByText('Item C')).toBeInTheDocument()
    })
  })
})
