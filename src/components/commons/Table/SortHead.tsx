import React, { FC } from 'react';
import { DownArrowIcon, UpArrowIcon } from '../Icons';
import { ISortHead } from './Table';

const SortHead: FC<ISortHead> = ({ sortField, handleSort, active, label }) => {
  const sortHeaderLabel = active === 'asc' ? 'desc' : 'asc';
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
          <span
            onClick={() => handleSort(sortField, sortHeaderLabel)}
            className="cursor-pointer"
          >
            {label}
          </span>
        </>
      ) : (
        label
      )}
    </div>
  );
};

export default SortHead;
