import React, {Component} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import FormControlLabel from '@mui/material/FormControlLabel';
import './Register.css';

type RegisterProps = {}
type RegisterState = { 
    firstName: string,
    lastName: string,
    email: string, 
    password: string, 
    repeatedPassword: string,
    isHost: boolean
  }
 
class Register extends Component<RegisterProps, RegisterState> {

    constructor(props: RegisterProps){
        super(props);
        this.state = {
            firstName: 'John', 
            lastName: 'Doe', 
            email : 'john@gmail.com', 
            password: '******', 
            repeatedPassword: '******', 
            isHost: true
        }
    }

    render(){
        return (
            <section className='register-section'>
                <div className="title">MY PLACE</div>
                <form className="register-form">
                <TextField sx={{ mb: 4, mt: 4}} 
                    onChange={e => this.setState({firstName: e.target.value})} 
                    variant="outlined"  
                    label="Nombre" 
                    value={this.state.firstName} />
                <TextField sx={{ mb: 4 }} 
                    onChange={e => this.setState({lastName: e.target.value})} 
                    variant="outlined"  
                    label="Apellido" 
                    value={this.state.lastName} />
                <TextField sx={{ mb: 4 }} 
                    onChange={e => this.setState({email: e.target.value})} 
                    variant="outlined" 
                    label="Email" 
                    value={this.state.email}/>
                <TextField sx={{ mb: 4 }}
                    onChange={e => this.setState({password: e.target.value})}  
                    variant="outlined" 
                    label="Password" 
                    type="password" 
                    value={this.state.password}/>
                <TextField sx={{ mb: 4 }} 
                    onChange={e => this.setState({repeatedPassword: e.target.value})} 
                    variant="outlined" 
                    label="Repetir password" 
                    type="password" 
                    value={this.state.repeatedPassword}/>
                </form>
                <div className='checklist'>
                    {checkbox('Anfitrión', this.state.isHost, () => this.setState({isHost: true}))}
                    {checkbox('Huesped', !this.state.isHost, () => this.setState({isHost: false}))}
                </div>
                <div className='button-container'>
                <ThemeProvider theme={themeButton}>
                    <Button fullWidth color="primary" variant="contained" onClick={()=>this.registerHandler()}>
                        CONFIRMAR
                    </Button>
                </ThemeProvider>
                </div>
            </section>
            )
    }
   
    async registerHandler(){
        const email = this.state.email
        const password = this.state.password
        const repeatedPassword = this.state.password // validar que sea igual al password
        const firstName = this.state.firstName
        const lastName = this.state.lastName
        const isHost = this.state.isHost
        const URL = "http://localhost:8080/api/v1/users/register";
        const body = {
            mail: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
            type: isHost ? "HOST_USER" : "TRAVELER_USER"
        }
        try {
            const response = await fetch(URL, 
            { 
                method: 'POST', 
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(body) 
            })
            if(response.status === 200) {
                alert('User created successfully')
            } else {
                alert('An error has ocurred')
            }
        } catch {
            alert('No response from server')
        }
    }

}

const themeButton = createTheme({
    palette: {
      primary: {
        main: '#FF385C',
      },
    },
  });

function checkbox(name: string, checked: boolean, onChange: any) {
    return (
        <FormControlLabel 
            label={name} 
            control={ 
                <Checkbox 
                    icon={<RadioButtonUncheckedIcon />}
                    checkedIcon={<RadioButtonCheckedIcon />}
                    checked={checked}
                    onChange={onChange} 
                    sx={{
                        color: '#747474',
                        '&.Mui-checked': {color: '#FF385C'}
                    }}
                />
        }/>
    )
}



export default Register;