import React, { FC } from 'react';
import { ITableProps, ITableHeadProps } from './TableProps';
import SortHead from './SortHead';
import './style.css';

const CommonTable: FC<ITableProps> = ({
  tableHead,
  tableData,
  noFoundData,
  error,
  handleSort,
}) => {
  return (
    <table id="customers">
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
          tableData.map((dataRow: any, index: number) => {
            return (
              <tr key={index}>
                {dataRow.map((dataCell: any, idx: number) => (
                  <td key={idx}>{dataCell}</td>
                ))}
              </tr>
            );
          })}
        {!error && noFoundData && (
          <tr>
            <td className="text-center">{noFoundData}</td>
          </tr>
        )}
        {error && (
          <tr>
            <td className="text-center">{error}</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default CommonTable;
