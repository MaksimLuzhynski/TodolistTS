import { v1 } from "uuid";
import { FilterValueType, TodolistType } from "../App";

type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistActionType
    | ChangeTodolistFilterActionType

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId:string
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

export const todolistsReducer = (state: Array<TodolistType>, action: ActionsType): Array<TodolistType> => {
    switch (action.type) {

        case 'REMOVE-TODOLIST': {
            return state.filter(item => item.id !== action.id);
        }

        case 'ADD-TODOLIST': {
            return [...state, {
                id: action.todolistId,
                title: action.title,
                filter: "all"
            }];
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

        default:
            throw new Error("I don't understand this action type!")
    }

}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return { type: 'REMOVE-TODOLIST', id: todolistId }
}
export const addTodolistAC = (title: string): AddTodolistActionType => {
    return { type: 'ADD-TODOLIST', title: title, todolistId:v1() }
}
export const changeTodolistAC = (id: string, title: string): ChangeTodolistActionType => {
    return { type: 'CHANGE-TODOLIST-TITLE', id: id, title: title }
}
export const changeTodolistFilterAC = (id: string, filter: FilterValueType): ChangeTodolistFilterActionType => {
    return { type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter }
}
