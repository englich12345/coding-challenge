import React, {useState} from 'react'
import './style.css'
import { AccountIcon } from '../../commons/Icons'
import CommonTable from '../../commons/Table'

const Application = () => {
  const tableData = [];
  for (let i = 0; i < 10; i++) {
    tableData.push({ name: `${i} Brian Vaughn`, description: "Software engineer" });
  }
  const tableHeader = [
    { label: "Name", dataKey: "name", width: 300, isSort: true },
    { label: "Description", dataKey: "description", width: 300, isSort: true },
  ]
  return (
    <div className="container">
      <div className="display-flex align-content-between align-center">
        <span className="display-flex align-center">
          <AccountIcon /> <span className="application-title">Applications</span>
        </span>
        <span>
          <input placeholder="Filter by name" />
        </span>
      </div>
      <div>
        <CommonTable
          tableData={tableData}
          tableHeader={tableHeader}
          tableDimension={{
            height: 300,
            headerHeight: 20,
            rowHeight: 50
          }}
          onSortList={({sortBy, sortDirection}) => {

          }}
        />
      </div>
    </div>
  )
}

export default Application