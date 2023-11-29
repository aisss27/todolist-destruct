import React, { ChangeEvent, FC, useState, KeyboardEvent } from 'react';
import Button from './Button';
import TasksList from './TasksList';

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const TodoList: FC<TodoListPropsType> = (
    {
        title,
        tasks,
        removeTask,
        addTask,
        changeTaskStatus
    }) => {

    const [newTaskTitle, setTitle] = useState("")
    const [inputError, setInputError] = useState(false)
    const [isCollapsedTodo, setIsCollapsedTodo] = useState(false)
    const maxTitleLengthError = newTaskTitle.length >= 15
    const onClickAddTask = () => {
        const trimmedTitle = newTaskTitle.trim()
        if (trimmedTitle) {
            addTask(trimmedTitle)
            setIsCollapsedTodo(false)
        } else {
            setInputError(true)
        }
        setTitle("")
    }
    const onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === "Enter"
            && Boolean(newTaskTitle)
            && newTaskTitle.length < 15
            && onClickAddTask()
    }
    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        inputError && setInputError(false)
        if (e.currentTarget.value.length <= 15) {
            setTitle(e.currentTarget.value)
        }
    }

    const tasksList = <TasksList
            tasks={tasks}
            removeTask={removeTask}
            changeTaskStatus={changeTaskStatus}
        />

    return (
        <div className="todoList">
            <h3>{title}</h3>
            <div className="tasksList-info">
                <div>
                    <button
                        onClick={() => setIsCollapsedTodo(!isCollapsedTodo)}
                    >{isCollapsedTodo ? "show" : "hide"}</button>
                </div>
                All tasks:<div className="info">{tasks.length}</div>
            </div>
            <div>
                <input
                    value={newTaskTitle}
                    onChange={onChangeSetTitle}
                    onKeyDown={onKeyDownAddTask}
                    className={inputError ? "inputError" : ""}
                />
                <Button
                    name="+"
                    onClickHandler={onClickAddTask}
                    disabled={!newTaskTitle || maxTitleLengthError}
                />
                {maxTitleLengthError && <div style={{ color: "red" }}>Your tasktitle is too long</div>}
                {inputError && <div style={{ color: "red" }}>Please, enter correct title</div>}
            </div>
            {isCollapsedTodo ? null : tasksList}
        </div>
    )
}

export default TodoList;