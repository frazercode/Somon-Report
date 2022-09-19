import axios from "axios";
const api_location = `${window.location.origin.substring(0,window.location.origin.lastIndexOf(":"))}`;

const request = async (method,path,body) => {
  const response = await axios({
    method,
    url: `${api_location}/${path}`,
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: JSON.stringify(body)
  });
  return response.data;
};

export default request;