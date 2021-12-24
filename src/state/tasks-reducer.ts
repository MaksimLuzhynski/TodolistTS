import { RootStateType } from './store';
import { action } from '@storybook/addon-actions';
import { v1 } from "uuid";
import { TaskAPIType, TaskPriorities, tasksAPI, TaskStatuses, UpdateTaskType } from "../api/tasks-api";
import { TasksStateType } from "../App";
import { AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType, todolistId1, todolistId2 } from "./todolists-reducer";
import { Dispatch } from 'redux';

export type TaskType = TaskAPIType

export type ModelUpdateTaskType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

type ActionsType =
    | RemoveTaskActionType
    | AddTaskActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | SetTasksActionType
    | UpdateTaskActionType

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskId: string
    todolistId: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK'
    task: TaskAPIType
}
export type SetTasksActionType = {
    type: 'SET-TASKS'
    tasks: Array<TaskType>
    todolistId: string
}
export type UpdateTaskActionType = {
    type: 'UPDATE-TASK'
    taskId: string
    model: ModelUpdateTaskType
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
            // let newTask = { id: v1(), title: action.taskTitle, status: TaskStatuses.New, todoListId: action.todolistId, description: "", priority: TaskPriorities.Low, startDate: "", deadline: "", order: 0, addedDate: "" };
            // state[action.todolistId] = [newTask, ...state[action.todolistId]];
            // return { ...state };

            let newTask = action.task
            state[action.task.todoListId] = [newTask, ...state[action.task.todoListId]];
            return { ...state };
        }

        case 'UPDATE-TASK': {

            let todolistTasks = state[action.todolistId];
            state[action.todolistId] = todolistTasks.map(item => item.id === action.taskId
                ? { ...item, ...action.model }
                : item)
            return { ...state };
        }

        case 'ADD-TODOLIST': {
            state[action.todolist.id] = [];///??////////////////////////////////////???????????????????????
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
export const addTaskAC = (task: TaskAPIType): AddTaskActionType => {
    return { type: 'ADD-TASK', task: task }
}
export const updateTaskAC = (taskId: string, model: ModelUpdateTaskType, todolistId: string): UpdateTaskActionType => {
    return { type: 'UPDATE-TASK', taskId: taskId, model, todolistId: todolistId }
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
export const removeTasksTC = (todolistId: string, taskId: string) => {
    return (dispatch: Dispatch) => {
        tasksAPI.removeTask(todolistId, taskId)
            .then((res) => {
                dispatch(removeTaskAC(taskId, todolistId))
            })
    }
}
export const addTaskTC = (newTaskTitle: string, todolistId: string) => {
    return (dispatch: Dispatch) => {
        tasksAPI.addTask(todolistId, newTaskTitle)
            .then((res) => {
                dispatch(addTaskAC(res.data.data.item))
            })
    }
}
export const updateTaskTC = (todolistId: string, UIModel: ModelUpdateTaskType, taskId: string) => {
    return (dispatch: Dispatch, getState: () => RootStateType) => {
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

        tasksAPI.updateTask(todolistId, taskId, APIModel)
            .then((res) => {
                dispatch(updateTaskAC(taskId, UIModel, todolistId))
            })
    }
}