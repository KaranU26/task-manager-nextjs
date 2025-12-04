"use client"
import { useState, useEffect } from "react";
import { Task } from './types'
import TaskItem from "./components/TaskItem";

export default function Home() {

  const [tasks, setTask] = useState<Task[]>([])

  const [taskTitle, setTaskTitle] = useState('')
  const [taskDesc, setTaskDesc] = useState('')
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null)
  
  const toggleTask = async (id: number) => {
    const taskToToggle = tasks.find((task => task.id === id))

    const response = await fetch(`/api/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        completed: !taskToToggle?.completed
      }),
    })

    const updatedTask = await response.json()
    const newTasks = tasks.map(task => 
      task.id === id ? updatedTask : task
    )
    setTask(newTasks)
  }

  const deleteTask = async (id: number) => {
    await fetch(`/api/tasks/${id}`, {
      method: 'DELETE',
    })
    const newTasks = tasks.filter(task => task.id != id)
    setTask(newTasks)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(event.target.value)
  };

  const handleDescChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskDesc(event.target.value)
  };

const addTask = async () => {
  const response = await fetch('/api/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: taskTitle,
      description: taskDesc,
    }),
  })
  
  const newTask = await response.json()
  
  setTask([...tasks, newTask])
  
  setTaskTitle('')
  setTaskDesc('')
}

  const editTask = (id: number) => {
    const taskToEdit = tasks.find(task => task.id === id)
    setEditingTaskId(id)
    setTaskTitle(taskToEdit?.title || '')
    setTaskDesc(taskToEdit?.description || '')
  }
  
  const saveTask = async (id: number) => {
    const response = await fetch(`/api/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: taskTitle,
        description: taskDesc,
      }),
    })

    const updatedTask = await response.json()
    const newTasks = tasks.map(task => 
      task.id === id ? updatedTask : task
    )
    setTask(newTasks)
    setEditingTaskId(null)
    setTaskTitle('')
    setTaskDesc('')
  }


  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch('/api/tasks')
      const data = await response.json()
      setTask(data)
    }
    fetchTasks()
  }, [])

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">Task Manager</h1>
        
        {/* Add Task Form */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-gray-200 mb-4">Add New Task</h2>
          <div className="flex flex-col gap-3">
            <input 
              type="text" 
              placeholder="Task Title" 
              value={taskTitle} 
              onChange={handleChange}
              className="bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input 
              type="text" 
              placeholder="Task Description" 
              value={taskDesc} 
              onChange={handleDescChange}
              className="bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              onClick={() => addTask()}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium"
            >
              Add Task
            </button>
          </div>
        </div>

        {/* Task List */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-gray-200 mb-4">Your Tasks</h2>
          <ul className="space-y-3">
            {tasks.map((task) => (
              <TaskItem 
                key={task.id}
                task={task}
                toggleTask={toggleTask}
                deleteTask={deleteTask}
                editTask={editTask}
                saveTask={saveTask}
                editingTaskId={editingTaskId}
                taskTitle={taskTitle}
                taskDesc={taskDesc}
                handleChange={handleChange}
                handleDescChange={handleDescChange}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
