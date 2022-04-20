import React from 'react';
import { AppBar, Button, Container, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import './App.css';
import { Menu } from '@mui/icons-material';
import { TodolistsList } from '../components/features/TodolistsList/TodolistsList'
import { LinearProgress } from '@mui/material';
import { ErrorSnackbar } from '../components/ErrorSnackbar/ErrorSnackbar';
import { useSelector } from 'react-redux';
import { RequestStatusType } from '../state/app-reducer';
import { RootStateType } from '../state/store';
import { Login } from '../components/features/Login/Login';
import { Route, Routes } from 'react-router-dom';




export function App() {

    const status = useSelector<RootStateType, RequestStatusType>(state => state.app.status)

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
                {status === 'loading' && <LinearProgress />}
            </AppBar>
            <Container fixed>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<TodolistsList />} />
                    <Route path="*" element={<h1>404: PAGE NOT FOUND</h1>} />
                </Routes>
            </Container>
            <ErrorSnackbar />      {/*  ??????????????????????? цвет/рассположение*/}
        </div>
    );
}

export default App;