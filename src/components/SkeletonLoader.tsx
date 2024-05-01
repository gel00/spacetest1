const SkeletonLoader = (): JSX.Element => {
  return (
    <tr>
      <td colSpan={3}>
        <div className='h-14 p-5 bg-white animate space-y-2'>
          <div className='space-y-3'>
            <div className='grid grid-cols-7 gap-4'>
              <div className='h-4 bg-gray-300 rounded col-span-1' />
              <div className='h-4 bg-gray-300 rounded col-span-3' />
              <div className='h-4 bg-gray-300 rounded col-span-3' />
            </div>
          </div>
        </div>
      </td>
    </tr>
  )
}

export default SkeletonLoader
