import { loginAPI, LoginAPIType } from "../api/login-api"
import { SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType } from "./app-reducer"
import { Dispatch } from 'redux';
import { handleServerAppError, handleServerNetworkError } from "../utils/error-utils";

const initialState: LoginAPIType = {
    email: '',
    password: '',
    rememberMe: false,
    captcha: ''
}

export const loginReducer = (state: LoginAPIType = initialState, action: ActionsType): LoginAPIType => {
    switch (action.type) {

        // case '': {
        //     return state
        // }
        // case '': {
        //     return state
        // }
        // case '': {
        //     return state
        // }
        // case '': {
        //     return state
        // }


        default:
            return state;
    }

}

// actions
// export const removeTaskAC = (taskId: string, todolistId: string) => ({ type: 'REMOVE-TASK', taskId, todolistId } as const)
// export const addTaskAC = (task: TaskAPIType) => ({ type: 'ADD-TASK', task } as const)
// export const updateTaskAC = (taskId: string, model: ModelUpdateTaskType, todolistId: string) => ({ type: 'UPDATE-TASK', taskId, model, todolistId } as const)
// export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) => ({ type: 'SET-TASKS', tasks, todolistId } as const)

// thunks
export const addLoginTC = (payload: LoginAPIType) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    loginAPI.addLogin(payload)
        // .then((res) => {
        //     dispatch(addLoginAC())
        //     dispatch(setAppStatusAC('succeeded'))
        // })
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setAppStatusAC('succeeded'))
                // dispatch()
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })

}
// export const removeTasksTC = (todolistId: string, taskId: string) => (dispatch: Dispatch<ActionsType>) => {
//     dispatch(setAppStatusAC('loading'))
//     tasksAPI.removeTask(todolistId, taskId)
//         .then((res) => {
//             dispatch(removeTaskAC(taskId, todolistId))
//             dispatch(setAppStatusAC('succeeded'))
//         })
// }



// types

type ActionsType =
    // | AddTodolistActionType
    // | RemoveTodolistActionType
    // | SetTodolistsActionType
    | SetAppErrorActionType
    | SetAppStatusActionType
    // | ReturnType<typeof addTaskAC>
    // | ReturnType<typeof removeTaskAC>
    // | ReturnType<typeof setTasksAC>
    // | ReturnType<typeof updateTaskAC>

    