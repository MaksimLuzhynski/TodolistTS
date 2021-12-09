import { tasksReducer } from './tasks-reducer';
import { todolistsReducer } from './todolists-reducer';
import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from 'redux-thunk';

export type RootStateType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk));


//@ts-ignore
window.store = store