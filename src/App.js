import React from 'react';
import { Provider } from 'react-redux';

import CssBaseline from '@material-ui/core/CssBaseline';

import SnackBar from './components/snackbar';
import GlobalStyle from './globalStyles';
import store from './providers/Store';
import Routes from './routes';

function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <CssBaseline />
                <GlobalStyle />
                <SnackBar />
                <Routes />
            </div>
        </Provider>
    );
}

export default App;
