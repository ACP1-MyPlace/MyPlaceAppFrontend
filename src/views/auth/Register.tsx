import React, {Component} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import Checkbox from '@mui/material/Checkbox';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import FormControlLabel from '@mui/material/FormControlLabel';
import {Stack} from "@mui/material";
import './Register.css';

type RegisterProps = {}
type RegisterState = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    repeatedPassword: string,
    isHost: boolean,
    error: boolean,
    message: string
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
            isHost: true,
            error: false,
            message: ''
        }
    }

    render(){
        return (
            <form>
                <Stack spacing={2}>
                    <TextField onChange={e => this.setState({firstName: e.target.value})}
                               variant="outlined"
                               label="Nombre"
                               size="small"
                               value={this.state.firstName} />
                    <TextField onChange={e => this.setState({lastName: e.target.value})}
                               variant="outlined"
                               label="Apellido"
                               size="small"
                               value={this.state.lastName} />
                    <TextField onChange={e => this.setState({email: e.target.value})}
                               variant="outlined"
                               label="Email"
                               size="small"
                               value={this.state.email}/>
                    <TextField onChange={e => this.setState({password: e.target.value})}
                               variant="outlined"
                               label="Password"
                               type="password"
                               size="small"
                               value={this.state.password}/>
                    <TextField onChange={e => this.setState({repeatedPassword: e.target.value})}
                               variant="outlined"
                               label="Repetir password"
                               type="password"
                               size="small"
                               value={this.state.repeatedPassword}/>
                    <div className='checklist'>
                        {checkbox('Anfitrión', this.state.isHost, () => this.setState({isHost: true}))}
                        {checkbox('Huesped', !this.state.isHost, () => this.setState({isHost: false}))}
                    </div>
                    {this.state.error && <div className="alert alert-danger animate__animated animate__flipInX"> {this.state.message} </div>}
                    {!this.state.error && this.state.message.length!=0 && <div className="alert alert-success animate__animated animate__flipInX"> {this.state.message} </div>}
                    <Button fullWidth color="primary" variant="contained" onClick={()=>this.registerHandler()}>
                        CONFIRMAR
                    </Button>
                </Stack>
            </form>
        )
    }

    async registerHandler(){
        this.setState({error:false, message:''})
        const email = this.state.email
        const password = this.state.password
        const repeatedPassword = this.state.repeatedPassword
        if(password.length < 6){
            console.log('Password should have at least 6 characters')
            this.setState({error: true, message: 'El password debe de tener por lo menos 6 caracteres'})
            return
        }
        if(password != repeatedPassword){
            console.log('Passwords are not the same')
            this.setState({error: true, message: 'Los passwords no coinciden'})
            return
        }
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
                console.log('User created successfully')
                this.setState({message: 'Se registro exitosamente, inicie sesion'})
            } else {
                console.log('An error has ocurred')
                this.setState({error: true, message: 'Ocurrio un error creando al usuario'})
            }
        } catch {
            console.log('No response from server')
            this.setState({error: true, message: 'El servidor no responde'})
        }
    }

}

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