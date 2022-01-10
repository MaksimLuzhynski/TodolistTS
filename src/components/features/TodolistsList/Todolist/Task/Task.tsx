import React, { ChangeEvent, useCallback } from "react"
import { Checkbox, IconButton } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import { EditableSpan } from "../../../../EditableSpan/EditableSpan"
import styles from './Task.module.css'
import { TaskStatuses } from "../../../../../api/tasks-api"
import { TaskType } from "../../../../../state/tasks-reducer"


type TaskPropsType = {
    task: TaskType
    todolistId: string
    removeTask: (id: string, todolistId: string) => void
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
}

export const Task = React.memo((props: TaskPropsType) => {
    const onRemoveHandler = useCallback(() => { props.removeTask(props.task.id, props.todolistId) }, [props.removeTask, props.task.id, props.todolistId])
    const onChangeStatusHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.task.id, event.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New, props.todolistId)
    }, [props.changeTaskStatus, props.task.id, props.todolistId])

    const onChangeTitleHandler = useCallback((newTitle: string) => {
        props.changeTaskTitle(props.task.id, newTitle, props.todolistId)
    }, [props.changeTaskTitle, props.task.id, props.todolistId])

    return <div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? styles.is_done : ""}>
        <Checkbox
            checked={props.task.status === TaskStatuses.Completed}
            onChange={onChangeStatusHandler}
            style={{ color: "#61dafb" }}
        />
        <EditableSpan
            onChangeTitle={onChangeTitleHandler}
            title={props.task.title}
        />
        <IconButton >
            <Delete
                onClick={onRemoveHandler}
            />
        </IconButton>
    </div>
})