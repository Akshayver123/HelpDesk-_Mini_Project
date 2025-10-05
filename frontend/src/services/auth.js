import { apiPost } from './api.js'

export function getToken(){
  return localStorage.getItem('token')
}

export function logout(){
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}

export async function login(email, password){
  const { token, user } = await apiPost('/api/auth/login', { email, password })
  localStorage.setItem('token', token)
  localStorage.setItem('user', JSON.stringify(user))
  return user
}

export async function register(name, email, password){
  const { token, user } = await apiPost('/api/auth/register', { name, email, password })
  localStorage.setItem('token', token)
  localStorage.setItem('user', JSON.stringify(user))
  return user
}
