import axios from "axios";

class AxiosApi {
  constructor() {
    this.baseUrl = process.env.REACT_APP_BASE_URL;
    this.http = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
    });
  }
  postData(url, data) {
    return this.http.post(`${this.baseUrl}${url}`, data);
  }
  getResponse(url) {
    return this.http.get(`${this.baseUrl}${url}`);
  }
  async getData(url) {
    const response = await this.http.get(`${this.baseUrl}${url}`);
    if (response.status === 200) {
      return response.data;
    } else {
      return [];
    }
  }
}
const axiosApi = new AxiosApi();
Object.freeze(axiosApi);

export default axiosApi;
