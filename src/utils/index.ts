import { isString, isNumber, isDate } from 'lodash';
import { IApplication } from '../components/views/Application/Application';

export const getQueryParams = () => {
  const retData: { [key: string]: string } = {};

  if (!window || !window.location || !window.location.search) {
    return retData;
  }

  const searchStr = window.location.search.split('?')[1];
  const getQueryParamObj = (eachQuery: string) => {
    const qDataArr = eachQuery.split('=');
    retData[qDataArr[0]] = decodeURI(qDataArr[1]);
  };

  if (searchStr.includes('&')) {
    const queryStr = searchStr.split('&');
    queryStr.forEach(eachQuery => getQueryParamObj(eachQuery));
  } else {
    getQueryParamObj(searchStr);
  }

  return retData;
};

export const getSortObj = (activeSort: string | undefined) => {
  if (!activeSort) {
    return {
      sortVal: '',
      sortOrder: '',
    };
  }

  const activeParts = activeSort.split('-');
  const sortVal = activeParts[0];
  const sortOrder = activeParts[1];

  return {
    sortVal,
    sortOrder,
  };
};

export const dateFormat = (date: string) => {
  const newDate = new Date(date);
  const day = newDate.getDate();
  const month = newDate.getMonth() + 1;
  const year = newDate.getFullYear();
  return `${day}/${month}/${year}`;
};

export const sortArray = (
  list: Array<object>,
  direction: string,
  property: string
) => {
  return list.sort((a: { [key: string]: any }, b: { [key: string]: any }) => {
    if (isNumber(a[property])) {
      if (direction === 'asc') return a[property] - b[property];
      return b[property] - a[property];
    } else if (isString(a[property])) {
      if (direction === 'asc') return a[property].localeCompare(b[property]);
      return b[property].localeCompare(a[property]);
    } else if (isDate(a[property])) {
      const dateA = new Date(a[property]);
      const dateB = new Date(b[property]);
      if (direction === 'asc') return dateA.getTime() - dateB.getTime();
      return dateB.getTime() - dateA.getTime();
    }
  });
};
