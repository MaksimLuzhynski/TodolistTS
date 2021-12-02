import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@material-ui/core';
import { useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import { AddItemForm } from './components/AddItemForm/AddItemForm';
import { Todolist } from './components/Todolist/Todolist';
import { Menu } from '@material-ui/icons';
import { FilterValueType, TodolistType } from './state/todolists-reducer';
import { TaskType } from './state/tasks-reducer';
import { TaskPriorities, TaskStatuses } from './api/tasks-api';


export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        { id: todolistId1, title: "What to learn", filter: "all", addedDate: "", order: 0 },
        { id: todolistId2, title: "What to buy", filter: "all", addedDate: "", order: 0 },
    ]);

    let [tasksObj, setTasks] = useState<TasksStateType>({
        [todolistId1]:
            [{ id: v1(), title: "HTML", status: TaskStatuses.Completed, todoListId: todolistId1, description: "", priority: TaskPriorities.Low, startDate: "", deadline: "", order: 0, addedDate: "" },
            { id: v1(), title: "CSS", status: TaskStatuses.Completed, todoListId: todolistId1, description: "", priority: TaskPriorities.Low, startDate: "", deadline: "", order: 0, addedDate: "" },
            { id: v1(), title: "JS", status: TaskStatuses.New, todoListId: todolistId1, description: "", priority: TaskPriorities.Low, startDate: "", deadline: "", order: 0, addedDate: "" },
            { id: v1(), title: "React", status: TaskStatuses.New, todoListId: todolistId1, description: "", priority: TaskPriorities.Low, startDate: "", deadline: "", order: 0, addedDate: "" },
            { id: v1(), title: "Vue", status: TaskStatuses.New, todoListId: todolistId1, description: "", priority: TaskPriorities.Low, startDate: "", deadline: "", order: 0, addedDate: "" },],
        [todolistId2]:
            [{ id: v1(), title: "Milk", status: TaskStatuses.Completed, todoListId: todolistId2, description: "", priority: TaskPriorities.Low, startDate: "", deadline: "", order: 0, addedDate: "" },
            { id: v1(), title: "Cola", status: TaskStatuses.Completed, todoListId: todolistId2, description: "", priority: TaskPriorities.Low, startDate: "", deadline: "", order: 0, addedDate: "" },
            { id: v1(), title: "Limon", status: TaskStatuses.New, todoListId: todolistId2, description: "", priority: TaskPriorities.Low, startDate: "", deadline: "", order: 0, addedDate: "" },
            { id: v1(), title: "Beer", status: TaskStatuses.New, todoListId: todolistId2, description: "", priority: TaskPriorities.Low, startDate: "", deadline: "", order: 0, addedDate: "" },],
    })

    function removeTodolist(todolistId: string) {
        let filteredTodolists = todolists.filter(item => item.id !== todolistId);
        setTodolists(filteredTodolists);

        delete tasksObj[todolistId];
        setTasks({ ...tasksObj });
    }

    function addTodolist(title: string) {
        let newTodolist: TodolistType = { id: v1(), title: title, filter: "all", addedDate: "", order: 0 };
        setTodolists([...todolists, newTodolist]);
        setTasks({ [newTodolist.id]: [], ...tasksObj });
    }

    function changeTodolistTitle(todolistId: string, newTitle: string) {
        let todolist = todolists.find(item => item.id === todolistId);
        if (todolist) {
            todolist.title = newTitle;
            setTodolists([...todolists]);
        }
    }

    function removeTask(id: string, todolistId: string) {
        let tasks = tasksObj[todolistId];
        let filteredTask = tasks.filter(item => item.id !== id);
        tasksObj[todolistId] = filteredTask;
        setTasks({ ...tasksObj });
    }

    function addTask(newTaskTitle: string, todolistId: string) {
        let newTask = { id: v1(), title: newTaskTitle, todoListId: todolistId, status: TaskStatuses.New, description: "", priority: TaskPriorities.Low, startDate: "", deadline: "", order: 0, addedDate: "" };
        tasksObj[todolistId] = [newTask, ...tasksObj[todolistId]]
        setTasks({ ...tasksObj });
    }

    function changeTaskStatus(id: string, status: TaskStatuses, todolistId: string) {
        let task = tasksObj[todolistId].find(item => item.id === id)
        if (task) {
            task.status = status;
            setTasks({ ...tasksObj });
        }
    }

    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        let task = tasksObj[todolistId].find(item => item.id === id)
        if (task) {
            task.title = newTitle;
            setTasks({ ...tasksObj });
        }
    }

    function changeFilter(value: FilterValueType, todolistId: string) {
        let todolist = todolists.find(item => item.id === todolistId)
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists])
        }
    }


    return (
        <div className="App">

            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        // size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                    // sx={{ mr: 2 }}
                    >
                        <Menu />
                    </IconButton>
                    <Typography
                        variant="h6"
                    // component="div"
                    // sx={{ flexGrow: 1 }}
                    >
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{ padding: "20px" }}>
                    <AddItemForm addItem={addTodolist} />
                </Grid>
                <Grid container spacing={10}>
                    {
                        todolists.map((item) => {
                            let tasksForTodolist = tasksObj[item.id];
                            if (item.filter === "active") {
                                tasksForTodolist = tasksForTodolist.filter(item => item.status === TaskStatuses.New)
                            }
                            if (item.filter === "completed") {
                                tasksForTodolist = tasksForTodolist.filter(item => item.status === TaskStatuses.Completed)
                            }

                            return (
                                <Grid item>
                                    <Paper style={{ padding: "20px", backgroundColor: " #23272e" }}>
                                        <Todolist
                                            key={item.id}
                                            id={item.id}
                                            title={item.title}
                                            tasks={tasksForTodolist}
                                            filter={item.filter}
                                            changeFilter={changeFilter}
                                            removeTask={removeTask}
                                            addTask={addTask}
                                            changeTaskStatus={changeTaskStatus}
                                            changeTaskTitle={changeTaskTitle}
                                            removeTodolist={removeTodolist}
                                            changeTodolistTitle={changeTodolistTitle}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default App;


