import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/FakeAuthContext'
import { useEffect } from 'react'

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth()
  const nagivate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) nagivate('/', { replace: true })
  }, [isAuthenticated, nagivate])

  return isAuthenticated ? children : null
}
