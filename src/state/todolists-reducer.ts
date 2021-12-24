
import { action } from '@storybook/addon-actions';
import { todolistsAPI, TodolistAPIType } from './../api/todolists-api';
import { v1 } from "uuid";
import { Dispatch } from 'redux';


export type TodolistType = TodolistAPIType & {
    filter: FilterValueType
}

export type FilterValueType = "all" | "active" | "completed"

type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistActionType
    | ChangeTodolistFilterActionType
    | SetTodolistsActionType

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    todolist: TodolistType
}

export type ChangeTodolistActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValueType
}
export type SetTodolistsActionType = {
    type: 'SET-TODOLISTS'
    todolists: Array<TodolistAPIType>
}


export let todolistId1 = v1();
export let todolistId2 = v1();

const initialState: Array<TodolistType> = [
    // { id: todolistId1, title: "What to learn", filter: "all", addedDate: "", order: 0, },
    // { id: todolistId2, title: "What to buy", filter: "all", addedDate: "", order: 0, },
]

export const todolistsReducer = (state: Array<TodolistType> = initialState, action: ActionsType): Array<TodolistType> => {
    switch (action.type) {

        case 'REMOVE-TODOLIST': {
            return state.filter(item => item.id !== action.id);
        }

        case 'ADD-TODOLIST': {
            return [
                { ...action.todolist }
                , ...state];
        }

        case 'CHANGE-TODOLIST-TITLE': {
            let todolist = state.find(item => item.id == action.id);
            if (todolist)
                todolist.title = action.title;
            return [...state];
        }

        case 'CHANGE-TODOLIST-FILTER': {
            let todolist = state.find(item => item.id === action.id)
            if (todolist) {
                todolist.filter = action.filter;
            }
            return [...state];
        }

        case 'SET-TODOLISTS': {
            return action.todolists.map(item => {
                return {
                    ...item,
                    filter: "all"
                }
            })
        }

        default:
            return state;
    }

}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return { type: 'REMOVE-TODOLIST', id: todolistId }
}
export const addTodolistAC = (todolist: TodolistType): AddTodolistActionType => {
    return { type: 'ADD-TODOLIST', todolist }
}
export const changeTodolistAC = (id: string, title: string): ChangeTodolistActionType => {
    return { type: 'CHANGE-TODOLIST-TITLE', id: id, title: title }
}
export const changeTodolistFilterAC = (id: string, filter: FilterValueType): ChangeTodolistFilterActionType => {
    return { type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter }
}
export const setTodolistsAC = (todolists: Array<TodolistAPIType>): SetTodolistsActionType => {
    return { type: 'SET-TODOLISTS', todolists: todolists }
}

export const fetchTodolistsTC = () => {
    return (dispatch: Dispatch) => {
        todolistsAPI.getTodolists()
            .then((res) => {
                dispatch(setTodolistsAC(res.data))
            })
    }
}
export const removeTodolistTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.removeTodolist(todolistId)
            .then((res) => {
                dispatch(removeTodolistAC(todolistId))
            })
    }
}
export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.addTodolist(title)
            .then((res) => {
                dispatch(addTodolistAC({ ...res.data.data.item, filter: 'all' }))
            })
    }
}
export const changeTodolistTitleTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.changeTodolist(todolistId, title)
            .then((res) => {
                dispatch(changeTodolistAC(todolistId, title))
            })
    }
}

