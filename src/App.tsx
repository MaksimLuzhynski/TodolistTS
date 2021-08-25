import React from 'react';
import './App.css';
import { Todolist } from './components/Todolist/Todolist';

export type TaskType = {
  id: number
  title: string
  isDone: boolean
}

function App() {

  let tasks1: Array<TaskType> = [
    { id: 1, title: "HTML", isDone: true },
    { id: 2, title: "CSS", isDone: true },
    { id: 3, title: "JS", isDone: false },
  ]

  let tasks2: Array<TaskType> = [
    { id: 1, title: "Milk", isDone: true },
    { id: 2, title: "Bread", isDone: false },
    { id: 3, title: "Sausage", isDone: true },
  ]

  return (
    <div className="App">
      <Todolist
        title="What to learn"
        task={tasks1}
      />
      <Todolist
        title="What to buy"
        task={tasks2}
      />
    </div>
  );
}

export default App;
