import React, { useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import { Todolist } from './components/Todolist/Todolist';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValueType = "all" | "active" | "completed"

function App() {

    let [task, setTask] = useState<Array<TaskType>>([
        { id: v1(), title: "HTML", isDone: true },
        { id: v1(), title: "CSS", isDone: true },
        { id: v1(), title: "JS", isDone: false },
    ]);

    let [filter, setFilter] = useState<FilterValueType>("all");

    function removeTask(id: string) {
        let filteredTask = task.filter(item => item.id !== id)
        setTask(filteredTask);
    }

    function addTask(newTaskTitle: string) {
        let newTask = { id: v1(), title: newTaskTitle, isDone: false };
        setTask([newTask, ...task]);
    }

    function changeFilter(value: FilterValueType) {
        setFilter(value);
    }

    let tasksForTodolist = task;
    if (filter === "active") {
        tasksForTodolist = task.filter(item => item.isDone === false)
    }
    if (filter === "completed") {
        tasksForTodolist = task.filter(item => item.isDone === true)
    }

    return (
        <div className="App">
            <Todolist
                title="What to learn"
                task={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
            />
        </div>
    );
}

export default App;


