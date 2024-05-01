import React from 'react'
import { Item } from '../types/types' // Ensure the correct path to your types file
import { v4 as uuidv4 } from 'uuid'

interface ItemListProps {
  items: Item[]
}

const ItemList: React.FC<ItemListProps> = ({ items }) => {
  const headers = items.length > 0 ? Object.keys(items[0]) : []

  return (
    <table className='min-w-full table-auto leading-normal shadow rounded-lg overflow-hidden'>
      <thead>
        <tr className='bg-gray-100'>
          {headers.map(header => (
            <th key={uuidv4()} className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={uuidv4()} className='border-b'>
            {headers.map(header => (
              <td key={header} className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                {item[header as keyof Item]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default ItemList
