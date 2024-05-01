import React from 'react'
import { Item } from '../types/types' // Ensure the correct path to your types file

interface ItemListProps {
  items: Item[]
}

const ItemList: React.FC<ItemListProps> = ({ items }) => {
  return (
    <ul className='list-none p-0 m-0'>
      {items.map(item => (
        <li key={item.id} className='border-b border-gray-200 py-2'>
          <h2 className='text-lg font-bold'>{item.name}</h2>
          <p className='text-gray-600'>${item.price.toFixed(2)}</p>
        </li>
      ))}
    </ul>
  )
}

export default ItemList
