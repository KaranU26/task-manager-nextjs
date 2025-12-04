import { TaskItemProps } from './../types'

export default function TaskItem (props: TaskItemProps) {
    return(
        <li 
            className={`flex items-center justify-between p-4 rounded-lg border ${
                props.task.completed ? 'bg-green-900/30 border-green-700' : 'bg-gray-700 border-gray-600'}`}
            >
            <div className="flex items-center gap-3">
                <input 
                type="checkbox" 
                checked={props.task.completed} 
                onChange={() => props.toggleTask(props.task.id)}
                className="w-5 h-5 rounded border-gray-500 bg-gray-600 text-blue-500 focus:ring-blue-500"
                />
                <div>
                {props.task.id == props.editingTaskId ? 
                    <input 
                    type="text" 
                    placeholder="Task Title" 
                    value={props.taskTitle} 
                    onChange={props.handleChange}
                    className="bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    :
                    <h3 className={`font-medium ${props.task.completed ? 'line-through text-gray-500' : 'text-white'}`}>
                    {props.task.title}
                    </h3>
                }
                {props.task.id == props.editingTaskId ? 
                    <input 
                    type="text" 
                    placeholder="Task Description" 
                    value={props.taskDesc} 
                    onChange={props.handleDescChange}
                    className="bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    :
                    <p className={`text-sm ${props.task.completed ? 'text-gray-600' : 'text-gray-400'}`}>
                    {props.task.description}
                    </p>
                }
                </div>
            </div>
            {props.task.id == props.editingTaskId ? 
                <button
                onClick={() => props.saveTask(props.task.id)}
                className="bg-green-300 text-white px-3 py-1 rounded-md hover:bg-red-700 transition-colors text-sm"
                >
                Save
                </button>
            :
                <button
                onClick={() => props.editTask(props.task.id)}
                className="bg-green-300 text-white px-3 py-1 rounded-md hover:bg-red-700 transition-colors text-sm"
                >
                Edit
                </button>
            }
            <button 
                onClick={() => props.deleteTask(props.task.id)}
                className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition-colors text-sm"
            >
                Delete
            </button>
        </li>
    )
}