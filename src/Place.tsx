import React, {Component} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import FormControlLabel from '@mui/material/FormControlLabel';
import './Register.css';
import './Place.css';

type PlaceProps = {}
type PlaceState = { 
    country: string,
    address: string,
    price_per_night: number, 
    place_type: string, 
    description: string,
    number_occupants: number
  }
 
class Register extends Component<PlaceProps, PlaceState> {

    constructor(props: PlaceProps){
        super(props);
        this.state = {
            country: 'Pais ejemplo', 
            address: 'Av. Ejemplo 123, Ciudad ejemplo', 
            price_per_night : 100, 
            number_occupants: 1, 
            place_type: 'Ej. Casa', 
            description: 'Descripcion'
        }
    }

    render(){
        return (
            <section className='register-section'>
                <div className="title">MY PLACE</div>
                <div className="subtitle">NUEVO ALOJAMIENTO</div>
                <form className="register-form">
                <TextField sx={{ mb: 4, mt: 4}} 
                    onChange={e => this.setState({country: e.target.value})} 
                    variant="outlined"  
                    label="Pais" 
                    value={this.state.country} />
                <TextField sx={{ mb: 4 }} 
                    onChange={e => this.setState({address: e.target.value})} 
                    variant="outlined"  
                    label="Direccion" 
                    value={this.state.address} />
                <TextField sx={{ mb: 4 }} 
                    onChange={e => this.setState({price_per_night: Number(e.target.value)})} 
                    variant="outlined" 
                    label="Precio por noche" 
                    value={this.state.price_per_night}/>
                <form className="register-form-row">
                <TextField sx={{ mb: 4 }}
                    onChange={e => this.setState({number_occupants: parseInt(e.target.value)})}  
                    variant="outlined" 
                    label="Cantidad de huespedes" 
                    value={this.state.number_occupants}/>
                <TextField sx={{ mb: 4 }} 
                    onChange={e => this.setState({place_type: e.target.value})} 
                    variant="outlined" 
                    label="Tipo" 
                    value={this.state.place_type}/>
                </form>
                <form className="register-form-large">
                    <TextField sx={{ mb: 4 }} 
                        onChange={e => this.setState({description: e.target.value})} 
                        variant="outlined" 
                        label="Descripcion" 
                        value={this.state.description}/>
                </form>
                </form>
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
        const email = this.state.description
        const password = this.state.price_per_night
        const repeatedPassword = this.state.number_occupants
        const firstName = this.state.country
        const lastName = this.state.address
        const URL = "http://localhost:8080/api/v1/users/register";
        const body = {
            mail: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
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


export default Register;