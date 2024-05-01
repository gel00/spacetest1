import React from 'react'
import './App.css'
import useMockApi from './hooks/useMockApi'
import ItemList from './components/ItemList'

const App: React.FC = (): JSX.Element => {
  const { items, loading, error } = useMockApi()

  if (loading) return <p>Loading...</p>
  if (error !== null && error !== '') {
    return <p>Error: {error}</p>
  }

  return (
    <div className='App'>
      <h1 className='text-2xl font-semibold mb-4'>Item List</h1>
      <ItemList items={items} />
    </div>
  )
}

export default App
