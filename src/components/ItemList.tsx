import React from 'react'
import { Item } from '../types/types'
import SkeletonLoader from './SkeletonLoader'
import { v4 as uuidv4 } from 'uuid'

interface ItemListProps {
  items: Item[]
  loading: boolean
  error: string | null
}

const RenderError: React.FC<{ error: string }> = ({ error }) => (
  <tr>
    <td colSpan={100} className='text-center py-2 text-red-500'>
      {error}
    </td>
  </tr>
)

const RenderItems: React.FC<{ items: Item[], headers: string[] }> = ({ items, headers }) => (
  <>
    {items.map((item) => (
      <tr key={uuidv4()}>
        {headers.map((header) => (
          <td key={header} className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
            {item[header as keyof Item]}
          </td>
        ))}
      </tr>
    ))}
  </>
)

const ItemList: React.FC<ItemListProps> = ({ items, loading, error }) => {
  const headers = items.length > 0 ? Object.keys(items[0]) : []

  const renderTableContent = (): JSX.Element | JSX.Element[] => {
    if (loading) {
      return Array.from({ length: 5 }).map(() => <SkeletonLoader key={uuidv4()} />)
    } else if (error !== null && error !== '') {
      return <RenderError error={error} />
    } else {
      return <RenderItems items={items} headers={headers} />
    }
  }

  return (
    <table className='min-w-full table-auto leading-normal shadow rounded-lg overflow-hidden'>
      <thead>
        <tr className='bg-gray-100'>
          {headers.map(header => (
            <th key={header} className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {renderTableContent()}
      </tbody>
    </table>
  )
}

export default ItemList
