import api from './http'
import TokenService from './token.service'

const register = (email: string, password: string) => {
  return api.post('/auth/register', {
    email,
    password,
  })
}

const login = (email: string, password: string) => {
  return api
    .post('/auth/login', {
      email,
      password,
    })
    .then((response) => {
      if (response.data.session) {
        TokenService.setUser(response.data)
      }

      return response.data
    })
}

const protectedRoute = () => api.get('/auth/protected').then((res) => res.data)

const logout = () => {
  TokenService.removeUser()
}

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user') || '')
}

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  protectedRoute,
}

export default AuthService
