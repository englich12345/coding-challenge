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
  const [errorCandidate, setErrorCandidate] = useState(null)
  const { urlParams, changeParams } = usePersistenceUrl()
  const dispatch = useDispatch()
  const [listCandidates, setListCandidates] = useState([])
  const candidate = useSelector(state => get(state, 'candidateReducer', []))
  const { sort, search } = getQueryParams()
  const { sortVal, sortOrder } = getSortObj(sort);
  const constructListCandidate = () => {
    let newListCandidate = get(candidate, 'data.data', [])
    if (search) newListCandidate = newListCandidate.filter(data => lowerCase(data.name).includes(search) || lowerCase(data.status).includes(search) || lowerCase(data.position_applied).includes(search))
    if (sort) {
      if (sortVal === "yearOfExperience") newListCandidate = sortNumber(newListCandidate, sortOrder, "year_of_experience", 'number')
      if (sortVal === "position") newListCandidate = sortNumber(newListCandidate, sortOrder, "position_applied", 'string')
      if (sortVal === "dateOfApplication") newListCandidate = sortNumber(newListCandidate, sortOrder, "application_date", 'date')
    }
    return newListCandidate.map(item => {
      const currentDate = new Date()
      const birthday = new Date(item.birth_date)
      const ageOfCandidate = currentDate.getFullYear() - birthday.getFullYear()
      return [
        item.name,
        item.email,
        ageOfCandidate,
        item.year_of_experience,
        item.position_applied,
        dateFormat(item.application_date),
        capitalize(item.status)]
    })
  }

  const tableHeader = [
    { label: "Name" },
    { label: "Email" },
    { label: "Age" },
    { label: "Year of Experience", sortField: "yearOfExperience", active: sortVal === "yearOfExperience" && sortOrder },
    { label: "Position applied", sortField: "position", active: sortVal === "position" && sortOrder },
    { label: "Applied", sortField: "dateOfApplication", active: sortVal === "dateOfApplication" && sortOrder },
    { label: "Status" },
  ]

  useEffect(() => {
    if (!candidate.loading && candidate.data) {
      setListCandidates(constructListCandidate())
      setErrorCandidate(null)
    } else if (!candidate.loading && candidate.error) {
      console.log('candidate.error', candidate.error)
      setErrorCandidate(candidate.error)
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
        tableHead={tableHeader}
        tableData={listCandidates}
        noFoundData="No found candidates"
        error={errorCandidate}
        handleSort={(sortField, order) => changeParams({ sort: `${sortField}-${order}` })}
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
          <input placeholder="Filter by name / status/ position" name="search" value={search || ""} onChange={e => changeParams({ search: lowerCase(e.target.value) })} />
        </span>
      </div>
      <div className="application-margin-top-20">
        {tableRender()}
      </div>
    </div>
  )
}

export default Application