import { v1 } from "uuid";
import { TaskPriorities, TaskStatuses } from "../api/tasks-api";
import { TasksStateType } from "../App";
import { addTaskAC, changeTaskStatuskAC, changeTaskTitleAC, removeTaskAC, setTasksAC, tasksReducer } from "./tasks-reducer";
import { addTodolistAC, setTodolistsAC, TodolistType } from "./todolists-reducer";

test('correct task should be removed', () => {

    const startState: TasksStateType = {
        "todolistId1":
            [{ id: "1", title: "HTML", status: TaskStatuses.Completed, todoListId: "todolistId1", description: "", priority: TaskPriorities.Low, startDate: "", deadline: "", order: 0, addedDate: "" },
            { id: "2", title: "CSS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: "", priority: TaskPriorities.Low, startDate: "", deadline: "", order: 0, addedDate: "" },
            { id: "3", title: "JS", status: TaskStatuses.New, todoListId: "todolistId1", description: "", priority: TaskPriorities.Low, startDate: "", deadline: "", order: 0, addedDate: "" },],
        "todolistId2":
            [{ id: "1", title: "Milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: "", priority: TaskPriorities.Low, startDate: "", deadline: "", order: 0, addedDate: "" },
            { id: "2", title: "Cola", status: TaskStatuses.Completed, todoListId: "todolistId2", description: "", priority: TaskPriorities.Low, startDate: "", deadline: "", order: 0, addedDate: "" },
            { id: "3", title: "Limon", status: TaskStatuses.New, todoListId: "todolistId2", description: "", priority: TaskPriorities.Low, startDate: "", deadline: "", order: 0, addedDate: "" },],
    }

    const endState = tasksReducer(startState, removeTaskAC("2", "todolistId2"))

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(2);
    expect(endState["todolistId2"].every(item => item.id !== "2")).toBeTruthy();

});

test('correct task should be added', () => {

    const startState: TasksStateType = {
        "todolistId1":
            [{ id: "1", title: "HTML", status: TaskStatuses.Completed, todoListId: "todolistId1", description: "", priority: TaskPriorities.Low, startDate: "", deadline: "", order: 0, addedDate: "" },
            { id: "2", title: "CSS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: "", priority: TaskPriorities.Low, startDate: "", deadline: "", order: 0, addedDate: "" },
            { id: "3", title: "JS", status: TaskStatuses.New, todoListId: "todolistId1", description: "", priority: TaskPriorities.Low, startDate: "", deadline: "", order: 0, addedDate: "" },],
        "todolistId2":
            [{ id: "1", title: "Milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: "", priority: TaskPriorities.Low, startDate: "", deadline: "", order: 0, addedDate: "" },
            { id: "2", title: "Cola", status: TaskStatuses.Completed, todoListId: "todolistId2", description: "", priority: TaskPriorities.Low, startDate: "", deadline: "", order: 0, addedDate: "" },
            { id: "3", title: "Limon", status: TaskStatuses.New, todoListId: "todolistId2", description: "", priority: TaskPriorities.Low, startDate: "", deadline: "", order: 0, addedDate: "" },],
    }

    const endState = tasksReducer(startState, addTaskAC("Beer", "todolistId2"))

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("Beer");
    expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New);
});

test('status of specified task should be changed', () => {

    const startState: TasksStateType = {
        "todolistId1":
            [{ id: "1", title: "HTML", status: TaskStatuses.Completed, todoListId: "todolistId1", description: "", priority: TaskPriorities.Low, startDate: "", deadline: "", order: 0, addedDate: "" },
            { id: "2", title: "CSS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: "", priority: TaskPriorities.Low, startDate: "", deadline: "", order: 0, addedDate: "" },
            { id: "3", title: "JS", status: TaskStatuses.New, todoListId: "todolistId1", description: "", priority: TaskPriorities.Low, startDate: "", deadline: "", order: 0, addedDate: "" },],
        "todolistId2":
            [{ id: "1", title: "Milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: "", priority: TaskPriorities.Low, startDate: "", deadline: "", order: 0, addedDate: "" },
            { id: "2", title: "Cola", status: TaskStatuses.Completed, todoListId: "todolistId2", description: "", priority: TaskPriorities.Low, startDate: "", deadline: "", order: 0, addedDate: "" },
            { id: "3", title: "Limon", status: TaskStatuses.New, todoListId: "todolistId2", description: "", priority: TaskPriorities.Low, startDate: "", deadline: "", order: 0, addedDate: "" },],
    }

    const endState = tasksReducer(startState, changeTaskStatuskAC("2", TaskStatuses.New, "todolistId2"))


    expect(endState["todolistId2"][1].status).toBe(TaskStatuses.New);
    expect(endState["todolistId1"][1].status).toBe(TaskStatuses.Completed);
    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(3);
});

test('title of specified task should be changed', () => {

    const startState: TasksStateType = {
        "todolistId1":
            [{ id: "1", title: "HTML", status: TaskStatuses.Completed, todoListId: "todolistId1", description: "", priority: TaskPriorities.Low, startDate: "", deadline: "", order: 0, addedDate: "" },
            { id: "2", title: "CSS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: "", priority: TaskPriorities.Low, startDate: "", deadline: "", order: 0, addedDate: "" },
            { id: "3", title: "JS", status: TaskStatuses.New, todoListId: "todolistId1", description: "", priority: TaskPriorities.Low, startDate: "", deadline: "", order: 0, addedDate: "" },],
        "todolistId2":
            [{ id: "1", title: "Milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: "", priority: TaskPriorities.Low, startDate: "", deadline: "", order: 0, addedDate: "" },
            { id: "2", title: "Cola", status: TaskStatuses.Completed, todoListId: "todolistId2", description: "", priority: TaskPriorities.Low, startDate: "", deadline: "", order: 0, addedDate: "" },
            { id: "3", title: "Limon", status: TaskStatuses.New, todoListId: "todolistId2", description: "", priority: TaskPriorities.Low, startDate: "", deadline: "", order: 0, addedDate: "" },],
    }

    const endState = tasksReducer(startState, changeTaskTitleAC("2", "Beer", "todolistId2"))



    expect(endState["todolistId2"][1].title).toBe("Beer");
    expect(endState["todolistId1"][1].title).toBe("CSS");

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(3);

});

test('new property with new array should be added when new todolist is added', () => {

    const startState: TasksStateType = {
        "todolistId1":
            [{ id: "1", title: "HTML", status: TaskStatuses.Completed, todoListId: "todolistId1", description: "", priority: TaskPriorities.Low, startDate: "", deadline: "", order: 0, addedDate: "" },
            { id: "2", title: "CSS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: "", priority: TaskPriorities.Low, startDate: "", deadline: "", order: 0, addedDate: "" },
            { id: "3", title: "JS", status: TaskStatuses.New, todoListId: "todolistId1", description: "", priority: TaskPriorities.Low, startDate: "", deadline: "", order: 0, addedDate: "" },],
        "todolistId2":
            [{ id: "1", title: "Milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: "", priority: TaskPriorities.Low, startDate: "", deadline: "", order: 0, addedDate: "" },
            { id: "2", title: "Cola", status: TaskStatuses.Completed, todoListId: "todolistId2", description: "", priority: TaskPriorities.Low, startDate: "", deadline: "", order: 0, addedDate: "" },
            { id: "3", title: "Limon", status: TaskStatuses.New, todoListId: "todolistId2", description: "", priority: TaskPriorities.Low, startDate: "", deadline: "", order: 0, addedDate: "" },],
    };

    const endState = tasksReducer(startState, addTodolistAC("new todolist"))


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('empty arrays should be added when we set todolists', () => {

    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodolistType> = [
        { id: todolistId1, title: "What to learn", filter: "all", addedDate: "", order: 0 },
        { id: todolistId2, title: "What to buy", filter: "all", addedDate: "", order: 0 }
    ]

    const endState = tasksReducer({}, setTodolistsAC(startState))


    const keys = Object.keys(endState);

    expect(keys.length).toBe(2);
    expect(endState[todolistId1]).toStrictEqual([]);
    expect(endState[todolistId2]).toStrictEqual([]);
});

test('tasks should be added for todolist', () => {

    const startState: TasksStateType = {
        "todolistId1":
            [{ id: "1", title: "HTML", status: TaskStatuses.Completed, todoListId: "todolistId1", description: "", priority: TaskPriorities.Low, startDate: "", deadline: "", order: 0, addedDate: "" },
            { id: "2", title: "CSS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: "", priority: TaskPriorities.Low, startDate: "", deadline: "", order: 0, addedDate: "" },
            { id: "3", title: "JS", status: TaskStatuses.New, todoListId: "todolistId1", description: "", priority: TaskPriorities.Low, startDate: "", deadline: "", order: 0, addedDate: "" },],
        "todolistId2":
            [{ id: "1", title: "Milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: "", priority: TaskPriorities.Low, startDate: "", deadline: "", order: 0, addedDate: "" },
            { id: "2", title: "Cola", status: TaskStatuses.Completed, todoListId: "todolistId2", description: "", priority: TaskPriorities.Low, startDate: "", deadline: "", order: 0, addedDate: "" },
            { id: "3", title: "Limon", status: TaskStatuses.New, todoListId: "todolistId2", description: "", priority: TaskPriorities.Low, startDate: "", deadline: "", order: 0, addedDate: "" },],
    }

    const endState = tasksReducer(
        { "todolistId2": [], "todolistId1": [], },
        setTasksAC(startState["todolistId1"], "todolistId1"))

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(0);
});
