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

export const dateFormat = date => {
  const newDate = new Date(date)
  const day = newDate.getDate()
  const month = newDate.getMonth() + 1
  const year = newDate.getFullYear()
  return `${day}/${month}/${year}`
}

export const sortNumber = (list, direction, property, type) => {
  switch (type) {
    case "number":
      return list.sort((a, b) => {
        if (direction === "ASC") return a[property] - b[property]
        return b[property] - a[property]
      })
    case "string":
      return list.sort((a, b) => {
        if (direction === "ASC") return a[property].localeCompare(b[property])
        return b[property].localeCompare(a[property])
      })
    case "date":
      return list.sort((a, b) => {
        const dateAFormat = dateFormat(a[property]).split('/').reverse().join()
        const dateBFormat = dateFormat(b[property]).split('/').reverse().join()
        if (direction === "ASC") return dateAFormat - dateBFormat
        return dateBFormat - dateAFormat
      })
  
    default:
      return list.sort((a, b) => {
        if (direction === "ASC") return a[property] - b[property]
        return b[property] - a[property]
      })
  }
  
}