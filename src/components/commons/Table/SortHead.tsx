import React, { FC } from 'react';
import { DownArrowIcon, UpArrowIcon } from '../Icons';
import { ISortHead } from './TableProps';

const SortHead: FC<ISortHead> = ({ sortField, handleSort, active, label }) => {
  return (
    <div>
      {sortField ? (
        <>
          <span onClick={() => handleSort(sortField, 'asc')}>
            <UpArrowIcon className={active === 'asc' ? '' : 'sort-opacity'} />
          </span>
          <span onClick={() => handleSort(sortField, 'desc')}>
            <DownArrowIcon
              className={active === 'desc' ? '' : 'sort-opacity'}
            />
          </span>
          <span>{label}</span>
        </>
      ) : (
        label
      )}
    </div>
  );
};

export default SortHead;
