import React from 'react'
import { DownArrowIcon, UpArrowIcon } from '../Icons'

const SortHead = ({
  sortField = '',
  label = '',
  active = false,
  handleSort
}) => {
  return (
    <div>
      {
        sortField ? (
          <>
            <span onClick={() => handleSort(sortField, 'asc')}><UpArrowIcon className={active === 'asc' ? '' : 'sort-opacity'} /></span>
            <span onClick={() => handleSort(sortField, 'desc')}><DownArrowIcon className={active === 'desc' ? '' : 'sort-opacity'} /></span>
            <span>{label}</span>
          </>
        ) : label
      }
    </div>
  )
}

export default SortHead