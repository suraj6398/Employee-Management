import { useContext, useState } from 'react'
import { AuthContext } from '../../Context/AuthProvider'
import AcceptTask from './AcceptTask'
import NewTask from './NewTask'
import CompleteTask from './CompleteTask'
import FailedTask from './FailedTask'

const TaskList = ({ data }) => {
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [userData, setUserData] = useContext(AuthContext)

  if (!data || !data.tasks) return null

  const updateUserData = (taskIndex, newStatus) => {
    const updatedUserData = userData.map((user) => {
      if (user.id === data.id) {
        const oldTask = user.tasks[taskIndex]

        const updatedTasks = user.tasks.map((task, index) => {
          if (index === taskIndex) {
            return {
              ...task,
              newTask: newStatus === 'new',
              active: newStatus === 'active',
              completed: newStatus === 'completed',
              failed: newStatus === 'failed',
            }
          }
          return task
        })

        return {
          ...user,
          tasks: updatedTasks,
          taskCounts: {
            newTask:
              user.taskCounts.newTask -
              (oldTask.newTask ? 1 : 0) +
              (newStatus === 'new' ? 1 : 0),
            active:
              user.taskCounts.active -
              (oldTask.active ? 1 : 0) +
              (newStatus === 'active' ? 1 : 0),
            completed:
              user.taskCounts.completed -
              (oldTask.completed ? 1 : 0) +
              (newStatus === 'completed' ? 1 : 0),
            failed:
              user.taskCounts.failed -
              (oldTask.failed ? 1 : 0) +
              (newStatus === 'failed' ? 1 : 0),
          },
        }
      }

      return user
    })

    setUserData(updatedUserData)
    localStorage.setItem('employees', JSON.stringify(updatedUserData))

    const updatedEmployee = updatedUserData.find((user) => user.id === data.id)

    localStorage.setItem(
      'loggedInUser',
      JSON.stringify({ role: 'employee', data: updatedEmployee })
    )
  }

  const handleDeleteTask = (taskIndex) => {
    const updatedUserData = userData.map((user) => {
      if (user.id === data.id) {
        const taskToDelete = user.tasks[taskIndex]

        const updatedTasks = user.tasks.filter(
          (_, index) => index !== taskIndex
        )

        return {
          ...user,
          tasks: updatedTasks,
          taskCounts: {
            newTask:
              user.taskCounts.newTask - (taskToDelete.newTask ? 1 : 0),
            active:
              user.taskCounts.active - (taskToDelete.active ? 1 : 0),
            completed:
              user.taskCounts.completed - (taskToDelete.completed ? 1 : 0),
            failed:
              user.taskCounts.failed - (taskToDelete.failed ? 1 : 0),
          },
        }
      }

      return user
    })

    setUserData(updatedUserData)
    localStorage.setItem('employees', JSON.stringify(updatedUserData))

    const updatedEmployee = updatedUserData.find((user) => user.id === data.id)

    localStorage.setItem(
      'loggedInUser',
      JSON.stringify({ role: 'employee', data: updatedEmployee })
    )
  }

  const filteredTasks = data.tasks
    .map((task, index) => ({ ...task, originalIndex: index }))
    .filter((task) => {
      const matchesSearch = task.taskTitle
        .toLowerCase()
        .includes(search.toLowerCase())

      const matchesFilter =
        filter === 'all' ||
        (filter === 'new' && task.newTask) ||
        (filter === 'active' && task.active) ||
        (filter === 'completed' && task.completed) ||
        (filter === 'failed' && task.failed)

      return matchesSearch && matchesFilter
    })

  return (
    <>
      <div className='flex justify-between items-center mt-5'>
        <input
          type='text'
          placeholder='Search Task...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='bg-[#1c1c1c] border border-gray-500 px-3 py-2 rounded text-white w-1/3 outline-none'
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className='bg-[#1c1c1c] border border-gray-500 px-3 py-2 rounded text-white outline-none'
        >
          <option value='all'>All Tasks</option>
          <option value='new'>New Tasks</option>
          <option value='active'>Active Tasks</option>
          <option value='completed'>Completed Tasks</option>
          <option value='failed'>Failed Tasks</option>
        </select>
      </div>

      <div
        id='tasklist'
        className='h-[50%] overflow-x-auto flex items-center justify-start gap-5 flex-nowrap w-full py-1 mt-6'
      >
        {filteredTasks.length > 0 ? (
          filteredTasks.map((elem) => {
            if (elem.newTask) {
              return (
                <NewTask
                  key={elem.originalIndex}
                  data={elem}
                  onDelete={() => handleDeleteTask(elem.originalIndex)}
                  onAccept={() =>
                    updateUserData(elem.originalIndex, 'active')
                  }
                />
              )
            }

            if (elem.active) {
              return (
                <AcceptTask
                  key={elem.originalIndex}
                  data={elem}
                  onDelete={() => handleDeleteTask(elem.originalIndex)}
                  onComplete={() =>
                    updateUserData(elem.originalIndex, 'completed')
                  }
                  onFailed={() =>
                    updateUserData(elem.originalIndex, 'failed')
                  }
                />
              )
            }

            if (elem.completed) {
              return (
                <CompleteTask
                  key={elem.originalIndex}
                  data={elem}
                  onDelete={() => handleDeleteTask(elem.originalIndex)}
                />
              )
            }

            if (elem.failed) {
              return (
                <FailedTask
                  key={elem.originalIndex}
                  data={elem}
                  onDelete={() => handleDeleteTask(elem.originalIndex)}
                />
              )
            }

            return null
          })
        ) : (
          <h2 className='text-xl text-gray-400'>No Tasks Found</h2>
        )}
      </div>
    </>
  )
}

export default TaskList