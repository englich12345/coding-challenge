export const getQueryParams = () => {
  const retData = {};

  if (!window || !window.location || !window.location.search) {
    return retData;
  }

  const searchStr = window.location.search.split('?')[1];
  const getQueryParamObj = eachQuery => {
    const qDataArr = eachQuery.split('=');
    retData[qDataArr[0]] = qDataArr[1];
  };

  if (searchStr.includes('&')) {
    const queryStr = searchStr.split('&');
    queryStr.forEach(eachQuery => getQueryParamObj(eachQuery));
  } else {
    getQueryParamObj(searchStr);
  }

  return retData;
}

export const getSortObj = activeSort => {
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