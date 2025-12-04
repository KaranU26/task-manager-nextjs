import React from "react";

export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

export interface TaskItemProps {
    task: Task
    toggleTask: (id: number) =>void
    deleteTask: (id: number) =>void
    editTask: (id: number) =>void
    saveTask: (id: number) =>void
    editingTaskId: number | null
    taskTitle: string
    taskDesc: string
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    handleDescChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}
