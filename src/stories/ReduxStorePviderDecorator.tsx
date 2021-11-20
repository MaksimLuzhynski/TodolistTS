import { Provider } from "react-redux"
import { combineReducers, createStore } from "redux"
import { v1 } from "uuid"
import { RootStateType, store } from "../state/store"
import { tasksReducer } from "../state/tasks-reducer"
import { todolistsReducer } from "../state/todolists-reducer"


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState = {
    todolists: [
        { id: "todolistId1", title: "What to learn", filter: "all" },
        { id: "todolistId2", title: "What to buy", filter: "all" },
    ],
    tasks: {
        "todolistId1":
            [{ id: v1(), title: "HTML", isDone: true },
            { id: v1(), title: "CSS", isDone: true },
            { id: v1(), title: "JS", isDone: false },
            { id: v1(), title: "React", isDone: false },
            { id: v1(), title: "Vue", isDone: false },],
        "todolistId2":
            [{ id: v1(), title: "Milk", isDone: true },
            { id: v1(), title: "Cola", isDone: true },
            { id: v1(), title: "Limon", isDone: false },
            { id: v1(), title: "Beer", isDone: false },],
    }
}

export const storyBookStore = createStore(rootReducer, initialGlobalState as RootStateType)

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}