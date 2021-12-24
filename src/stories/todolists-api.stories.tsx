import React, { useEffect, useState } from 'react';
import { Meta } from '@storybook/react';
import { todolistsAPI } from '../api/todolists-api';


export default {
    title: 'API/TodolistsAPI'
} as Meta;

const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "d215560e-a06c-4471-95ae-fec7d89d460b"
    }
}

export const GetTodolists: React.VFC<{}> = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.getTodolists()
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}

export const CreateTodolist: React.VFC<{}> = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>("")

    const CreateTodolistHandler = () => {
        todolistsAPI.addTodolist(title)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div> {JSON.stringify(state)}
        <div>
            <input
                placeholder="title"
                value={title}
                onChange={(e) => { setTitle(e.currentTarget.value) }}
            ></input>
            <button onClick={CreateTodolistHandler}>Create Todolist</button>
        </div>
    </div>
}

export const DeleteTodolist: React.VFC<{}> = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>("")

    const DeleteTodolistHandler = () => {
        todolistsAPI.removeTodolist(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div> {JSON.stringify(state)}
        <div>
            <input
                placeholder="todolistId"
                value={todolistId}
                onChange={(e) => { setTodolistId(e.currentTarget.value) }}
            ></input>
            <button onClick={DeleteTodolistHandler}>Delete Todolist</button>
        </div>
    </div>
}

export const UpdateTodolistTitle: React.VFC<{}> = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>("")
    const [newTitle, setNewTitle] = useState<string>("")

    // useEffect(() => {
    //     const todolistId = "b78666f4-ac19-474f-b84b-bae8fccf5b94";
    //     const newTitle = "VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV";
    //     todolistsAPI.putTodolist(todolistId, newTitle)
    //         .then((res) => {
    //             setState(res.data)
    //         })
    // }, [])
    const UpdateTodolistTitleHandler = () => {
        todolistsAPI.changeTodolist(todolistId, newTitle)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div> {JSON.stringify(state)}
        <div>
            <input
                placeholder="todolistId"
                value={todolistId}
                onChange={(e) => { setTodolistId(e.currentTarget.value) }}
            >
            </input>
            <input
                placeholder="newTitle"
                value={newTitle}
                onChange={(e) => { setNewTitle(e.currentTarget.value) }}
            ></input>
            <button onClick={UpdateTodolistTitleHandler}>Update Todolist</button>
        </div>
    </div>
}

