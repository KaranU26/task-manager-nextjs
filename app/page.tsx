"use client"
import { useState, useEffect } from "react";
import { Task } from './types'
import TaskItem from "./components/TaskItem";

export default function Home() {
  const [tasks, setTask] = useState<Task[]>([])
  const [taskTitle, setTaskTitle] = useState('')
  const [taskDesc, setTaskDesc] = useState('')
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [isAdding, setIsAdding] = useState(false)
  
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
    // Optimistic update with animation
    setTask(tasks.filter(task => task.id !== id))
    
    await fetch(`/api/tasks/${id}`, {
      method: 'DELETE',
    })
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(event.target.value)
  };

  const handleDescChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskDesc(event.target.value)
  };

  const addTask = async () => {
    if (!taskTitle.trim()) return
    
    setIsAdding(true)
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
    setIsAdding(false)
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
      setIsLoading(true)
      const response = await fetch('/api/tasks')
      
      if (!response.ok) {
        setIsLoggedIn(false)
        setIsLoading(false)
        return
      }
      
      setIsLoggedIn(true)
      const data = await response.json()
      setTask(data)
      setIsLoading(false)
    }
    fetchTasks()
  }, [])

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-400 font-medium">Loading your tasks...</p>
        </div>
      </div>
    )
  }

  // Not logged in state
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center animate-pulse-glow">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-white mb-3">Welcome to TaskFlow</h2>
          <p className="text-gray-400 mb-8">Sign in with GitHub to start managing your tasks beautifully.</p>
          <div className="flex justify-center gap-4">
            <div className="flex items-center gap-2 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Create tasks</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Track progress</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Stay organized</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const completedCount = tasks.filter(t => t.completed).length
  const totalCount = tasks.length
  const progressPercent = totalCount > 0 ? (completedCount / totalCount) * 100 : 0

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto">
        
        {/* Progress Section */}
        {totalCount > 0 && (
          <div className="glass rounded-2xl p-6 mb-6 border border-gray-700/50 animate-fade-in">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-gray-300 font-medium">Your Progress</h3>
              <span className="text-sm text-gray-400">{completedCount} of {totalCount} completed</span>
            </div>
            <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}
        
        {/* Add Task Form */}
        <div className="glass rounded-2xl p-6 mb-6 border border-gray-700/50 animate-fade-in">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add New Task
          </h2>
          <div className="flex flex-col gap-3">
            <input 
              type="text" 
              placeholder="What needs to be done?" 
              value={taskTitle} 
              onChange={handleChange}
              onKeyDown={(e) => e.key === 'Enter' && addTask()}
              className="bg-gray-800/50 border border-gray-600/50 text-white placeholder-gray-500 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all-smooth"
            />
            <input 
              type="text" 
              placeholder="Add a description (optional)" 
              value={taskDesc} 
              onChange={handleDescChange}
              onKeyDown={(e) => e.key === 'Enter' && addTask()}
              className="bg-gray-800/50 border border-gray-600/50 text-white placeholder-gray-500 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all-smooth"
            />
            <button 
              onClick={() => addTask()}
              disabled={!taskTitle.trim() || isAdding}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-xl font-medium hover:from-blue-500 hover:to-purple-500 transition-all-smooth transform hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-none flex items-center justify-center gap-2"
            >
              {isAdding ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Adding...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Task
                </>
              )}
            </button>
          </div>
        </div>

        {/* Task List */}
        <div className="glass rounded-2xl p-6 border border-gray-700/50 animate-fade-in">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Your Tasks
            {totalCount > 0 && (
              <span className="ml-auto text-sm font-normal text-gray-400 bg-gray-700/50 px-2 py-1 rounded-lg">
                {totalCount} task{totalCount !== 1 ? 's' : ''}
              </span>
            )}
          </h2>
          
          {tasks.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gray-700/50 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <p className="text-gray-400 font-medium">No tasks yet</p>
              <p className="text-gray-500 text-sm mt-1">Add your first task above to get started!</p>
            </div>
          ) : (
            <ul className="space-y-3">
              {tasks.map((task, index) => (
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
                  index={index}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
