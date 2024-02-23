import axios from 'axios';
import getConfig from 'next/config';

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})
const axiosServer = axios.create({
  baseURL: process.env.SERVER_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export {axiosClient, axiosServer};