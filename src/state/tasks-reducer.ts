import { setAppErrorAC, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType } from './app-reducer';
import { RootStateType } from './store';
import { action } from '@storybook/addon-actions';
import { v1 } from "uuid";
import { TaskAPIType, TaskPriorities, tasksAPI, TaskStatuses, UpdateTaskType } from "../api/tasks-api";
import { AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType, todolistId1, todolistId2 } from "./todolists-reducer";
import { Dispatch } from 'redux';


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
            // let tasks = state[action.todolistId];
            // let filteredTask = tasks.filter(item => item.id !== action.taskId);
            // state[action.todolistId] = filteredTask;
            // return { ...state };
            return { ...state, [action.todolistId]: state[action.todolistId].filter(item => item.id !== action.taskId) }
        }
        case 'ADD-TASK': {
            // let newTask = action.task
            // state[action.task.todoListId] = [newTask, ...state[action.task.todoListId]];
            // return { ...state };
            return { ...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]] }
        }
        case 'UPDATE-TASK': {
            // let todolistTasks = state[action.todolistId];
            // state[action.todolistId] = todolistTasks.map(item => item.id === action.taskId
            //     ? { ...item, ...action.model }
            //     : item)
            // return { ...state };
            return {
                ...state, [action.todolistId]: state[action.todolistId].map(item => item.id === action.taskId
                    ? { ...item, ...action.model }
                    : item)
            }
        }
        case 'ADD-TODOLIST':
            // state[action.todolist.id] = [];      
            // return { ...state };
            return { ...state, [action.todolist.id]: [] }
        case 'REMOVE-TODOLIST':
            delete state[action.id];
            return { ...state };

        case 'SET-TODOLISTS': {
            action.todolists.forEach(item => {
                state[item.id] = []
            })
            return { ...state };
        }
        case 'SET-TASKS':
            // state[action.todolistId] = action.tasks
            // return { ...state };
            return { ...state, [action.todolistId]: action.tasks }

        default:
            return state;
    }

}

// actions
export const removeTaskAC = (taskId: string, todolistId: string) => ({ type: 'REMOVE-TASK', taskId, todolistId } as const)
export const addTaskAC = (task: TaskAPIType) => ({ type: 'ADD-TASK', task } as const)
export const updateTaskAC = (taskId: string, model: ModelUpdateTaskType, todolistId: string) => ({ type: 'UPDATE-TASK', taskId, model, todolistId } as const)
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) => ({ type: 'SET-TASKS', tasks, todolistId } as const)

// thunks
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    tasksAPI.getTasks(todolistId)
        .then((res) => {
            dispatch(setTasksAC(res.data.items, todolistId))
            dispatch(setAppStatusAC('succeeded'))
        })
}
export const removeTasksTC = (todolistId: string, taskId: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    tasksAPI.removeTask(todolistId, taskId)
        .then((res) => {
            dispatch(removeTaskAC(taskId, todolistId))
            dispatch(setAppStatusAC('succeeded'))
        })
}
export const addTaskTC = (newTaskTitle: string, todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    tasksAPI.addTask(todolistId, newTaskTitle)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC(res.data.data.item))
            }
            else {
                if (res.data.messages.length) {
                    dispatch(setAppErrorAC(res.data.messages[0]))
                }
                else {
                    dispatch(setAppErrorAC('Some error!!!'))
                }
                dispatch(setAppStatusAC('failed'))
            }
            dispatch(setAppStatusAC('succeeded'))
        })
}
export const updateTaskTC = (todolistId: string, UIModel: ModelUpdateTaskType, taskId: string) => (dispatch: Dispatch<ActionsType>, getState: () => RootStateType) => {
    const state = getState().tasks;
    const task = state[todolistId].find((item) => item.id === taskId)
    if (!task) {
        console.warn('Some error with change task!')
        return
    }
    const APIModel: UpdateTaskType = {
        title: task.title,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
        status: task.status,
        ...UIModel
    }
    dispatch(setAppStatusAC('loading'))
    tasksAPI.updateTask(todolistId, taskId, APIModel)
        .then((res) => {
            dispatch(updateTaskAC(taskId, UIModel, todolistId))
            dispatch(setAppStatusAC('succeeded'))
        })
}

// types
export type TaskType = TaskAPIType

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export type ModelUpdateTaskType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

type ActionsType =
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | SetAppErrorActionType
    | SetAppStatusActionType
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof updateTaskAC>
