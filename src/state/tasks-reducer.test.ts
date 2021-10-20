import { TasksStateType } from "../App";
import { addTaskAC, changeTaskStatuskAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from "./tasks-reducer";
import { addTodolistAC } from "./todolists-reducer";

test('correct task should be removed', () => {

    const startState: TasksStateType = {
        "todolistId1":
            [{ id: "1", title: "HTML", isDone: true },
            { id: "2", title: "CSS", isDone: true },
            { id: "3", title: "JS", isDone: false },],
        "todolistId2":
            [{ id: "1", title: "Milk", isDone: true },
            { id: "2", title: "Cola", isDone: true },
            { id: "3", title: "Limon", isDone: false },],
    }

    const endState = tasksReducer(startState, removeTaskAC("2", "todolistId2"))

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(2);
    expect(endState["todolistId2"].every(item => item.id !== "2")).toBeTruthy();

});

test('correct task should be added', () => {

    const startState: TasksStateType = {
        "todolistId1":
            [{ id: "1", title: "HTML", isDone: true },
            { id: "2", title: "CSS", isDone: true },
            { id: "3", title: "JS", isDone: false },],
        "todolistId2":
            [{ id: "1", title: "Milk", isDone: true },
            { id: "2", title: "Cola", isDone: true },
            { id: "3", title: "Limon", isDone: false },],
    }

    const endState = tasksReducer(startState, addTaskAC("Beer", "todolistId2"))

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("Beer");
    expect(endState["todolistId2"][0].isDone).toBe(false);
});

test('status of specified task should be changed', () => {

    const startState: TasksStateType = {
        "todolistId1":
            [{ id: "1", title: "HTML", isDone: true },
            { id: "2", title: "CSS", isDone: true },
            { id: "3", title: "JS", isDone: false },],
        "todolistId2":
            [{ id: "1", title: "Milk", isDone: true },
            { id: "2", title: "Cola", isDone: true },
            { id: "3", title: "Limon", isDone: false },],
    }

    const endState = tasksReducer(startState, changeTaskStatuskAC("2", false, "todolistId2"))


    expect(endState["todolistId2"][1].isDone).toBe(false);
    expect(endState["todolistId1"][1].isDone).toBe(true);
    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(3);


    // expect(endState["todolistId1"].length).toBe(3);
    // expect(endState["todolistId2"].length).toBe(4);
    // expect(endState["todolistId2"][0].id).toBeDefined();
    // expect(endState["todolistId2"][0].title).toBe("Beer");
    // expect(endState["todolistId2"][0].isDone).toBe(false);
});

test('title of specified task should be changed', () => {

    const startState: TasksStateType = {
        "todolistId1":
            [{ id: "1", title: "HTML", isDone: true },
            { id: "2", title: "CSS", isDone: true },
            { id: "3", title: "JS", isDone: false },],
        "todolistId2":
            [{ id: "1", title: "Milk", isDone: true },
            { id: "2", title: "Cola", isDone: true },
            { id: "3", title: "Limon", isDone: false },],
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
            [{ id: "1", title: "HTML", isDone: true },
            { id: "2", title: "CSS", isDone: true },
            { id: "3", title: "JS", isDone: false },],
        "todolistId2":
            [{ id: "1", title: "Milk", isDone: true },
            { id: "2", title: "Cola", isDone: true },
            { id: "3", title: "Limon", isDone: false },],
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
 