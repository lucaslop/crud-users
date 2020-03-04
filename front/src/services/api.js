import axios from "axios";

const api = axios.create({ baseURL: "http://192.168.99.100:3333/" });

api.postOrPut = (url, id, data, config = {}) => {
  const method = id ? "put" : "post";
  const apiUrl = id ? `${url}/${id}` : url;
  console.log(method, apiUrl);
  return api[method](apiUrl, data, config);
};
export default api;
