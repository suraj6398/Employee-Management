import { useContext } from 'react'
import { AuthContext } from '../../Context/AuthProvider'
import Header from '../Other/Header'
import TaskListNumbers from '../Other/TaskListNumbers'
import TaskList from '../TaskList/TaskList'

const EmployeeDashboard = (props) => {
  const [userData] = useContext(AuthContext)

  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))

  const updatedEmployee = userData.find(
    (employee) => employee.id === loggedInUser?.data?.id
  )

  return (
    <div className='p-10 bg-[#1C1C1C] h-screen'>
      <Header changeUser={props.changeUser} data={updatedEmployee} />
      <TaskListNumbers data={updatedEmployee} />
      <TaskList data={updatedEmployee} />
    </div>
  )
}

export default EmployeeDashboard