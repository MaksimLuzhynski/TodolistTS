import { action } from '@storybook/addon-actions';
import { isTemplateExpression } from "typescript";
import { v1 } from "uuid";
import { TaskAPIType, TaskPriorities, tasksAPI, TaskStatuses } from "../api/tasks-api";
import { TasksStateType } from "../App";
import { AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType, todolistId1, todolistId2 } from "./todolists-reducer";
import { Dispatch } from 'redux';

export type TaskType = TaskAPIType

type ActionsType =
    | RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | SetTasksActionType

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
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string
    status: TaskStatuses
    todolistId: string
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    taskId: string
    newTitle: string
    todolistId: string
}
export type SetTasksActionType = {
    type: 'SET-TASKS'
    tasks: Array<TaskType>
    todolistId: string
}


const initialState: TasksStateType = {
    // [todolistId1]:
    //     [{ id: v1(), title: "HTML", status: TaskStatuses.Completed, todoListId: "todolistId1", description: "", priority: TaskPriorities.Low, startDate: "", deadline: "", order: 0, addedDate: "" },
    //     { id: v1(), title: "CSS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: "", priority: TaskPriorities.Low, startDate: "", deadline: "", order: 0, addedDate: "" },
    //     { id: v1(), title: "JS", status: TaskStatuses.New, todoListId: "todolistId1", description: "", priority: TaskPriorities.Low, startDate: "", deadline: "", order: 0, addedDate: "" },
    //     { id: v1(), title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: "", priority: TaskPriorities.Low, startDate: "", deadline: "", order: 0, addedDate: "" },
    //     { id: v1(), title: "Vue", status: TaskStatuses.New, todoListId: "todolistId1", description: "", priority: TaskPriorities.Low, startDate: "", deadline: "", order: 0, addedDate: "" },],
    // [todolistId2]:
    //     [{ id: v1(), title: "Milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: "", priority: TaskPriorities.Low, startDate: "", deadline: "", order: 0, addedDate: "" },
    //     { id: v1(), title: "Cola", status: TaskStatuses.Completed, todoListId: "todolistId2", description: "", priority: TaskPriorities.Low, startDate: "", deadline: "", order: 0, addedDate: "" },
    //     { id: v1(), title: "Limon", status: TaskStatuses.New, todoListId: "todolistId2", description: "", priority: TaskPriorities.Low, startDate: "", deadline: "", order: 0, addedDate: "" },
    //     { id: v1(), title: "Beer", status: TaskStatuses.New, todoListId: "todolistId2", description: "", priority: TaskPriorities.Low, startDate: "", deadline: "", order: 0, addedDate: "" },],
}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {

        case 'REMOVE-TASK': {
            let tasks = state[action.todolistId];
            let filteredTask = tasks.filter(item => item.id !== action.taskId);
            state[action.todolistId] = filteredTask;
            return { ...state };
        }

        case 'ADD-TASK': {
            let newTask = { id: v1(), title: action.taskTitle, status: TaskStatuses.New, todoListId: action.todolistId, description: "", priority: TaskPriorities.Low, startDate: "", deadline: "", order: 0, addedDate: "" };
            state[action.todolistId] = [newTask, ...state[action.todolistId]];
            return { ...state };
        }

        case 'CHANGE-TASK-STATUS': {
            let todolistTasks = state[action.todolistId];
            state[action.todolistId] = todolistTasks.map(item => item.id === action.taskId
                ? { ...item, status: action.status }
                : item)
            return { ...state };
        }

        case 'CHANGE-TASK-TITLE': {
            let todolistTasks = state[action.todolistId];
            state[action.todolistId] = todolistTasks.map(item => item.id === action.taskId
                ? { ...item, title: action.newTitle }
                : item)
            return { ...state };
        }

        case 'ADD-TODOLIST': {
            state[action.todolistId] = [];
            return { ...state };
        }

        case 'REMOVE-TODOLIST': {
            delete state[action.id];
            return { ...state };
        }

        case 'SET-TODOLISTS': {
            action.todolists.forEach(item => {
                state[item.id] = []
            })
            return { ...state };
        }

        case 'SET-TASKS': {
            state[action.todolistId] = action.tasks
            return { ...state };
        }

        default:
            return state;
    }

}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return { type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId }
}
export const addTaskAC = (taskTitle: string, todolistId: string): AddTaskActionType => {
    return { type: 'ADD-TASK', taskTitle: taskTitle, todolistId: todolistId }
}
export const changeTaskStatuskAC = (taskId: string, status: TaskStatuses, todolistId: string): ChangeTaskStatusActionType => {
    return { type: 'CHANGE-TASK-STATUS', taskId: taskId, status: status, todolistId: todolistId }
}
export const changeTaskTitleAC = (taskId: string, newTitle: string, todolistId: string): ChangeTaskTitleActionType => {
    return { type: 'CHANGE-TASK-TITLE', taskId: taskId, newTitle: newTitle, todolistId: todolistId }
}
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string): SetTasksActionType => {
    return { type: 'SET-TASKS', tasks: tasks, todolistId: todolistId }
}

export const fetchTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        tasksAPI.getTasks(todolistId)
            .then((res) => {
                dispatch(setTasksAC(res.data.items, todolistId))
            })
    }
}