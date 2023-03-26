import axios from "axios";

export default axios.create({
  baseURL: `http://192.168.1.4:8080/api/`,
  //baseURL: `http://172.31.99.54:8080/api/`,
});
