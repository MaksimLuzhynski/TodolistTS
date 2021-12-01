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

export type TaskAPIType = {
    description: string
    title: string
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: number
}
export type GetTaskResponseType = {
    totalCount: number
    error: string | null
    items: Array<TaskAPIType>
}
type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}
type UpdateTaskType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}


export const tasksAPI = {

    getTasks(todolistId: string) {
        return instans.get<GetTaskResponseType>(`todo-lists/${todolistId}/tasks`);
    },

    deleteTask(todolistId: string, taskId: string) {
        return instans.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`);
    },

    createTask(todolistId: string, title: string) {
        return instans.post<ResponseType<{ item: TaskAPIType }>>(`todo-lists/${todolistId}/tasks/`, { title: title });
    },

    putTask(todolistId: string, taskId: string, newTitle: string) {
        return instans.put<UpdateTaskType>(`todo-lists/${todolistId}/tasks/${taskId}`, { title: newTitle })
    },

}