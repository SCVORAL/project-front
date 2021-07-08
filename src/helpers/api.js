import axios from 'axios'
import {storageName} from '../hooks/auth'
import {useHistory} from 'react-router-dom'

export const API_URL = 'http://localhost:5000/api'

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL
})

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem(storageName)}`
  return config
})

export default $api