
import { env } from "../Constants/env";
import { ApiMethod  } from "../Constants/api";
import axios from "axios";

const enqueueApiCall = async (method, url) => {
    return await axiosRequest(method, url)
  }

  const cacheMap = new Map();
 const axiosRequest = async (method, url) => {
  if (method === ApiMethod.Get) {
    if (cacheMap.has(url)) {
      return cacheMap.get(url)
    }
  }
  let axiosInstance = axios.create({
    baseURL: env.punkiApi.baseUrl
  })
 const returnData = axiosInstance(url);
  if (method === ApiMethod.Get) {
    if (!cacheMap.has(url)) {
      cacheMap.set(url, returnData);
    }
  }
  return returnData
}
  export default enqueueApiCall;