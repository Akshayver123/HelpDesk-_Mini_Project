import { useState } from 'react'
import { login } from '../services/auth.js'
import { useNavigate, Link } from 'react-router-dom'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function onSubmit(e){
    e.preventDefault()
    setError('')
    try{
      await login(email, password)
      navigate('/')
    }catch(e){
      setError('Invalid credentials')
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-xl font-semibold mb-4">Login</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="Email" className="w-full border rounded p-2"/>
        <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Password" className="w-full border rounded p-2"/>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <button className="px-3 py-2 rounded bg-blue-600 text-white w-full">Login</button>
      </form>
      <div className="text-sm mt-3">No account? <Link to="/register" className="text-blue-600">Register</Link></div>
    </div>
  )
}
