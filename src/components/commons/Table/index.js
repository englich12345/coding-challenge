import React from 'react'
import _ from "lodash";
import {
  Column,
  Table,
  AutoSizer,
  createTableMultiSort,
  SortIndicator
} from "react-virtualized";
import "react-virtualized/styles.css";
import "./style.css"

const CommonTable = ({
  tableData,
  tableHeader,
  sortBy,
  sortDirection,
  onSortList,
  tableDimension
}) => {
  const defaultSortDirection = {}
  const defaultSortBy = tableHeader.map(column=> {
    if (column.isSort) {
      defaultSortDirection[column.dataKey] = column.sort
      return column.dataKey
    }
    return
  })
  
  const sortState = createTableMultiSort(onSortList, {
    defaultSortBy,
    defaultSortDirection
  });
  const headerRenderer = ({ dataKey, label }) => {
    const showSortIndicator = sortState.sortBy.includes(dataKey);
    return (
      <>
        <span title={label}>{label}</span>
        {showSortIndicator && (
          <SortIndicator sortDirection={sortState.sortDirection[dataKey]} />
        )}
      </>
    );
  };

  return (
    <div style={{ height: tableDimension.height, width: tableDimension.width }}>
      <AutoSizer>
        {({ height, width }) => (
          <Table
            width={width}
            height={height}
            headerHeight={tableDimension.headerHeight || 20}
            rowHeight={tableDimension.rowHeight || 30}
            sort={sortState.sort}
            sortBy={sortBy}
            sortDirection={sortDirection}
            rowCount={tableData.length}
            rowGetter={({ index }) => tableData[index]}
          >
            {
              tableHeader.map(column => (
                <Column
                  key={column.label}
                  label={column.label}
                  dataKey={column.dataKey}
                  width={column.width}
                  headerRenderer={headerRenderer}
                />
              ))
            }
          </Table>
        )}
      </AutoSizer>
    </div>
  )
}

export default CommonTable