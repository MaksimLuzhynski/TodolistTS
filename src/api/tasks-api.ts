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


export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Нigh = 2,
    Urgently = 3,
    Later = 4
}
export type TaskAPIType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
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
export type UpdateTaskType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}


export const tasksAPI = {

    getTasks(todolistId: string) {
        return instans.get<GetTaskResponseType>(`todo-lists/${todolistId}/tasks`);
    },

    removeTask(todolistId: string, taskId: string) {
        return instans.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`);
    },

    addTask(todolistId: string, title: string) {
        return instans.post<ResponseType<{ item: TaskAPIType }>>(`todo-lists/${todolistId}/tasks/`, { title: title });
    },

    updateTask(todolistId: string, taskId: string, model: UpdateTaskType) {                                                  //??????????????????
        return instans.put<UpdateTaskType>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    },

}