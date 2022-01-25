import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, createTheme } from '@material-ui/core';
import App from './app/App';
import { Provider } from 'react-redux';
import { store } from './state/store';
import './index.css';

const theme = createTheme({
  palette: {
    primary: {
      main: "#61dafb "
    },
    secondary: {
      main: "#ffffff"
    },
  },
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme} >
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


