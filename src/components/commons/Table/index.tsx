import React, { FC } from 'react';
import { ITableProps, ITableHeadProps } from './TableProps';
import SortHead from './SortHead';
import './style.scss';
import { isEmpty } from 'lodash';

const CommonTable: FC<ITableProps> = ({
  tableHead,
  tableData,
  noFoundData,
  handleSort,
}) => {
  return (
    <div className="table">
      <table className="customers">
        <thead>
          <tr>
            {tableHead.map((header: ITableHeadProps, index: number) => (
              <th key={index}>
                <SortHead
                  sortField={header.sortField}
                  label={header.label}
                  active={header.active}
                  handleSort={handleSort}
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.length > 0 &&
            tableData.map((dataRow: Array<object>, index: number) => {
              return (
                <tr key={index}>
                  {dataRow.map((dataCell: object | string, idx: number) => (
                    <td key={idx}>{dataCell}</td>
                  ))}
                </tr>
              );
            })}
        </tbody>
      </table>
      {isEmpty(tableData) && noFoundData && (
        <div className="text-center margin-top-20 margin-bottom-20">
          {noFoundData}
        </div>
      )}
    </div>
  );
};

export default CommonTable;
