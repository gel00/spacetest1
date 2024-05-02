import React from 'react'
import './styles/App.css'
import useMockApi from './hooks/useMockApi'
import ItemList from './components/ItemList/ItemList'
import FilterBar from './components/FilterBar/FilterBar'

const App: React.FC = (): JSX.Element => {
  const { items, loading, error, updateParams } = useMockApi()

  const handleSearchChange = (query: string): void => {
    updateParams({ filter: query })
  }

  const handleMaxItemsChange = (maxItems: string): void => {
    updateParams({ maxItems })
  }

  const currentFilter = new URLSearchParams(window.location.search).get('filter') ?? ''
  const currentMaxItems = new URLSearchParams(window.location.search).get('maxItems') ?? '5'

  return (
    <div className='App'>
      <div className='container mx-auto mt-4 px-4 sm:px-8'>
        <h1 className='text-2xl font-semibold mb-4'>Item List</h1>
        <FilterBar
          value={currentFilter}
          onSearch={handleSearchChange}
          maxItems={currentMaxItems}
          onMaxItemsChange={handleMaxItemsChange}
          placeholder='Search'
        />

        <ItemList items={items} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default App
