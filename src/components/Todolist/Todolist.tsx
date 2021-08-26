import { FilterValueType, TaskType } from '../../App'
import styles from './Todolist.module.css'

export type TodolistPropsType = {
    title: string
    task: Array<TaskType>
    removeTask: (id: number) => void
    changeFilter: (value: FilterValueType) => void
}

export function Todolist(props: TodolistPropsType) {

    return (<div className={styles.todolist}>
        <div>
            <h3>{props.title}</h3>
            <div>
                <input />
                <button>+</button>
            </div>
            <ul>
                {
                    props.task.map(item =>
                        <li key={item.id}>
                            <input type="checkbox" checked={item.isDone} />
                            <span>{item.title}</span>
                            <button onClick={() => { props.removeTask(item.id) }}>X</button>
                        </li>)
                }
            </ul>
            <div>
                <button onClick={() => props.changeFilter("all")}>All</button>
                <button onClick={() => props.changeFilter("active")}>Active</button>
                <button onClick={() => props.changeFilter("completed")}>Completed</button>
            </div>
        </div>
    </div>)
}