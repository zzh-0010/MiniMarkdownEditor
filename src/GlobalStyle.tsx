import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
body {
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    height: 100%;
    border:${({ theme }) => theme.color.border};
    color: ${({ theme }) => theme.color.text};
    background-image: ${({ theme }) => theme.color.backgroundImage};
    background-size: cover;
    background-repeat: no-repeat;
    transition: all 0.5s ease-in-out;
    }

:root{
    color-scheme:${({theme})=>theme.name};
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    height: 100%;
}

`;