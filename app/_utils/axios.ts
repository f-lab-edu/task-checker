import axios from "axios";

const customAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

customAxios.interceptors.response.use(
  (res) => {
    console.log("요청 성공");
    return res;
  },
  (err) => {
    console.log("에러 발생");
    return Promise.reject(err);
  },
);

export default customAxios;
