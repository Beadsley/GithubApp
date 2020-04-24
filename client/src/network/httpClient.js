import axios from 'axios';

const request = async (options = {}) => {
  const { data } = await axios({
    method: options.method,
    url: options.url,
    headers: options.headers,
    body: options.body,
    params: options.params,
  });
  return data;
};

export default request;
