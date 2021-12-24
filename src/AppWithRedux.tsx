import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@material-ui/core';
import './App.css';
import { AddItemForm } from './components/AddItemForm/AddItemForm';
import { Todolist } from './components/Todolist/Todolist';
import { Menu } from '@material-ui/icons';
import { changeTodolistFilterAC, TodolistType, FilterValueType, fetchTodolistsTC, removeTodolistTC, addTodolistTC, changeTodolistTitleTC } from './state/todolists-reducer';
import { addTaskTC, removeTasksTC, TaskType, updateTaskTC } from './state/tasks-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { RootStateType } from './state/store';
import { useCallback, useEffect } from 'react';
import { TaskStatuses } from './api/tasks-api';



export type TasksStateType = {
    [key: string]: Array<TaskType>
}


export function AppWithRedux() {

    const dispatch = useDispatch();
    const todolists = useSelector<RootStateType, Array<TodolistType>>(store => store.todolists);
    const tasks = useSelector<RootStateType, TasksStateType>(store => store.tasks);

    useEffect(() => {
        dispatch(fetchTodolistsTC());
    }, [])

    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistTC(todolistId));
    }, [dispatch]);

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title));
    }, [dispatch]);

    const changeTodolistTitle = useCallback((todolistId: string, newTitle: string) => {
        dispatch(changeTodolistTitleTC(todolistId, newTitle));
    }, [dispatch]);

    const changeFilter = useCallback((value: FilterValueType, todolistId: string) => {
        dispatch(changeTodolistFilterAC(todolistId, value));
    }, [dispatch]);

    const removeTask = useCallback((id: string, todolistId: string) => {
        dispatch(removeTasksTC(todolistId, id));
    }, [dispatch]);

    const addTask = useCallback((newTaskTitle: string, todolistId: string) => {
        dispatch(addTaskTC(newTaskTitle, todolistId))
    }, [dispatch]);

    const changeTaskStatus = useCallback((id: string, status: TaskStatuses, todolistId: string) => {
        dispatch(updateTaskTC(todolistId, { status: status }, id))
    }, [dispatch]);

    const changeTaskTitle = useCallback((id: string, newTitle: string, todolistId: string) => {
        dispatch(updateTaskTC(todolistId, { title: newTitle }, id))
    }, [dispatch]);



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
                            let tasksForTodolist = tasks[item.id];
                            return (
                                <Grid item>
                                    <Paper style={{ padding: "20px", backgroundColor: " #263648" }}>      {/*ЦВЕТ #23272e*/}
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

export default AppWithRedux;

