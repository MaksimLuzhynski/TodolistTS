import React, { useEffect, useState } from 'react';
import { Meta } from '@storybook/react';
import { tasksAPI } from '../api/tasks-api';


export default {
    title: 'API/TasksAPI'
} as Meta;

const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "d215560e-a06c-4471-95ae-fec7d89d460b"
    }
}


export const GetTasks: React.VFC<{}> = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "acc38aa0-096d-4d4a-957a-c0ed341cde38"//Id прописываю непосредственно в коде (для удобства), а не через input в storybook
        tasksAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTask: React.VFC<{}> = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>("")
    const [taskId, setTaskId] = useState<string>("")

    const DeleteTaskHandler = () => {
        tasksAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div> {JSON.stringify(state)}
        <div>
            <input
                placeholder="todolistId"
                value={todolistId}
                onChange={(e) => { setTodolistId(e.currentTarget.value) }}>
            </input>
            <input
                placeholder="taskId"
                value={taskId}
                onChange={(e) => { setTaskId(e.currentTarget.value) }}
            ></input>
            <button onClick={DeleteTaskHandler}>Delete Task</button>
        </div>
    </div>
}

export const CreateTask: React.VFC<{}> = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>("")
    const [title, setTitle] = useState<string>("")

    const CreateTaskHandler = () => {
        tasksAPI.createTask(todolistId, title)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div> {JSON.stringify(state)}
        <div>
            <input
                placeholder="todolistId"
                value={todolistId}
                onChange={(e) => { setTodolistId(e.currentTarget.value) }}>
            </input>
            <input
                placeholder="title"
                value={title}
                onChange={(e) => { setTitle(e.currentTarget.value) }}
            ></input>
            <button onClick={CreateTaskHandler}>Create Task</button>
        </div>
    </div>
}

export const UpdateTaskTitle: React.VFC<{}> = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>("")
    const [taskId, setTaskId] = useState<string>("")
    const [newTitle, setNewTitle] = useState<string>("")

    const UpdateTaskTitleHandler = () => {
        tasksAPI.putTask(todolistId, taskId, newTitle)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div> {JSON.stringify(state)}
        <div>
            <input
                placeholder="todolistId"
                value={todolistId}
                onChange={(e) => { setTodolistId(e.currentTarget.value) }}>
            </input>
            <input
                placeholder="taskId"
                value={taskId}
                onChange={(e) => { setTaskId(e.currentTarget.value) }}
            ></input>
            <input
                placeholder="newTitle"
                value={newTitle}
                onChange={(e) => { setNewTitle(e.currentTarget.value) }}
            ></input>
            <button onClick={UpdateTaskTitleHandler}>Update Task</button>
        </div>
    </div>
}
