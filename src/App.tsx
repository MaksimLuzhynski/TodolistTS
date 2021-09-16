import { title } from 'process';
import React, { useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import { AddItemForm } from './components/AddItemForm/AddItemForm';
import { Todolist } from './components/Todolist/Todolist';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
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
        { id: todolistId2, title: "What to buy", filter: "all" },
    ]);

    let [tasksObj, setTasks] = useState<TasksStateType>({
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
        setTasks({ ...tasksObj });
    }

    function addTodolist(title: string) {
        let newTodolist: TodolistsType = { id: v1(), title: title, filter: "all" };
        setTodolists([newTodolist, ...todolists]);
        setTasks({ [newTodolist.id]: [], ...tasksObj });
    }

    function changeTodolistTitle(todolistId: string, newTitle: string) {
        let todolist = todolists.find(item => item.id === todolistId);
        if (todolist) {
            todolist.title = newTitle;
            setTodolists([...todolists]);
        }
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

    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        let task = tasksObj[todolistId].find(item => item.id === id)
        if (task) {
            task.title = newTitle;
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

            <AddItemForm addItem={addTodolist} />

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
                            changeFilter={changeFilter}
                            removeTask={removeTask}
                            addTask={addTask}
                            changeTaskStatus={changeTaskStatus}
                            changeTaskTitle={changeTaskTitle}
                            removeTodolist={removeTodolist}
                            changeTodolistTitle={changeTodolistTitle}
                        />)
                })
            }
        </div>
    );
}

export default App;


