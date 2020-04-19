import React from 'react';

import { CssBaseline } from '@material-ui/core';

import GlobalStyle from './globalStyles';
import Routes from './routes';

function App() {
    return (
        <div className="App">
            <CssBaseline />
            <GlobalStyle />
            <Routes />
        </div>
    );
}

export default App;
