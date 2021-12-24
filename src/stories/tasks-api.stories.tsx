import React, { useEffect, useState } from 'react';
import { Meta } from '@storybook/react';
import { TaskPriorities, tasksAPI, TaskStatuses, UpdateTaskType } from '../api/tasks-api';
import { title } from 'process';


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
        const todolistId = "2a6d4857-92f4-4ccf-af2b-4e3034fad8b6"//Id прописываю непосредственно в коде (для удобства), а не через input в storybook
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
        tasksAPI.removeTask(todolistId, taskId)
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
        tasksAPI.addTask(todolistId, title)
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

        const model: UpdateTaskType = {
            title: newTitle,
            description: "привет",
            priority: TaskPriorities.Low,
            startDate: "8888",
            deadline: "9999",
            status: TaskStatuses.New
        }

        tasksAPI.updateTask(todolistId, taskId, model)
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
