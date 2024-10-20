import axios from "axios";

//const BASEURL = 'https://saavn.dev/api';
const BASEURL = 'http://localhost:3000';

const axiosInstance = () => {
  const token = localStorage.getItem("token");
  return axios.create({
    baseURL: BASEURL,
    headers: { Authorization: `Bearer ${token ?? ""}` },
  });
};

const userApis = {
  Login: async (data) => {
    const response = await axiosInstance().post(
      `${BASEURL}/login`,
      data
    );
    return response.data;
  },

  Register: async (data) => {
    const response = await axiosInstance().post(
      `${BASEURL}/signup`,
      data
    );
    return response.data;
  },
  
  // Other methods...
};

export default userApis;
