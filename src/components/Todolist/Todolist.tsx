import { ChangeEvent } from 'react'
import { FilterValueType, TaskType } from '../../App'
import { AddItemForm } from '../AddItemForm/AddItemForm'
import { EditableSpan } from '../EditableSpan/EditableSpan'
import styles from './Todolist.module.css'

export type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    id: string
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterValueType, todolistId: string) => void
    addTask: (newTaskTitle: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
    filter: FilterValueType

}

export function Todolist(props: TodolistPropsType) {

    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
    const changeTodolistTitleHandler = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }

    const onAllClickHandler = () => { props.changeFilter("all", props.id) }
    const onActiveClickHandler = () => { props.changeFilter("active", props.id) }
    const onCompletedClickHandler = () => { props.changeFilter("completed", props.id) }

    const addTask = (title: string) => { props.addTask(title, props.id) }

    return (<div className={styles.todolist}>
        <div>
            <h3>
                <EditableSpan
                    title={props.title}
                    onChangeTitle={changeTodolistTitleHandler}
                />
                <button onClick={removeTodolist}>X</button>
            </h3>

            <AddItemForm addItem={addTask} />

            <ul>
                {
                    props.tasks.map((item) => {

                        const onRemoveHandler = () => { props.removeTask(item.id, props.id) }
                        const onChangeStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(item.id, event.currentTarget.checked, props.id)
                        }
                        const onChangeTitleHandler = (newTitle: string) => {
                            props.changeTaskTitle(item.id, newTitle, props.id)
                        }

                        return <li key={item.id} className={item.isDone ? styles.is_done : ""}>
                            <input
                                type="checkbox"
                                checked={item.isDone}
                                onChange={onChangeStatusHandler}
                            />
                            <EditableSpan
                                title={item.title}
                                onChangeTitle={onChangeTitleHandler}
                            />
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
