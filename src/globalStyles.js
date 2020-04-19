import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

    .flex-all-center-column-div {
        align-items: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    
    .flex-full {
        display: flex;
        flex: 1;
    }
    
    .root-div {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }

`;

export default GlobalStyle;
