import React  from 'react';
import {createTheme, ThemeProvider} from "@mui/material";

const theme = createTheme ({
    palette: {
        primary: {
            main: '#FF385C'
        },
        secondary: {
            main: '#515151'
        }
    },
    
    typography: {
        fontFamily: [
            'Poppins',
            'Helvetica',
            '"sans-serif"',
        ].join(','),


        h1: {
            fontStyle: 'normal', 
            fontWeight: 700, 
            fontSize: '48px',
            lineHeight: '133.4%', 
        },

        h3: {
            fontStyle: 'normal', 
            fontWeight: 300, 
            fontSize: '30px',
            lineHeight: '133.4%', 
        }
    },

    components: {

    },
});

export interface ThemeValidatorProps{
    children?: React.ReactNode;
}

export function ThemeValidator (props: ThemeValidatorProps) {
    return (
        <ThemeProvider theme={theme}>
            {props.children}
        </ThemeProvider>
    );
}