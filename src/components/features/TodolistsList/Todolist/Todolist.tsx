import { Delete } from '@mui/icons-material'
import { Button } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import React, { useEffect } from 'react'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { TaskStatuses } from '../../../../api/tasks-api'
import { fetchTasksTC, TaskType } from '../../../../state/tasks-reducer'
import { FilterValueType, TodolistType } from '../../../../state/todolists-reducer'
import { AddItemForm } from '../../../AddItemForm/AddItemForm'
import { EditableSpan } from '../../../EditableSpan/EditableSpan'
import { Task } from './Task/Task'
// import styles from './Todolist.module.css'
import styles from './Todolist.module.css'

export type TodolistPropsType = {
    // id: string
    // filter: FilterValueType
    // title: string
    todolist: TodolistType
    tasks: Array<TaskType>
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

        dispatch(fetchTasksTC(props.todolist.id));
    }, []);


    const removeTodolist = () => {
        props.removeTodolist(props.todolist.id)
    }
    const changeTodolistTitleHandler = useCallback((newTitle: string) => {
        props.changeTodolistTitle(props.todolist.id, newTitle)
    }, [props.changeTodolistTitle, props.todolist.id])
    const addTaskHandler = useCallback((title: string) => { props.addTask(title, props.todolist.id) }, [props.addTask, props.todolist.id])

    const onAllClickHandler = useCallback(() => { props.changeFilter("all", props.todolist.id) }, [props.changeFilter, props.todolist.id])
    const onActiveClickHandler = useCallback(() => { props.changeFilter("active", props.todolist.id) }, [props.changeFilter, props.todolist.id])
    const onCompletedClickHandler = useCallback(() => { props.changeFilter("completed", props.todolist.id) }, [props.changeFilter, props.todolist.id])

    let tasksForTodolist = props.tasks;
    if (props.todolist.filter === "active") {
        tasksForTodolist = tasksForTodolist.filter(item => item.status === TaskStatuses.New);
    }
    if (props.todolist.filter === "completed") {
        tasksForTodolist = tasksForTodolist.filter(item => item.status === TaskStatuses.Completed);
    }


    return (<div className={styles.todolist}>
        <div>
            <h2>
                <EditableSpan
                    onChangeTitle={changeTodolistTitleHandler}
                    title={props.todolist.title}
                />

                <IconButton
                    disabled={props.todolist.entytiStatus === 'loading'}
                    onClick={removeTodolist} >
                    <Delete />
                </IconButton>
            </h2>

            <AddItemForm
                addItem={addTaskHandler}
                disabled={props.todolist.entytiStatus === 'loading'}
            />

            <div>
                {
                    tasksForTodolist.map((item) => {

                        return <Task
                            key={item.id}
                            task={item}
                            todolistId={props.todolist.id}
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
                    variant={props.todolist.filter === "all" ? "contained" : "outlined"}
                    // className={props.filter === "all" ? styles.active_filter : ""}
                    style={props.todolist.filter === "all"
                        ? { backgroundColor: "#61dafb", color: "", margin: "3px" }
                        : { backgroundColor: "", color: "#61dafb", border: " 1px solid #61dafb", margin: "3px" }}
                > All</Button>
                <Button
                    onClick={onActiveClickHandler}
                    variant={props.todolist.filter === "active" ? "contained" : "outlined"}
                    // className={props.filter === "active" ? styles.active_filter : ""}
                    style={props.todolist.filter === "active"
                        ? { backgroundColor: "#61dafb", color: "", margin: "3px" }
                        : { backgroundColor: "", color: "#61dafb", border: " 1px solid #61dafb", margin: "3px" }}
                >Active</Button>
                <Button
                    onClick={onCompletedClickHandler}
                    variant={props.todolist.filter === "completed" ? "contained" : "outlined"}
                    // className={props.filter === "completed" ? styles.active_filter : ""}
                    style={props.todolist.filter === "completed"
                        ? { backgroundColor: "#61dafb", color: "", margin: "3px" }
                        : { backgroundColor: "", color: "#61dafb", border: " 1px solid #61dafb", margin: "3px" }}
                >Completed</Button>
            </div>
        </div>
    </div>)
})
