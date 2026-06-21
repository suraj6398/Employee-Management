const employees = [
  { id: 1, firstName: 'Arjun', email: 'e@e.com', password: '123' },
  { id: 2, firstName: 'Sneha', email: 'employee2@example.com', password: '123' },
  { id: 3, firstName: 'Ravi', email: 'employee3@example.com', password: '123' },
  { id: 4, firstName: 'Priya', email: 'employee4@example.com', password: '123' },
  { id: 5, firstName: 'Karan', email: 'employee5@example.com', password: '123' },
  { id: 6, firstName: 'Aman', email: 'employee6@example.com', password: '123' },
  { id: 7, firstName: 'Neha', email: 'employee7@example.com', password: '123' },
  { id: 8, firstName: 'Rohan', email: 'employee8@example.com', password: '123' },
  { id: 9, firstName: 'Pooja', email: 'employee9@example.com', password: '123' },
  { id: 10, firstName: 'Rahul', email: 'employee10@example.com', password: '123' },
  { id: 11, firstName: 'Anjali', email: 'employee11@example.com', password: '123' },
  { id: 12, firstName: 'Vikram', email: 'employee12@example.com', password: '123' },
  { id: 13, firstName: 'Kavya', email: 'employee13@example.com', password: '123' },
  { id: 14, firstName: 'Mohit', email: 'employee14@example.com', password: '123' },
  { id: 15, firstName: 'Simran', email: 'employee15@example.com', password: '123' },
  { id: 16, firstName: 'Yash', email: 'employee16@example.com', password: '123' },
  { id: 17, firstName: 'Nitin', email: 'employee17@example.com', password: '123' },
  { id: 18, firstName: 'Meera', email: 'employee18@example.com', password: '123' },
  { id: 19, firstName: 'Deepak', email: 'employee19@example.com', password: '123' },
  { id: 20, firstName: 'Sakshi', email: 'employee20@example.com', password: '123' },
]

const employeesWithZeroTasks = employees.map((employee) => ({
  ...employee,
  taskCounts: {
    active: 0,
    newTask: 0,
    completed: 0,
    failed: 0,
  },
  tasks: [],
}))

const admin = [
  {
    id: 1,
    email: 'admin@example.com',
    password: '123',
  },
]

export const setLocalStorage = () => {
  localStorage.setItem('employees', JSON.stringify(employeesWithZeroTasks))
  localStorage.setItem('admin', JSON.stringify(admin))
}

export const getLocalStorage = () => {
  const employees = JSON.parse(localStorage.getItem('employees'))
  const admin = JSON.parse(localStorage.getItem('admin'))

  return { employees, admin }
}