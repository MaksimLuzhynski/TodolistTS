import { ChangeEvent, KeyboardEvent, useState } from 'react'
import { FilterValueType, TaskType } from '../../App'
import styles from './Todolist.module.css'

export type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    id: string
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterValueType, todolistId: string) => void
    addTask: (newTaskTitle: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist:(todolistId: string)=>void
    filter: FilterValueType

}

export function Todolist(props: TodolistPropsType) {

    let [newTaskTitle, setNewTaskTitle] = useState("")
    let [error, setError] = useState<null | string>(null)

    const onNewTaskTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setError(null);
        setNewTaskTitle(event.currentTarget.value);
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.charCode === 13) {
            addNewTaskTitle();
        }
    }

    const addNewTaskTitle = () => {
        if (newTaskTitle.trim() !== "") {
            props.addTask(newTaskTitle, props.id);
            setNewTaskTitle("");
        }
        else {
            setError("Field is required!");
            setNewTaskTitle("");
        }
    }
    const removeTodolist=()=>{
        props.removeTodolist(props.id)
    }

    const onAllClickHandler = () => { props.changeFilter("all", props.id) }
    const onActiveClickHandler = () => { props.changeFilter("active", props.id) }
    const onCompletedClickHandler = () => { props.changeFilter("completed", props.id) }

    return (<div className={styles.todolist}>
        <div>
            <h3>{props.title}<button onClick={removeTodolist}>X</button></h3> 
            <div>
                <input
                    className={error ? styles.error : ""}
                    value={newTaskTitle}
                    onChange={onNewTaskTitleChangeHandler}
                    onKeyPress={onKeyPressHandler}
                />
                <button
                    onClick={addNewTaskTitle}>+</button>
            </div>
            {error && <div className={styles.error_message}>{error}</div>}
            <ul>
                {
                    props.tasks.map((item) => {

                        const onRemoveHandler = () => { props.removeTask(item.id, props.id) }
                        const onChangeStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(item.id, event.currentTarget.checked, props.id)
                        }

                        return <li key={item.id} className={item.isDone ? styles.is_done : ""}>
                            <input
                                type="checkbox"
                                checked={item.isDone}
                                onChange={onChangeStatusHandler}
                            />
                            <span>{item.title}</span>
                            <button onClick={onRemoveHandler}>X</button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button
                    className={props.filter === "all" ? styles.active_filter : ""}
                    onClick={onAllClickHandler}> All</button>
                <button
                    className={props.filter === "active" ? styles.active_filter : ""}
                    onClick={onActiveClickHandler}>Active</button>
                <button
                    className={props.filter === "completed" ? styles.active_filter : ""}
                    onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    </div>)
}