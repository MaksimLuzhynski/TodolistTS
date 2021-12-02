import { v1 } from "uuid";
import { TodolistAPIType } from "../api/todolists-api";


export type TodolistType = TodolistAPIType & {
    filter: FilterValueType
}

export type FilterValueType = "all" | "active" | "completed"

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
    todolistId: string
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
            return [{
                id: action.todolistId,
                title: action.title,
                filter: "all",
                addedDate: "",
                order: 0,
            }, ...state];
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
            return state;
    }

}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return { type: 'REMOVE-TODOLIST', id: todolistId }
}
export const addTodolistAC = (title: string): AddTodolistActionType => {
    return { type: 'ADD-TODOLIST', title: title, todolistId: v1() }
}
export const changeTodolistAC = (id: string, title: string): ChangeTodolistActionType => {
    return { type: 'CHANGE-TODOLIST-TITLE', id: id, title: title }
}
export const changeTodolistFilterAC = (id: string, filter: FilterValueType): ChangeTodolistFilterActionType => {
    return { type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter }
}
