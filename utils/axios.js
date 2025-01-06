import axios from 'axios';


const axiosInstance = axios.create({
  baseURL: 'http://localhost:9001/api', 
    timeout: 30000,
    withCredentials: true
});

const callAxios = async (method, url, body = null) => {
  try {
    let response;

    if (method === 'get') {
      response = await axiosInstance.get(url);
    } else if (method === 'post') {
      response = await axiosInstance.post(url, body);
    } else if (method === 'put') {
      response = await axiosInstance.put(url, body);
    } else if (method === 'delete') {
      response = await axiosInstance.delete(url, { data: body });
    } else {
      throw new Error('Invalid HTTP method');
    }

    return response.data; 

  } catch (error) {
    console.error('Error making Axios request:', error);
    throw error; 
  }
};

export default callAxios;
