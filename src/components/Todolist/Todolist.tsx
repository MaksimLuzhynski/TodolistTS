import { ChangeEvent, KeyboardEvent, useState } from 'react'
import { FilterValueType, TaskType } from '../../App'
import styles from './Todolist.module.css'

export type TodolistPropsType = {
    title: string
    task: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValueType) => void
    addTask: (newTaskTitle: string) => void
}

export function Todolist(props: TodolistPropsType) {

    let [newTaskTitle, setNewTaskTitle] = useState("")

    const onNewTaskTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => { setNewTaskTitle(event.currentTarget.value) }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.charCode === 13) {
            props.addTask(newTaskTitle);
            setNewTaskTitle("");
        }
    }
    const addTask = () => {
        props.addTask(newTaskTitle);
        setNewTaskTitle("");
    }
    const onAllClickHandler = () => { props.changeFilter("all") }
    const onActiveClickHandler = () => { props.changeFilter("active") }
    const onCompletedClickHandler = () => { props.changeFilter("completed") }

    return (<div className={styles.todolist}>
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={newTaskTitle}
                    onChange={onNewTaskTitleChangeHandler}
                    onKeyPress={onKeyPressHandler}
                />
                <button
                    onClick={addTask}>+</button>
            </div>
            <ul>
                {
                    props.task.map((item) => {
                        const onRemoveHandler = () => { props.removeTask(item.id) }
                        return <li key={item.id}>
                            <input type="checkbox" checked={item.isDone} />
                            <span>{item.title}</span>
                            <button onClick={onRemoveHandler}>X</button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    </div>)
}