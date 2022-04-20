import { Provider } from "react-redux"
import { applyMiddleware, combineReducers, createStore } from "redux"
import thunk from "redux-thunk"
import { v1 } from "uuid"
import { TaskPriorities, TaskStatuses } from "../api/tasks-api"
import { appReducer } from "../state/app-reducer"
import { loginReducer } from "../state/login-reducer"
import { RootStateType } from "../state/store"
import { tasksReducer } from "../state/tasks-reducer"
import { todolistsReducer } from "../state/todolists-reducer"


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    login: loginReducer
})

const initialGlobalState = {
    todolists: [
        { id: "todolistId1", title: "What to learn", filter: "all", entytiStatus: 'idle', addedDate: "", order: 0, },
        { id: "todolistId2", title: "What to buy", filter: "all", entytiStatus: 'idle', addedDate: "", order: 0, },
    ],
    tasks: {
        "todolistId1":
            [{ id: v1(), title: "HTML", status: TaskStatuses.Completed, todoListId: "todolistId1", description: "", priority: TaskPriorities.Low, startDate: "", deadline: "", order: 0, addedDate: "" },
            { id: v1(), title: "CSS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: "", priority: TaskPriorities.Low, startDate: "", deadline: "", order: 0, addedDate: "" },
            { id: v1(), title: "JS", status: TaskStatuses.New, todoListId: "todolistId1", description: "", priority: TaskPriorities.Low, startDate: "", deadline: "", order: 0, addedDate: "" },
            { id: v1(), title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: "", priority: TaskPriorities.Low, startDate: "", deadline: "", order: 0, addedDate: "" },
            { id: v1(), title: "Vue", status: TaskStatuses.New, todoListId: "todolistId1", description: "", priority: TaskPriorities.Low, startDate: "", deadline: "", order: 0, addedDate: "" },],
        "todolistId2":
            [{ id: v1(), title: "Milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: "", priority: TaskPriorities.Low, startDate: "", deadline: "", order: 0, addedDate: "" },
            { id: v1(), title: "Cola", status: TaskStatuses.Completed, todoListId: "todolistId2", description: "", priority: TaskPriorities.Low, startDate: "", deadline: "", order: 0, addedDate: "" },
            { id: v1(), title: "Limon", status: TaskStatuses.New, todoListId: "todolistId2", description: "", priority: TaskPriorities.Low, startDate: "", deadline: "", order: 0, addedDate: "" },
            { id: v1(), title: "Beer", status: TaskStatuses.New, todoListId: "todolistId2", description: "", priority: TaskPriorities.Low, startDate: "", deadline: "", order: 0, addedDate: "" },],
    },
    app: {
        status: "idle",
        error: null
    },
    login: {
        email: '',
        password: '',
        rememberMe: false,
        captcha: ''
    }
}

export const storyBookStore = createStore(rootReducer, initialGlobalState as RootStateType, applyMiddleware(thunk))

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}