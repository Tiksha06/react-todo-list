import { useState } from 'react'

function App() {
  // 1. State to track what the user is typing in the input field
  const [taskInput, setTaskInput] = useState('')

  // 2. State to store the list of tasks
  const [tasks, setTasks] = useState([])

  // 3. Function to handle adding a new task
  const handleAddTask = () => {
    // The .trim() function takes a string and removes all the blank spaces from the beginning and the end of it.
    if (taskInput.trim() === '') return // Don't add empty tasks
    setTasks([...tasks, { text: taskInput, completed: false}]) //add new task to array
    setTaskInput('') // Clear the input field after adding a task
  }

  // 4. 🆕 Function to delete a task using its index number
  const handleDeleteTask = (indexToDelete) => {
    // Filter keeps every task EXCEPT the one matching the clicked index
    const updatedTasks = tasks.filter((_, index) => index !== indexToDelete)
    setTasks(updatedTasks)
  }

  // 5. Function to handle toggling the completion status of a task
  const handleToggleComplete = (indexToToggle) => {
    const updatedTasks = tasks.map((task,index) => {
      if ( index === indexToToggle) {
        return { ...task, completed: !task.completed } // Toggle the completed status
      }
      return task // Return unchanged tasks
    })
    setTasks(updatedTasks) // Update the tasks state with the toggled completion status
  }


  return (
    <div style = {{padding: '40px', textAlign: 'center', margin: '0 auto', maxWidth: '400px', fontFamily: 'sans-serif' }}>
      <h1>📝 My Todo List</h1>
      <p style= {{color: '#666'}}>Getting back into the consistency groove!</p>
      {/************ INPUT SECTION *************/}
      <div style = {{marginTop: '20px', marginBottom: '20px'}}>
        <input
          type="text"
          placeholder="Add a new task..."
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          style = {{padding: '10px', width: '200px', marginRight: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <button 
          onClick = {handleAddTask}
          style = {{padding: '10px 20px', backgroundColor: '#219f45ff', fontWeight: 'bold', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer'}}
          >
            ADD TASK
          </button>
      </div>
      {/************ TASK LIST DISPLAY*************/}
      <ul style = {{padding: 0, listStyleType: 'none', textAlign: 'left'}}>
        {tasks.map((task, index) => (
          <li key = {index}
          style = {{padding: '12px', backgroundColor: '#f6f8fa', marginBottom: '8px', borderRadius: '4px', border: '1px solid #e1e4e8', display: 'flex', justifyContent: 'space-between', textDecoration: task.completed ? 'line-through' : 'none', color : task.completed ? '#888' : '#000'}}
          >
            <input 
            type = "checkbox"
            checked = {task.completed}
            onChange={() => handleToggleComplete(index)}
            style = {{cursor: 'pointer', marginRight: '10px'}}
            />
            {task.text}
            {/******** 🆕 Delete Button *********/}
            <button 
            onClick = {() => handleDeleteTask(index)}
            style = {{backgroundColor: '#cb2431', color: '#fff', border: 'none', borderRadius: '4px', padding: '5px 10px', cursor: 'pointer' }}>
              DELETE
            </button>
            </li>
        ))}
      </ul>
    </div>
 )
}

export default App
