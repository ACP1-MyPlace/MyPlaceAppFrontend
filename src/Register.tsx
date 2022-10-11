import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './Register.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Checkbox, { checkboxClasses } from '@mui/material/Checkbox';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import FormControlLabel from '@mui/material/FormControlLabel';

const themeButton = createTheme({
  palette: {
    primary: {
      main: '#FF385C',
    },
  },
});
 
function Register() {
  return (
    <section className='register-section'>
      <div className="title">MY PLACE</div>
      <form className="register-form">
        <TextField sx={{ mb: 4, mt: 4}} variant="outlined" id="nombre-completo" label="Nombre completo" defaultValue="John Doe"/>
        <TextField sx={{ mb: 4 }} variant="outlined" id="email" label="Email" defaultValue="john@gmail.com" />
        <TextField sx={{ mb: 4 }} variant="outlined" id="password" label="Password" defaultValue="****" type="password" />
        <TextField sx={{ mb: 4 }} variant="outlined" id="repetir-password" label="Repetir password" defaultValue="****" type="password"/>
      </form>

        <div className='checklist'>
            {checkbox('Anfitrion')}
            {checkbox('Huesped')}
        </div>

      <div className='button-container'>
        <ThemeProvider theme={themeButton}>
            <Button fullWidth color="primary" variant="contained">
                CONFIRMAR
            </Button>
        </ThemeProvider>
      </div>
    </section>
  );

}

function checkbox(name: string) {
    return (
        <FormControlLabel 
            label={name} 
            control={ 
                <Checkbox 
                    icon={<RadioButtonUncheckedIcon />}
                    checkedIcon={<RadioButtonCheckedIcon />}
                    onChange={()=> 'Hola'} 
                    sx={{
                        color: '#747474',
                        '&.Mui-checked': {color: '#FF385C'}
                    }}
                />
        }/>
    )
}



export default Register;