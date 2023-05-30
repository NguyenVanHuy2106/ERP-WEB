import axios from "axios";

export default axios.create({
  baseURL: `https://phecommerce.herokuapp.com/api`,
  //baseURL: `http://172.20.10.8:8080/api/`,
});
