import { Button } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import { Delete } from '@material-ui/icons'
import React from 'react'
import { useCallback, useMemo } from 'react'
import { FilterValueType, TaskType } from '../../App'
import { AddItemForm } from '../AddItemForm/AddItemForm'
import { EditableSpan } from '../EditableSpan/EditableSpan'
import { Task } from '../Task/Task'
import styles from './Todolist.module.css'

export type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    id: string
    filter: FilterValueType
    removeTask: (id: string, todolistId: string) => void
    addTask: (newTaskTitle: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
    changeFilter: (value: FilterValueType, todolistId: string) => void
}

export const Todolist = React.memo((props: TodolistPropsType) => {

    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
    const changeTodolistTitleHandler = useCallback((newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }, [props.changeTodolistTitle, props.id])
    const addTaskHandler = useCallback((title: string) => { props.addTask(title, props.id) }, [props.addTask, props.id])

    const onAllClickHandler = useCallback(() => { props.changeFilter("all", props.id) }, [props.changeFilter, props.id])
    const onActiveClickHandler = useCallback(() => { props.changeFilter("active", props.id) }, [props.changeFilter, props.id])
    const onCompletedClickHandler = useCallback(() => { props.changeFilter("completed", props.id) }, [props.changeFilter, props.id])

    let tasksForTodolist = props.tasks;
    if (props.filter === "active") {
        tasksForTodolist = tasksForTodolist.filter(item => item.isDone === false);
    }
    if (props.filter === "completed") {
        tasksForTodolist = tasksForTodolist.filter(item => item.isDone === true);
    }


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

            <AddItemForm addItem={addTaskHandler} />

            <div>
                {
                    tasksForTodolist.map((item) => {

                        return <Task
                            key={item.id}
                            task={item}
                            todolistId={props.id}
                            removeTask={props.removeTask}
                            changeTaskStatus={props.changeTaskStatus}
                            changeTaskTitle={props.changeTaskTitle}
                        />
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
})






type TaskPropsType = {
    task: TaskType
    todolistId: string
    removeTask: (id: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
}

// export const Task = React.memo((props: TaskPropsType) => {
//     const onRemoveHandler = useCallback(() => { props.removeTask(props.task.id, props.todolistId) }, [props.removeTask, props.task.id, props.todolistId])
//     const onChangeStatusHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
//         props.changeTaskStatus(props.task.id, event.currentTarget.checked, props.todolistId)
//     }, [props.changeTaskStatus, props.task.id, props.todolistId])

//     const onChangeTitleHandler = useCallback((newTitle: string) => {
//         props.changeTaskTitle(props.task.id, newTitle, props.todolistId)
//     }, [props.changeTaskTitle, props.task.id, props.todolistId])

//     return <div key={props.task.id} className={props.task.isDone ? styles.is_done : ""}>
//         <Checkbox
//             checked={props.task.isDone}
//             onChange={onChangeStatusHandler}
//             style={{ color: "#61dafb" }}
//         />
//         <EditableSpan
//             onChangeTitle={onChangeTitleHandler}
//             title={props.task.title}
//         />
//         <IconButton >
//             <Delete
//                 onClick={onRemoveHandler}
//             />
//         </IconButton>
//     </div>
// })