import axios from "axios";

export const recommend = () =>
  axios.get("http://kumanxuan1.f3322.net:8881/cms/products/recommend");
