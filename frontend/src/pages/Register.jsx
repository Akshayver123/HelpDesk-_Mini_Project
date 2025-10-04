import { useState } from 'react'
import { register as doRegister } from '../services/auth.js'
import { useNavigate, Link } from 'react-router-dom'

export default function Register(){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function onSubmit(e){
    e.preventDefault()
    setError('')
    try{
      await doRegister(name, email, password)
      navigate('/')
    }catch(e){
      setError('Could not register')
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-xl font-semibold mb-4">Register</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Name" className="w-full border rounded p-2"/>
        <input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="Email" className="w-full border rounded p-2"/>
        <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Password" className="w-full border rounded p-2"/>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <button className="px-3 py-2 rounded bg-blue-600 text-white w-full">Create account</button>
      </form>
      <div className="text-sm mt-3">Have an account? <Link to="/login" className="text-blue-600">Login</Link></div>
    </div>
  )
}
