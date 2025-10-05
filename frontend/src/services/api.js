const base = '' // via Vite proxy to backend

function withAuthHeaders(options = {}){
  const token = localStorage.getItem('token')
  const headers = { 'Content-Type': 'application/json', ...(options.headers||{}) }
  if (token) headers['Authorization'] = `Bearer ${token}`
  return { ...options, headers }
}

export async function apiGet(path){
  const res = await fetch(base + path, withAuthHeaders())
  if (!res.ok) throw new Error('API error')
  return res.json()
}

export async function apiPost(path, body){
  const res = await fetch(base + path, withAuthHeaders({ method: 'POST', body: JSON.stringify(body) }))
  if (!res.ok) throw new Error('API error')
  return res.json()
}

export async function apiPut(path, body){
  const res = await fetch(base + path, withAuthHeaders({ method: 'PUT', body: JSON.stringify(body) }))
  if (!res.ok) throw new Error('API error')
  return res.json()
}

export async function apiDelete(path){
  const res = await fetch(base + path, withAuthHeaders({ method: 'DELETE' }))
  if (!res.ok) throw new Error('API error')
  return res.json()
}
