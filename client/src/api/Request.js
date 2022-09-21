import axios from "axios";
const api_location = `${window.location.origin.substring(0,window.location.origin.lastIndexOf(":"))}`;

const request = async (method,path,body) => {
  const response = await axios({
    method,
    url: `${api_location}/${path}`,
    withCredentials: true,
    params: method.toLowerCase() === 'get' ? body : undefined,
    validateStatus: () => true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: method.toLowerCase() === 'get' ? undefined:JSON.stringify(body)
  });
  return response.data;
};

export default request;
export {
  api_location
}