import axios from 'axios';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

const axiosClient = axios.create({
  baseURL: publicRuntimeConfig.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

const axiosServer = axios.create({
  baseURL: publicRuntimeConfig.SERVER_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export {axiosClient, axiosServer};