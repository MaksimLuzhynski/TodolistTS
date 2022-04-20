import axios from 'axios';

const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "d215560e-a06c-4471-95ae-fec7d89d460b"
    }
}

const instans = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    ...settings
})


export const todolistsAPI = {

    getTodolists() {
        return instans.get<Array<TodolistAPIType>>("todo-lists/");
    },
    addTodolist(title: string) {
        return instans.post<ResponseType<{ item: TodolistAPIType }>>("todo-lists/", { title: title });
    },
    removeTodolist(todolistId: string) {
        return instans.delete<ResponseType>(`todo-lists/${todolistId}`);
    },
    changeTodolist(todolistId: string, newTitle: string) {
        return instans.put<ResponseType>(`todo-lists/${todolistId}`, { title: newTitle })
    },

}

// types
export type TodolistAPIType = {
    id: string
    title: string
    addedDate: string
    order: number
}
export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}