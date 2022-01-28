import { action } from '@storybook/addon-actions';
import { todolistsAPI, TodolistAPIType } from './../api/todolists-api';
import { v1 } from "uuid";
import { Dispatch } from 'redux';
import { RequestStatusType, setAppStatusAC, SetAppStatusActionType } from './app-reducer';


export let todolistId1 = v1();
export let todolistId2 = v1();

const initialState: Array<TodolistType> = [
    // { id: todolistId1, title: "What to learn", filter: "all", entytiStatus: 'idle', addedDate: "", order: 0, },
    // { id: todolistId2, title: "What to buy", filter: "all", entytiStatus: 'idle', addedDate: "", order: 0, },
]

export const todolistsReducer = (state: Array<TodolistType> = initialState, action: ActionsType): Array<TodolistType> => {
    switch (action.type) {

        case 'REMOVE-TODOLIST':
            return state.filter(item => item.id !== action.id);

        case 'ADD-TODOLIST':
            return [{ ...action.todolist }, ...state];

        case 'CHANGE-TODOLIST-TITLE':
            return state.map(item => item.id == action.id ? { ...item, title: action.title } : item)
        // let todolist = state.find(item => item.id == action.id);
        // if (todolist)
        //     todolist.title = action.title;
        // return [...state];

        case 'CHANGE-TODOLIST-FILTER':
            return state.map(item => item.id == action.id ? { ...item, filter: action.filter } : item)
        // let todolist = state.find(item => item.id === action.id)
        // if (todolist) {
        //     todolist.filter = action.filter;
        // }
        // return [...state];

        case 'CHANGE-TODOLIST-ENTYTI-STATUS':
            return state.map(item => item.id == action.id ? { ...item, entytiStatus: action.status } : item)

        case 'SET-TODOLISTS':
            return action.todolists.map(item => ({ ...item, filter: "all", entytiStatus: 'idle' }))
        // return action.todolists.map(item => {
        //     return {
        //         ...item,
        //         filter: "all"
        //     }
        // })

        default:
            return state;
    }

}
// actions
export const removeTodolistAC = (todolistId: string) => ({ type: 'REMOVE-TODOLIST', id: todolistId } as const)
export const addTodolistAC = (todolist: TodolistType) => ({ type: 'ADD-TODOLIST', todolist } as const)
export const changeTodolistAC = (id: string, title: string) => ({ type: 'CHANGE-TODOLIST-TITLE', id, title } as const)
export const changeTodolistFilterAC = (id: string, filter: FilterValueType) => ({ type: 'CHANGE-TODOLIST-FILTER', id, filter } as const)
export const setTodolistsAC = (todolists: Array<TodolistAPIType>) => ({ type: 'SET-TODOLISTS', todolists } as const)
export const changeTodolistEntytiStatusAC = (id: string, status: RequestStatusType) => ({ type: 'CHANGE-TODOLIST-ENTYTI-STATUS', id, status } as const)

// thunks
export const fetchTodolistsTC = () => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.getTodolists()
        .then((res) => {
            dispatch(setTodolistsAC(res.data))
            dispatch(setAppStatusAC('succeeded'))
        })
}
export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    dispatch (changeTodolistEntytiStatusAC(todolistId, 'loading'))
    todolistsAPI.removeTodolist(todolistId)
        .then((res) => {
            dispatch(removeTodolistAC(todolistId))
            dispatch(setAppStatusAC('succeeded'))
        })
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.addTodolist(title)
        .then((res) => {
            dispatch(addTodolistAC({ ...res.data.data.item, filter: 'all', entytiStatus: 'idle' }))
            dispatch(setAppStatusAC('succeeded'))
        })
}
export const changeTodolistTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.changeTodolist(todolistId, title)
        .then((res) => {
            dispatch(changeTodolistAC(todolistId, title))
            dispatch(setAppStatusAC('succeeded'))
        })
}

// types
export type TodolistType = TodolistAPIType & {
    filter: FilterValueType
    entytiStatus: RequestStatusType
}

export type FilterValueType = "all" | "active" | "completed"

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>
export type ChangeTodolistEntytiStatusActionType = ReturnType<typeof changeTodolistEntytiStatusAC>

type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | SetTodolistsActionType
    | SetAppStatusActionType
    | ChangeTodolistEntytiStatusActionType
    | ReturnType<typeof changeTodolistAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof changeTodolistEntytiStatusAC>

