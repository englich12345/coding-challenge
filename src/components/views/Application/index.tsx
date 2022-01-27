import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import usePersistenceUrl from '../../../hooks/usePersistenceUrl';
import { uniqBy } from 'lodash';
import './style.scss';
import { fetchAllCandidates, notification } from '../../../redux/actions/index';
import { LoadingIcon } from '../../commons/Icons';
import { IApplication, IUseUrl, IUrlParams } from './Application';
import ApplicationView from './Application.view';
import {
  getQueryParams,
  getSortObj,
  dateFormat,
  sortArray,
} from '../../../utils';
import { get, capitalize, lowerCase } from 'lodash';

const defaultParamsUrl = {
  search: '',
  position: '',
  status: '',
};

const Application = () => {
  const { urlParams, changeParams }: IUseUrl = usePersistenceUrl();
  const dispatch = useDispatch();
  const [listCandidates, setListCandidates] = useState([]);
  const candidate = useSelector(state => get(state, 'applicationReducer', []));
  const positionOptions = uniqBy(
    get(candidate, 'data.data', []),
    'position_applied'
  )
    .map(data => get(data, 'position_applied'))
    .sort();
  const statusOptions = uniqBy(get(candidate, 'data.data', []), 'status')
    .map(data => get(data, 'status'))
    .sort();
  const { sort, search, status, position }: IUrlParams = Object.assign(
    { ...defaultParamsUrl },
    getQueryParams()
  );
  const { sortVal, sortOrder } = getSortObj(sort);
  const constructListCandidate = () => {
    let newListCandidate = get(candidate, 'data.data', []);
    if (search)
      newListCandidate = newListCandidate.filter((data: IApplication) =>
        lowerCase(data.name).includes(lowerCase(search))
      );
    if (position)
      newListCandidate = newListCandidate.filter(
        (data: IApplication) => lowerCase(data.position_applied) === position
      );
    if (status) {
      newListCandidate = newListCandidate.filter(
        (data: IApplication) => lowerCase(data.status) === status
      );
    }
    if (sort) {
      if (sortVal === 'yearOfExperience')
        newListCandidate = sortArray(
          newListCandidate,
          sortOrder,
          'year_of_experience'
        );
      if (sortVal === 'position')
        newListCandidate = sortArray(
          newListCandidate,
          sortOrder,
          'position_applied'
        );
      if (sortVal === 'dateOfApplication')
        newListCandidate = sortArray(
          newListCandidate,
          sortOrder,
          'application_date'
        );
    }
    return newListCandidate.map((item: IApplication) => {
      const currentDate = new Date();
      const birthday = new Date(item.birth_date);
      const ageOfCandidate = currentDate.getFullYear() - birthday.getFullYear();
      return [
        item.name,
        item.email,
        ageOfCandidate,
        item.year_of_experience,
        item.position_applied,
        dateFormat(item.application_date),
        capitalize(item.status),
      ];
    });
  };

  useEffect(() => {
    if (!candidate.loading && candidate.data) {
      setListCandidates(constructListCandidate());
    } else if (!candidate.loading && candidate.error) {
      dispatch(
        notification({
          title: 'Error',
          message: candidate.error.message,
          isOpen: true,
        })
      );
      setListCandidates([]);
    }
  }, [
    candidate.loading,
    urlParams.search,
    urlParams.sort,
    urlParams.position,
    urlParams.status,
  ]);

  useEffect(() => {
    dispatch(fetchAllCandidates());
  }, []);

  if (candidate.loading) {
    return (
      <div className="text-center">
        <LoadingIcon width={100} height={100} />
      </div>
    );
  }

  return (
    <ApplicationView
      search={search}
      position={position}
      status={status}
      changeParams={changeParams}
      tableData={listCandidates}
      sortVal={sortVal}
      sortOrder={sortOrder}
      positionOptions={positionOptions}
      statusOptions={statusOptions}
    />
  );
};

export default Application;
