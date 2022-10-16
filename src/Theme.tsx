import React  from 'react';
import {createTheme, ThemeProvider} from "@mui/material";

const theme = createTheme ({
    palette: {
        primary: {
            main: '#FF385C'
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