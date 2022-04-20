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


export const loginAPI = {

    // getTodolists() {
    //     return instans.get<Array<TodolistAPIType>>("todo-lists/");
    // },
    // addTodolist(title: string) {
    //     return instans.post<ResponseType<{ item: TodolistAPIType }>>("todo-lists/", { title: title });
    // },
    // removeTodolist(todolistId: string) {
    //     return instans.delete<ResponseType>(`todo-lists/${todolistId}`);
    // },
    // changeTodolist(todolistId: string, newTitle: string) {
    //     return instans.put<ResponseType>(`todo-lists/${todolistId}`, { title: newTitle })
    // },

    addLogin(payload: LoginAPIType) {
        return instans.post<ResponseType<{ user?: number }>>(`auth/login`, { payload });// ??????? объект?
    },
    deleteLogin() {
        return instans.delete<ResponseType<{}>>(`auth/login`);
    },
    getLogin() {
        return instans.get<ResponseType<LoginAPIType>>(`auth/me`);
    },


}

// types
export type LoginAPIType = {
    email: string,
    password: string,
    rememberMe: boolean,
    captcha?: string
}
type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}
// type ResponseType<D = {}> = {
    //     resultCode: number
    //     messages: Array<string>
    //     fieldsErrors: Array<string>
//     data: D
// }

// export type AddLoginResponseType = {
//     resultCode: number,
//     messages: Array<string>,
//     data: {
//         userId: number 
//     }
// }
// export type DeleteLoginResponseType = {
//     resultCode: number
//     messages: Array<string>,
//     data: {}
// }
// export type GetLoginResponseType = {
//     resultCode: number,
//     messages: Array<string>,
//     data: {
//         id: string,
//         email: string,
//         login: string
//     }
// }
