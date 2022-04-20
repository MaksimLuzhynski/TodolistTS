import { tasksReducer } from './tasks-reducer';
import { todolistsReducer } from './todolists-reducer';
import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from 'redux-thunk';
import { appReducer } from './app-reducer';
import { loginReducer } from './login-reducer';

export type RootStateType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    login: loginReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk));


//@ts-ignore
window.store = store