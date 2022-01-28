import { useCallback, useEffect } from "react";
import { Grid, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import { TaskStatuses } from "../../../api/tasks-api";
import { RootStateType } from "../../../state/store";
import { addTaskTC, removeTasksTC, TasksStateType, updateTaskTC } from "../../../state/tasks-reducer";
import { addTodolistTC, changeTodolistFilterAC, changeTodolistTitleTC, fetchTodolistsTC, FilterValueType, removeTodolistTC, TodolistType } from "../../../state/todolists-reducer";
import { AddItemForm } from "../../AddItemForm/AddItemForm";
import { Todolist } from "./Todolist/Todolist";


export const TodolistsList: React.FC = () => {

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
        <>
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
                                        // id={item.id}
                                        // title={item.title}
                                        // filter={item.filter}
                                        key={item.id}
                                        todolist={item}
                                        tasks={tasksForTodolist}
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
        </>
    )
}
