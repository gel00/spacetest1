import React from 'react'
import './App.css'
import useMockApi from './hooks/useMockApi'
import ItemList from './components/ItemList'

const App: React.FC = (): JSX.Element => {
  const { items, loading, error, updateParams } = useMockApi()

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    updateParams({ filter: event.target.value, maxItems: '5' })
  }

  return (
    <div className='App'>
      <div className='container mx-auto mt-4 px-4 sm:px-8'>
        <h1 className='text-2xl font-semibold mb-4'>Item List</h1>
        <input
          type='text'
          onChange={handleFilterChange}
          placeholder='Filter by name'
        />
        <ItemList items={items} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default App
