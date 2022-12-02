import axios from "axios";

export default axios.create({
  baseURL: `http://10.152.66.153:8080/api/`,
  //baseURL: `http://172.20.10.8:8080/api/`,
});
