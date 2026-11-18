import axios from 'axios'

const AxiosInstance = axios.create({

  baseURL: 'http://localhost:3000',

  timeout: 10000,

  headers: {
    'Content-Type': 'application/json'
  }

})

// REQUEST INTERCEPTOR
AxiosInstance.interceptors.request.use(

  (config) => {

    const token =
      localStorage.getItem('token') ||
      sessionStorage.getItem('token')

    if (token) {

      config.headers.Authorization = `Bearer ${token}`

    }

    return config

  },

  (error) => {

    return Promise.reject(error)

  }

)

// RESPONSE INTERCEPTOR
AxiosInstance.interceptors.response.use(

  (response) => {

    console.log('API Response:', response.data)

    return response

  },

  (error) => {

    console.error(
      'API Error:',
      error.response?.data || error.message
    )

    return Promise.reject(error)

  }

)

export default AxiosInstance