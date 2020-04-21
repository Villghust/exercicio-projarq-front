import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';

import GlobalStyle from './globalStyles';
import Routes from './routes';
import { StoreProvider } from './providers/Store';
import SnackBar from './components/snackBar';

function App() {
    return (
        <StoreProvider>
            <div className="App">
                <CssBaseline />
                <GlobalStyle />
                <SnackBar />
                <Routes />
            </div>
        </StoreProvider>
    );
}

export default App;
