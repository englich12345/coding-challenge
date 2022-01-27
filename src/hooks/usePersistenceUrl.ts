import { useHistory, useLocation } from 'react-router-dom';
import { getQueryParams } from '../utils';

const usePersistenceUrl = () => {
  const history = useHistory();
  const location = useLocation();
  const urlParams = getQueryParams();

  const setUrlParam = (obj: { [key: string]: string }) => {
    let urlString = '';
    Object.keys(obj).forEach((key, index) => {
      if (index !== 0) urlString += '&';
      urlString += `${key}=${encodeURI(obj[key])}`;
    });
    if (history && location) {
      const newUrl = `?${urlString}`;
      if (newUrl !== location.search) {
        history.replace(newUrl);
      }
    }
  };

  const changeParams = (obj: { [key: string]: string }) => {
    const params = Object.assign({}, getQueryParams(), obj);
    setUrlParam(params);
  };
  return { urlParams, changeParams };
};

export default usePersistenceUrl;
