import React, { useState } from 'react';
import './App.css';
import { Todolist } from './components/Todolist/Todolist';

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}
export type FilterValueType = "all" | "active" | "completed"

function App() {

    let [task, setTask] = useState<Array<TaskType>>([
        { id: 1, title: "HTML", isDone: true },
        { id: 2, title: "CSS", isDone: true },
        { id: 3, title: "JS", isDone: false },
    ]);

    let [filter, setFilter] = useState<FilterValueType>("all");

    function removeTask(id: number) {
        let filteredTask = task.filter(item => item.id !== id)
        setTask(filteredTask);
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
            />
        </div>
    );
}

export default App;


