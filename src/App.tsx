import React, { useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import { Todolist } from './components/Todolist/Todolist';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TodolistsType = {
    id: string
    title: string
    filter: FilterValueType
}
export type FilterValueType = "all" | "active" | "completed"

function App() {

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        { id: todolistId1, title: "What to learn", filter: "all" },
        { id: todolistId2, title: "What to buy", filter: "completed" },
    ]);

    let [tasksObj, setTasks] = useState({                                          //ТИПИЗАЦИЯ
        [todolistId1]:
            [{ id: v1(), title: "HTML", isDone: true },
            { id: v1(), title: "CSS", isDone: true },
            { id: v1(), title: "JS", isDone: false },],
        [todolistId2]:
            [{ id: v1(), title: "Milk", isDone: true },
            { id: v1(), title: "Cola", isDone: true },
            { id: v1(), title: "Limon", isDone: false },],
    })

    function removeTodolist(todolistId: string) {
        let filteredTodolists = todolists.filter(item => item.id !== todolistId);
        setTodolists(filteredTodolists);

        delete tasksObj[todolistId];
        setTasks({...tasksObj});
    }

    function removeTask(id: string, todolistId: string) {
        let tasks = tasksObj[todolistId];
        let filteredTask = tasks.filter(item => item.id !== id);
        tasksObj[todolistId] = filteredTask;
        setTasks({ ...tasksObj });
    }

    function addTask(newTaskTitle: string, todolistId: string) {
        let newTask = { id: v1(), title: newTaskTitle, isDone: false };
        tasksObj[todolistId] = [newTask, ...tasksObj[todolistId]]
        setTasks({ ...tasksObj });
    }

    function changeTaskStatus(id: string, isDone: boolean, todolistId: string) {
        let task = tasksObj[todolistId].find(item => item.id === id)
        if (task) {
            task.isDone = isDone;
            setTasks({ ...tasksObj });
        }
    }

    function changeFilter(value: FilterValueType, todolistId: string) {
        let todolist = todolists.find(item => item.id === todolistId)
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists])
        }
    }


    return (
        <div className="App">
            {
                todolists.map((item) => {
                    let tasksForTodolist = tasksObj[item.id];
                    if (item.filter === "active") {
                        tasksForTodolist = tasksForTodolist.filter(item => item.isDone === false)
                    }
                    if (item.filter === "completed") {
                        tasksForTodolist = tasksForTodolist.filter(item => item.isDone === true)
                    }
                    return (
                        <Todolist
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            tasks={tasksForTodolist}
                            filter={item.filter}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeTaskStatus={changeTaskStatus}
                            removeTodolist={removeTodolist}
                        />)
                })
            }
        </div>
    );
}

export default App;


