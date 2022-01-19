import React from 'react'
import SortHead from './SortHead'
import './style.css'

const CommonTable = ({ tableHead = [], tableData = [], handleSort, noFoundData, error }) => {
  return (
    <table id="customers">
      <thead>
        <tr>
          {
            tableHead.map((header, index) => (
              <th key={index}>
                <SortHead
                  sortField={header.sortField}
                  label={header.label}
                  active={header.active}
                  handleSort={handleSort}
                />
              </th>
            ))
          }
        </tr>
      </thead>
      <tbody>
        {
          tableData.length > 0 && tableData.map((dataRow, index) => {
            return (
              <tr key={index}>
                {
                  dataRow.map((dataCell, idx) => (
                    <td key={idx}>{dataCell}</td>
                  ))
                }
              </tr>
            )
          }) 
        }
        {!error && noFoundData && <tr><td className="text-center">{noFoundData}</td></tr>}
        {error && <tr><td className="text-center">{error}</td></tr>}
      </tbody>
    </table>
  )
}

export default CommonTable