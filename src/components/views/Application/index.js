import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import usePersistenceUrl from '../../customHook'
import './style.css'
import { fetchAllCandidates } from '../../../redux/actions/index'
import { AccountIcon, LoadingIcon } from '../../commons/Icons'
import CommonTable from '../../commons/Table'
import { getQueryParams, getSortObj, dateFormat, sortNumber } from '../../../utils'
import { get, capitalize, lowerCase } from 'lodash';

const Application = () => {
  const { urlParams, changeParams } = usePersistenceUrl()
  const dispatch = useDispatch()
  const [listCandidates, setListCandidates] = useState([])
  const candidate = useSelector(state => get(state, 'candidateReducer', []))
  const { sort, search } = getQueryParams()
  const { sortVal, sortOrder } = getSortObj(sort);
  const constructListCandidate = () => {
    let newListCandidate = get(candidate, 'data.data', [])
    if (search) newListCandidate = newListCandidate.filter(data => data.name === search || data.status === search || data.position_applied === search)
    if (sort) {
      if (sortVal === "yearOfExperience") newListCandidate = sortNumber(newListCandidate, sortOrder, "year_of_experience", 'number')
      if (sortVal === "position") newListCandidate = sortNumber(newListCandidate, sortOrder, "position_applied", 'string')
      if (sortVal === "dateOfApplication") newListCandidate = sortNumber(newListCandidate, sortOrder, "application_date", 'date')
    }
    return newListCandidate.map(item => {
      const currentDate = new Date()
      const birthday = new Date(item.birth_date)
      const ageOfCandidate = currentDate.getFullYear() - birthday.getFullYear()
      return ({
        name: item.name,
        email: item.email,
        age: ageOfCandidate,
        yearOfExperience: item.year_of_experience,
        position: item.position_applied,
        dateOfApplication: dateFormat(item.application_date),
        status: capitalize(item.status)
      })
    })
  }

  const tableHeader = [
    { label: "Name", dataKey: "name", width: 300, isSort: true },
    { label: "Email", dataKey: "email", width: 300, isSort: true },
    { label: "Age", dataKey: "age", width: 100, isSort: true },
    { label: "Year of Experience", dataKey: "yearOfExperience", sort: sortVal === "yearOfExperience" ? sortOrder : "ASC", width: 300, isSort: false },
    { label: "Position applied", dataKey: "position", sort: sortVal === "position" ? sortOrder : "ASC", width: 200, isSort: false },
    { label: "Applied", dataKey: "dateOfApplication", sort: sortVal === "dateOfApplication" ? sortOrder : "ASC", width: 200, isSort: false },
    { label: "Status", dataKey: "status", width: 300, isSort: true },
  ]

  useEffect(() => {
    if (candidate.data) {
      setListCandidates(constructListCandidate())
    }
  }, [candidate.loading, urlParams.search, urlParams.sort])

  useEffect(() => {
    dispatch(fetchAllCandidates())
  }, [])

  const tableRender = () => {
    if (candidate.loading) {
      return <div className="text-center"><LoadingIcon width={100} height={100} /></div>
    }
    return (
      <CommonTable
        tableData={listCandidates}
        tableHeader={tableHeader}
        tableDimension={{
          height: 700,
          headerHeight: 20,
          rowHeight: 50
        }}
        onSortList={(sortBy, sortDirection) => {
          const sort = { sort: `${sortBy}-${sortDirection}` }
          changeParams(sort)
        }}
      />
    )
  }

  return (
    <div className="container">
      <div className="display-flex align-content-between align-center">
        <span className="display-flex align-center">
          <AccountIcon /> <span className="application-title">Applications</span>
        </span>
        <span>
          <input placeholder="Filter by name" name="search" value={search || ""} onChange={e => changeParams({ search: lowerCase(e.target.value) })} />
        </span>
      </div>
      <div className="application-margin-top-20">
        {tableRender()}
      </div>
    </div>
  )
}

export default Application