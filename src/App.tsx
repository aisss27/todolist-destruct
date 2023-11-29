import React, { useState } from 'react';
import './App.css';
import TodoList, { TaskType } from './TodoList';
import {v1} from 'uuid'

//CRUD:
//create +
//read +
//update
//delete +




function App() {
    //BLL:
    const todoListTitle = "What to learn"
    
    const [tasks, setTasks] = useState<Array<TaskType>>([ // initial  state
        { id: v1(), title: "HTML", isDone: true },
        { id: v1(), title: "JS/ES6", isDone: false },
        { id: v1(), title: "REACT", isDone: false },
    ])

    //delete task
    const removeTask = (taskId: string) => {
        setTasks(tasks.filter(t => t.id !== taskId))
    }
    //create task
    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        const nextState: Array<TaskType> = [newTask, ...tasks]
        setTasks(nextState)
    }
    // update task (isDone)
    const changeTaskStatus = (taskId: string, isDone: boolean) => {
        setTasks(tasks.map(t => t.id === taskId ? {...t, isDone } : t))
    }
    // update task (title)

    
    //UI:
    return (
        <div className="App">
            <TodoList 
                title={todoListTitle} 
                tasks={tasks}
                removeTask={removeTask}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
            />
        </div>
    );
}

export default App;
