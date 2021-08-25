import { TaskType } from '../../App'
import styles from './Todolist.module.css'

export type TodolistPropsType = {
    title: string
    task: Array<TaskType>
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
                <li><input type="checkbox" checked={props.task[0].isDone} /><span>{props.task[0].title}</span></li>
                <li><input type="checkbox" checked={props.task[1].isDone} /><span>{props.task[1].title}</span></li>
                <li><input type="checkbox" checked={props.task[2].isDone} /><span>{props.task[2].title}</span></li>
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    </div>)
}