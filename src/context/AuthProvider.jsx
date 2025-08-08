import { useState, useEffect } from 'react'
import { getMe } from '../services/api/user.api.js'
import { AuthContext } from './AuthContext.jsx'

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getMe()
        setCurrentUser(user)
      } catch (err) {
        console.log(err)
        setCurrentUser(null)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, loading }}>
      {children}
    </AuthContext.Provider>
  )
}