import axios from "axios";

export default axios.create({
  baseURL: `http://192.168.1.3:8080/api/`,
  //baseURL: `http://172.20.10.8:8080/api/`,
});
