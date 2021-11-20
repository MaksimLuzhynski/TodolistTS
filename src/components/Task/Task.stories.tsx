import React from 'react'
import { Task } from "./Task";
import { Meta } from '@storybook/react';
import { action } from '@storybook/addon-actions'


export default {
    component: Task,
    title: 'Components/Task',
} as Meta;

const callbackRemoveTask = action('Task was removed')
const callbackChangeTaskStatus = action('Task status was changed')
const callbackChangeTaskTitle = action('Task title was changed')


export const TaskExample: React.VFC<{}> = () => <>
    <Task

        task={{ id: "1", title: "HTML", isDone: true }}
        todolistId={"Todolist 1"}
        removeTask={callbackRemoveTask}
        changeTaskStatus={callbackChangeTaskStatus}
        changeTaskTitle={callbackChangeTaskTitle}
    />
    <Task

        task={{ id: "2", title: "Milk", isDone: false }}
        todolistId={"Todolist 2"}
        removeTask={callbackRemoveTask}
        changeTaskStatus={callbackChangeTaskStatus}
        changeTaskTitle={callbackChangeTaskTitle}
    />
</>