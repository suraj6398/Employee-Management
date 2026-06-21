import { useContext, useState } from 'react'
import Login from './components/Auth/Login'
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard'
import AdminDashboard from './components/Dashboard/AdminDashboard'
import { AuthContext } from './Context/AuthProvider'

const _storedLoggedInUser = localStorage.getItem('loggedInUser')
const loggedInUser = _storedLoggedInUser ? JSON.parse(_storedLoggedInUser) : null

const App = () => {
  const [user, setUser] = useState(loggedInUser?.role || null)
  const [loggedInUserData, setLoggedInUserData] = useState(loggedInUser?.data || null)

  const [userData] = useContext(AuthContext)

  const handleLogin = (email, password) => {
    if (email === 'admin@example.com' && password === '123') {
      setUser('admin')
      localStorage.setItem('loggedInUser', JSON.stringify({ role: 'admin' }))
      return
    }

    const employee = userData?.find(
      (e) => email === e.email && password === e.password
    )

    if (employee) {
      setUser('employee')
      setLoggedInUserData(employee)
      localStorage.setItem(
        'loggedInUser',
        JSON.stringify({ role: 'employee', data: employee })
      )
    } else {
      alert('Invalid Credentials')
    }
  }

  return (
    <>
      {!user && <Login handleLogin={handleLogin} />}
      {user === 'admin' && <AdminDashboard changeUser={setUser} />}
      {user === 'employee' && (
        <EmployeeDashboard changeUser={setUser} data={loggedInUserData} />
      )}
    </>
  )
}

export default App