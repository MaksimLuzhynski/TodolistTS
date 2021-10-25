import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@material-ui/core';
import './App.css';
import { AddItemForm } from './components/AddItemForm/AddItemForm';
import { Todolist } from './components/Todolist/Todolist';
import { Menu } from '@material-ui/icons';
import { addTodolistAC, changeTodolistAC, changeTodolistFilterAC, removeTodolistAC, todolistId1, todolistId2, todolistsReducer } from './state/todolists-reducer';
import { addTaskAC, changeTaskStatuskAC, changeTaskTitleAC, removeTaskAC } from './state/tasks-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { RootStateType } from './state/store';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}
export type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}
export type FilterValueType = "all" | "active" | "completed"

function AppWithRedux() {

    const dispatch = useDispatch();
    const todolists = useSelector<RootStateType, Array<TodolistType>>(store => store.todolists);
    const tasks = useSelector<RootStateType, TasksStateType>(store => store.tasks);


    function removeTodolist(todolistId: string) {
        dispatch(removeTodolistAC(todolistId));
    }

    function addTodolist(title: string) {
        let action = addTodolistAC(title)
        dispatch(action);
    }

    function changeTodolistTitle(todolistId: string, newTitle: string) {
        dispatch(changeTodolistAC(todolistId, newTitle));
    }

    function changeFilter(value: FilterValueType, todolistId: string) {
        dispatch(changeTodolistFilterAC(todolistId, value));
    }

    function removeTask(id: string, todolistId: string) {
        dispatch(removeTaskAC(id, todolistId))
    }

    function addTask(newTaskTitle: string, todolistId: string) {
        dispatch(addTaskAC(newTaskTitle, todolistId))
    }

    function changeTaskStatus(id: string, isDone: boolean, todolistId: string) {
        dispatch(changeTaskStatuskAC(id, isDone, todolistId))
    }

    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        dispatch(changeTaskTitleAC(id, newTitle, todolistId))
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
                            let tasksForTodolist = tasks[item.id];
                            if (item.filter === "active") {
                                tasksForTodolist = tasksForTodolist.filter(item => item.isDone === false)
                            }
                            if (item.filter === "completed") {
                                tasksForTodolist = tasksForTodolist.filter(item => item.isDone === true)
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

export default AppWithRedux;

