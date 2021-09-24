import { Button, Checkbox, IconButton } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
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
            <h2>
                <EditableSpan
                    onChangeTitle={changeTodolistTitleHandler}
                    title={props.title}
                />
                <IconButton >
                    <Delete
                        onClick={removeTodolist}
                    />
                </IconButton>
            </h2>

            <AddItemForm addItem={addTask} />

            <div>
                {
                    props.tasks.map((item) => {

                        const onRemoveHandler = () => { props.removeTask(item.id, props.id) }
                        const onChangeStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(item.id, event.currentTarget.checked, props.id)
                        }
                        const onChangeTitleHandler = (newTitle: string) => {
                            props.changeTaskTitle(item.id, newTitle, props.id)
                        }

                        return <div key={item.id} className={item.isDone ? styles.is_done : ""}>
                            <Checkbox
                                checked={item.isDone}
                                onChange={onChangeStatusHandler}
                                style={{ color: "#61dafb" }}
                            />
                            <EditableSpan
                                onChangeTitle={onChangeTitleHandler}
                                title={item.title}
                            />
                            <IconButton >
                                <Delete
                                    onClick={onRemoveHandler}
                                />
                            </IconButton>
                        </div>
                    })
                }
            </div>
            <div>
                <Button
                    onClick={onAllClickHandler}
                    variant={props.filter === "all" ? "contained" : "outlined"}
                    // className={props.filter === "all" ? styles.active_filter : ""}
                    style={props.filter === "all"
                        ? { backgroundColor: "#61dafb", color: "", margin: "3px" }
                        : { backgroundColor: "", color: "#61dafb", border: " 1px solid #61dafb", margin: "3px" }}
                > All</Button>
                <Button
                    onClick={onActiveClickHandler}
                    variant={props.filter === "active" ? "contained" : "outlined"}
                    // className={props.filter === "active" ? styles.active_filter : ""}
                    style={props.filter === "active"
                        ? { backgroundColor: "#61dafb", color: "", margin: "3px" }
                        : { backgroundColor: "", color: "#61dafb", border: " 1px solid #61dafb", margin: "3px" }}
                >Active</Button>
                <Button
                    onClick={onCompletedClickHandler}
                    variant={props.filter === "completed" ? "contained" : "outlined"}
                    // className={props.filter === "completed" ? styles.active_filter : ""}
                    style={props.filter === "completed"
                        ? { backgroundColor: "#61dafb", color: "", margin: "3px" }
                        : { backgroundColor: "", color: "#61dafb", border: " 1px solid #61dafb", margin: "3px" }}
                >Completed</Button>
            </div>
        </div>
    </div>)
}
