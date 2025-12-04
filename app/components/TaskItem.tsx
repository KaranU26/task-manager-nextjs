import { TaskItemProps } from './../types'

interface ExtendedTaskItemProps extends TaskItemProps {
  index?: number
}

export default function TaskItem(props: ExtendedTaskItemProps) {
  const { task, toggleTask, deleteTask, editTask, saveTask, editingTaskId, taskTitle, taskDesc, handleChange, handleDescChange, index = 0 } = props
  const isEditing = task.id === editingTaskId
  
  return (
    <li 
      className={`group flex items-center justify-between p-4 rounded-xl border transition-all-smooth animate-slide-in hover:scale-[1.01] ${
        task.completed 
          ? 'bg-green-900/20 border-green-700/50 hover:border-green-600/50' 
          : 'bg-gray-800/50 border-gray-600/50 hover:border-gray-500/50'
      }`}
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="flex items-center gap-4 flex-1">
        {/* Custom Checkbox */}
        <button 
          onClick={() => toggleTask(task.id)}
          className={`relative w-6 h-6 rounded-lg border-2 transition-all-smooth flex items-center justify-center ${
            task.completed 
              ? 'bg-gradient-to-br from-green-500 to-emerald-600 border-green-500' 
              : 'border-gray-500 hover:border-blue-500 bg-transparent'
          }`}
        >
          {task.completed && (
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 text-white animate-checkmark" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>
        
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="flex flex-col gap-2">
              <input 
                type="text" 
                placeholder="Task Title" 
                value={taskTitle} 
                onChange={handleChange}
                className="bg-gray-700/50 border border-gray-600/50 text-white placeholder-gray-500 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all-smooth"
                autoFocus
              />
              <input 
                type="text" 
                placeholder="Task Description" 
                value={taskDesc} 
                onChange={handleDescChange}
                className="bg-gray-700/50 border border-gray-600/50 text-white placeholder-gray-500 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all-smooth"
              />
            </div>
          ) : (
            <>
              <h3 className={`font-medium truncate transition-all-smooth ${
                task.completed 
                  ? 'line-through text-gray-500' 
                  : 'text-white'
              }`}>
                {task.title}
              </h3>
              {task.description && (
                <p className={`text-sm truncate transition-all-smooth ${
                  task.completed ? 'text-gray-600' : 'text-gray-400'
                }`}>
                  {task.description}
                </p>
              )}
            </>
          )}
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex items-center gap-2 ml-4">
        {isEditing ? (
          <>
            <button
              onClick={() => saveTask(task.id)}
              className="p-2 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-all-smooth"
              title="Save"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </button>
            <button
              onClick={() => {
                props.editTask(-1) // Cancel editing by setting invalid ID
              }}
              className="p-2 rounded-lg bg-gray-500/20 text-gray-400 hover:bg-gray-500/30 transition-all-smooth"
              title="Cancel"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => editTask(task.id)}
              className="p-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 opacity-0 group-hover:opacity-100 transition-all-smooth"
              title="Edit"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button 
              onClick={() => deleteTask(task.id)}
              className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 opacity-0 group-hover:opacity-100 transition-all-smooth"
              title="Delete"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </>
        )}
      </div>
    </li>
  )
}