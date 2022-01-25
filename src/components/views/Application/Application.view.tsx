import React, { FC } from 'react';
import Toast from '../../commons/Notification';
import { AccountIcon } from '../../commons/Icons';
import CommonTable from '../../commons/Table';
import { lowerCase, capitalize } from 'lodash';
import { IApplicationView } from './Application';

const ApplicationView: FC<IApplicationView> = ({
  sortVal,
  sortOrder,
  search,
  changeParams,
  tableData,
  positionOptions,
  statusOptions,
  position,
  status,
}) => {
  const tableHeader = [
    { label: 'Name', sortField: '', active: '' },
    { label: 'Email', sortField: '', active: '' },
    { label: 'Age', sortField: '', active: '' },
    {
      label: 'Year of Experience',
      sortField: 'yearOfExperience',
      active: sortVal === 'yearOfExperience' ? sortOrder : '',
    },
    {
      label: 'Position applied',
      sortField: 'position',
      active: sortVal === 'position' ? sortOrder : '',
    },
    {
      label: 'Applied',
      sortField: 'dateOfApplication',
      active: sortVal === 'dateOfApplication' ? sortOrder : '',
    },
    { label: 'Status', sortField: '', active: '' },
  ];
  return (
    <div className="container">
      <Toast />
      <div className="display-flex align-content-between align-center">
        <span className="display-flex align-center">
          <AccountIcon />{' '}
          <span className="application-title">Applications</span>
        </span>
        <span className="display-flex align-center">
          <span>
            <div className="application-margin-bottom-5">Filter</div>
            <input
              placeholder="Filter by name"
              name="search"
              value={search}
              onChange={e =>
                changeParams({ search: lowerCase(e.target.value) })
              }
            />
          </span>
          <span className="application-margin-10">
            <div className="application-margin-bottom-5">Position</div>
            <select
              name="position"
              value={position}
              onChange={e => changeParams({ position: e.target.value })}
            >
              <option value="">All</option>
              {positionOptions.map((position, index) => (
                <option value={lowerCase(position)} key={index}>
                  {capitalize(position)}
                </option>
              ))}
            </select>
          </span>
          <span>
            <div className="application-margin-bottom-5">Status</div>
            <select
              name="status"
              value={status}
              onChange={e => changeParams({ status: e.target.value })}
            >
              <option value="">All</option>
              {statusOptions.map((status, index) => (
                <option value={lowerCase(status)} key={index}>
                  {capitalize(status)}
                </option>
              ))}
            </select>
          </span>
        </span>
      </div>
      <div className="application-margin-top-20">
        <CommonTable
          tableData={tableData}
          tableHead={tableHeader}
          noFoundData="No found candidates"
          handleSort={(sortField, order) =>
            changeParams({ sort: `${sortField}-${order}` })
          }
        />
      </div>
    </div>
  );
};

export default ApplicationView;
