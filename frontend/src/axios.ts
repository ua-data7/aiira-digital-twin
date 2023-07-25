import axios from 'axios';

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

const axiosServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export {axiosClient, axiosServer};