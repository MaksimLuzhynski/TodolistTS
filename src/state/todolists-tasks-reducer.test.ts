import { TasksStateType, TodolistType } from "../App";
import { tasksReducer } from "./tasks-reducer";
import { addTodolistAC, removeTodolistAC, todolistsReducer } from "./todolists-reducer";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<TodolistType> = [];
 
    const action = addTodolistAC("new todolist");
 
    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)
 
    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;
 
    expect(idFromTasks).toBe(action.todolistId);
    expect(idFromTodolists).toBe(action.todolistId);
 });

 test('property with todolistId should be deleted', () => {
    const startState: TasksStateType = {
        "todolistId1": [
            { id: "1", title: "HTML", isDone: false },
            { id: "2", title: "CSS", isDone: true },
            { id: "3", title: "JS", isDone: false }
        ],
        "todolistId2": [
            { id: "1", title: "Milk", isDone: false },
            { id: "2", title: "Cola", isDone: true },
            { id: "3", title: "Limon", isDone: false }
        ]
    };
 
    const endState = tasksReducer(startState, removeTodolistAC("todolistId2"))
 
    const keys = Object.keys(endState);
 
    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).toBeUndefined();
 });
 
 