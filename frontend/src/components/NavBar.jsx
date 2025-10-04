import { Link, useNavigate } from 'react-router-dom'
import { getToken, logout } from '../services/auth.js'

export default function NavBar() {
  const navigate = useNavigate()
  const authed = !!getToken()
  return (
    <nav className="bg-white/80 dark:bg-gray-800 sticky top-0 backdrop-blur border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-semibold">HelpDesk Mini</Link>
        <div className="space-x-3">
          {authed ? (
            <button onClick={() => { logout(); navigate('/login') }} className="px-3 py-1.5 rounded bg-gray-900 text-white dark:bg-white dark:text-gray-900">Logout</button>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
