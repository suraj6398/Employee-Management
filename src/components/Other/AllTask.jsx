import { useContext, useState } from 'react'
import { AuthContext } from '../../Context/AuthProvider'

const AllTask = () => {
  const [userData] = useContext(AuthContext)
  const [search, setSearch] = useState('')

  if (!userData) return <div>Loading...</div>

  const filteredUsers = userData.filter((elem) =>
    elem.firstName.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className='bg-[#1c1c1c] p-5 rounded mt-5'>
      <input
        type='text'
        placeholder='Search employee...'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className='w-full mb-4 px-4 py-2 rounded bg-transparent border border-gray-500 outline-none text-white'
      />

      <div className='bg-red-400 mb-2 py-2 px-4 flex justify-between rounded'>
        <h2 className='text-lg font-medium w-1/5'>Employee Name</h2>
        <h3 className='text-lg font-medium w-1/5'>New Task</h3>
        <h5 className='text-lg font-medium w-1/5'>Active Task</h5>
        <h5 className='text-lg font-medium w-1/5'>Completed</h5>
        <h5 className='text-lg font-medium w-1/5'>Failed</h5>
      </div>

      <div>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((elem) => {
            const hasAssignedTask = elem.tasks && elem.tasks.length > 0

            return (
              <div
                key={elem.id}
                className={`mb-2 py-2 px-4 flex justify-between items-center rounded border-2 ${
                  hasAssignedTask
                    ? 'border-yellow-400 bg-yellow-400/10'
                    : 'border-emerald-500'
                }`}
              >
                <h2 className='text-lg font-medium w-1/5'>
                  {elem.firstName}

                  {hasAssignedTask && (
                    <span className='ml-2 text-xs bg-yellow-500 text-black px-2 py-1 rounded'>
                      Task Assigned
                    </span>
                  )}
                </h2>

                <h3 className='text-lg font-medium w-1/5 text-blue-400'>
                  {elem.taskCounts.newTask}
                </h3>

                <h5 className='text-lg font-medium w-1/5 text-yellow-400'>
                  {elem.taskCounts.active}
                </h5>

                <h5 className='text-lg font-medium w-1/5 text-white'>
                  {elem.taskCounts.completed}
                </h5>

                <h5 className='text-lg font-medium w-1/5 text-red-600'>
                  {elem.taskCounts.failed}
                </h5>
              </div>
            )
          })
        ) : (
          <p className='text-gray-400 text-center mt-4'>No employee found</p>
        )}
      </div>
    </div>
  )
}

export default AllTask