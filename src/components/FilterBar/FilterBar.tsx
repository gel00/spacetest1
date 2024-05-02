// src/components/FilterBar.tsx
import React from 'react'
import { FilterBarProps } from '../../types/types'

const FilterBar: React.FC<FilterBarProps> = ({ value, onSearch, maxItems, onMaxItemsChange, placeholder = 'Search' }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    onSearch(event.target.value)
  }

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    onMaxItemsChange(event.target.value)
  }

  return (
    <div className='flex sm:flex-row flex-col mt-5 mb-7'>
      <div className='flex flex-row mb-1 sm:mb-0'>
        <div className='relative'>
          <select
            value={maxItems}
            onChange={handleSelectChange}
            aria-label='Max Items'
            className='appearance-none rounded-l border block w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
          >
            <option value='5'>5</option>
            <option value='All'>All</option>
          </select>
          <div
            className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'
          >
            <svg className='fill-current h-4 w-4' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
              <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
            </svg>
          </div>
        </div>
      </div>

      <div className='relative flex items-center border-b border-gray-300 '>
        <svg className='w-5 h-5 text-gray-500 absolute ml-3 pointer-events-none' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
        </svg>
        <input
          type='text'
          className='flex-grow appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-10 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none'
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder}
        />
      </div>
    </div>
  )
}

export default FilterBar
