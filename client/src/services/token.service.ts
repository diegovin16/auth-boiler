const getLocalRefreshToken = () => {
  const user = JSON.parse(localStorage?.getItem('user') || '')
  return user?.refreshToken
}

const getLocalAccessToken = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  return user?.accessToken
}

const updateLocalAccessToken = (token: string) => {
  let user = JSON.parse(localStorage.getItem('user') || '')
  user.accessToken = token
  localStorage.setItem('user', JSON.stringify(user))
}

const getUser = () => {
  return JSON.parse(localStorage.getItem('user') || '')
}

const setUser = (data: any) => {
  const { session, user } = data
  localStorage.setItem('user', JSON.stringify(user))
  localStorage.setItem('access_token', JSON.stringify(session['access_token']))
}

const removeUser = () => {
  localStorage.removeItem('user')
}

const TokenService = {
  getLocalRefreshToken,
  getLocalAccessToken,
  updateLocalAccessToken,
  getUser,
  setUser,
  removeUser,
}

export default TokenService
