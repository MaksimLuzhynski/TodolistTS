import { Button } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import { Delete } from '@material-ui/icons'
import React, { useEffect } from 'react'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { TaskStatuses } from '../../api/tasks-api'
import { fetchTasksTC, TaskType } from '../../state/tasks-reducer'
import { FilterValueType } from '../../state/todolists-reducer'
import { AddItemForm } from '../AddItemForm/AddItemForm'
import { EditableSpan } from '../EditableSpan/EditableSpan'
import { Task } from '../Task/Task'
// import styles from './Todolist.module.css'
import styles from './Todolist.module.css'

export type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    id: string
    filter: FilterValueType
    removeTask: (id: string, todolistId: string) => void
    addTask: (newTaskTitle: string, todolistId: string) => void
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
    changeFilter: (value: FilterValueType, todolistId: string) => void
}

export const Todolist = React.memo((props: TodolistPropsType) => {

    const dispatch = useDispatch();

    useEffect(() => {

        // todolistsAPI.getTodolists()
        //     .then(res => {
        //         dispatch(setTodolistsAC(res.data))
        //     })

        // fetchTodolistsThunk(dispatch);

        dispatch(fetchTasksTC(props.id));
    }, []);


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
        tasksForTodolist = tasksForTodolist.filter(item => item.status === TaskStatuses.New);
    }
    if (props.filter === "completed") {
        tasksForTodolist = tasksForTodolist.filter(item => item.status === TaskStatuses.Completed);
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
