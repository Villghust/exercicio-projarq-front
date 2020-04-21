import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';

import SnackBar from './components/snackBar';
import GlobalStyle from './globalStyles';
import { StoreProvider } from './providers/Store';
import Routes from './routes';

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
