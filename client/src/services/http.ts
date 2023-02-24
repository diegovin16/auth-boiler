import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

instance.interceptors.request.use(
  (config) => config,
  (error) => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalConfig = err.config

    if (originalConfig?.url !== '/auth/refreshToken' && err.response) {
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true

        try {
          await instance.get('/auth/refreshToken')

          return instance(originalConfig)
        } catch (_error) {
          window.location.replace(process.env.NEXT_PUBLIC_BASE_URL as string)
          return Promise.reject(_error)
        }
      }
    }

    return Promise.reject(err)
  }
)

export default instance
