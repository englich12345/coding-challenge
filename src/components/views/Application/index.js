import React from 'react'
import {useHistory, useLocation} from 'react-router-dom'
import './style.css'
import { AccountIcon } from '../../commons/Icons'
import CommonTable from '../../commons/Table'
import { getQueryParams, getSortObj } from '../../../utils'

const Application = () => {
  const {sort, search} = getQueryParams()
  const { sortVal, sortOrder } = getSortObj(sort);
  const history = useHistory()
  const location = useLocation()
  const tableData = [];
  for (let i = 0; i < 100; i++) {
    tableData.push({ name: `${i} Brian Vaughn`, description: "Software engineer" });
  }

  const tableHeader = [
    { label: "Name", dataKey: "name", sort: sortVal === "name" ? sortOrder : "ASC", width: 500, isSort: true },
    { label: "Description", dataKey: "description", sort: sortVal === "description" ? sortOrder : "ASC", width: 300, isSort: true },
  ]

  const setUrlParam = obj => {
    console.log('history.location.state', history.location.state)
    let urlString = ''
    Object.keys(obj).forEach((key, index) => {
      if (index !== 0) urlString += "&"
      urlString += `${key}=${obj[key]}`
    })
    if (history && location) {
      const newUrl = `?${urlString}`
      if(newUrl !== location.search) {
        history.replace(newUrl)
      }
    }
  }
  const changeParams = obj => {
    const params = Object.assign({}, getQueryParams(), obj)
    setUrlParam(params)
  }

  return (
    <div className="container">
      <div className="display-flex align-content-between align-center">
        <span className="display-flex align-center">
          <AccountIcon /> <span className="application-title">Applications</span>
        </span>
        <span>
          <input placeholder="Filter by name" name="search" value={search || ""} onChange={e => changeParams({search: e.target.value})} />
        </span>
      </div>
      <div className="application-margin-top-20">
        <CommonTable
          tableData={tableData}
          tableHeader={tableHeader}
          tableDimension={{
            height: 700,
            headerHeight: 20,
            rowHeight: 50
          }}
          onSortList={(sortBy, sortDirection) => {
            const sort = {sort: `${sortBy}-${sortDirection}`}
            changeParams(sort)
          }}
        />
      </div>
    </div>
  )
}

export default Application