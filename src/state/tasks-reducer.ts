import { v1 } from "uuid";
import { TasksStateType } from "../App";
import { AddTodolistActionType, RemoveTodolistActionType } from "./todolists-reducer";


type ActionsType =
    | RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusType
    | ChangeTaskTitleType
    | AddTodolistActionType
    | RemoveTodolistActionType

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskId: string
    todolistId: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK'
    taskTitle: string
    todolistId: string
}
export type ChangeTaskStatusType = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string
    isDone: boolean
    todolistId: string
}
export type ChangeTaskTitleType = {
    type: 'CHANGE-TASK-TITLE'
    taskId: string
    newTitle: string
    todolistId: string
}

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {

        case 'REMOVE-TASK': {
            let tasks = state[action.todolistId];
            let filteredTask = tasks.filter(item => item.id !== action.taskId);
            state[action.todolistId] = filteredTask;
            return { ...state };
        }

        case 'ADD-TASK': {
            let newTask = { id: v1(), title: action.taskTitle, isDone: false };
            state[action.todolistId] = [newTask, ...state[action.todolistId]];
            return { ...state };
        }

        case 'CHANGE-TASK-STATUS': {
            let task = state[action.todolistId].find(item => item.id === action.taskId)
            if (task) {
                task.isDone = action.isDone;
            }
            return { ...state };
        }

        case 'CHANGE-TASK-TITLE': {
            let task = state[action.todolistId].find(item => item.id === action.taskId)
            if (task) {
                task.title = action.newTitle;
            }
            return { ...state };
        }

        case 'ADD-TODOLIST': {
            state[action.todolistId] = [];
            return { ...state };
        }

        case'REMOVE-TODOLIST':{
            delete state[action.id];
            return { ...state };
        }

        default:
            throw new Error("I don't understand this action type!")
    }

}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return { type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId }
}
export const addTaskAC = (taskTitle: string, todolistId: string): AddTaskActionType => {
    return { type: 'ADD-TASK', taskTitle: taskTitle, todolistId: todolistId }
}
export const changeTaskStatuskAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusType => {
    return { type: 'CHANGE-TASK-STATUS', taskId: taskId, isDone: isDone, todolistId: todolistId }
}
export const changeTaskTitleAC = (taskId: string, newTitle: string, todolistId: string): ChangeTaskTitleType => {
    return { type: 'CHANGE-TASK-TITLE', taskId: taskId, newTitle: newTitle, todolistId: todolistId }
}
