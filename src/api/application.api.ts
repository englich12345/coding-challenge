import axios from 'axios';

export const getCandidates = async () => {
  const url = 'candidates';
  return axios.get(url);
};
