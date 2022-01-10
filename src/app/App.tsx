import { AppBar, Button, Container, Grid, IconButton, Toolbar, Typography } from '@material-ui/core';
import './App.css';
import { Menu } from '@material-ui/icons';
import { TodolistsList } from '../components/features/TodolistsList/TodolistsList'


export function App() {

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
                <TodolistsList />
            </Container>
        </div>
    );
}

export default App;