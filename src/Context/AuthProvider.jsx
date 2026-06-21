import { createContext, useState } from 'react'
import { getLocalStorage, setLocalStorage } from '../Utils/localStorage'

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(() => {
    if (!localStorage.getItem('employees')) {
      setLocalStorage()
    }

    const { employees } = getLocalStorage()
    return employees || []
  })

  return (
    <AuthContext.Provider value={[userData, setUserData]}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider