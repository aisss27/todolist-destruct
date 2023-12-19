import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    filter: FilterValuesType
    updateTask: (todolistID: string, taskID: string, newTitle: string) => void
    updateTodolist:(todolistID: string,  newTitle: string) => void
}

export function Todolist(props: PropsType) {
    const removeTodolist = () => props.removeTodolist(props.id)
    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);

    const addTaskHandler = (title: string) => {
        props.addTask(title, props.id)
    }

    const updateTaskHandler = (taskID: string, newTitle: string) => {
        props.updateTask(props.id, taskID, newTitle)
    }

    const updateTodolistHandler=(newTitle:string)=>{
        props.updateTodolist(props.id,newTitle)
    }

    return <div>
        <h3>
            <EditableSpan oldTitle={props.title} callBack={updateTodolistHandler}/>
            {/*<button onClick={removeTodolist}>x</button>*/}
            <IconButton aria-label="delete" onClick={removeTodolist}>
                <DeleteIcon />
            </IconButton>
        </h3>
        <AddItemForm callBack={addTaskHandler}/>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(t.id, newIsDoneValue, props.id);
                    }
                    // const updateTaskHandler=(newTitle:string)=>{
                    //     props.updateTask(props.id,t.id,newTitle)
                    // }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Checkbox onChange={onChangeHandler} checked={t.isDone}  />
                        <EditableSpan oldTitle={t.title} callBack={(newTitle) => updateTaskHandler(t.id, newTitle)}/>
                        <IconButton aria-label="delete" onClick={onClickHandler}>
                            <DeleteIcon />
                        </IconButton>
                    </li>
                })
            }
        </ul>
        <div>
            <Button onClick={onAllClickHandler} variant={props.filter === 'all' ? "outlined" :"contained"} color="success">
                All
            </Button>
            <Button onClick={onActiveClickHandler} variant={props.filter === 'active' ? "outlined" :"contained"} color="error">
                Active
            </Button>
            <Button onClick={onCompletedClickHandler}
                    variant={props.filter === 'completed' ? "outlined" :"contained"}
                    color="primary">
                Completed
            </Button>
        </div>
    </div>
}


