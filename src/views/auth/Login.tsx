import React from 'react';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {ControlledTextField, ControlledTextFieldPassword} from "../../components/ControlledTextField";
import {Button, Stack} from "@mui/material";
import {AccountLayoutAdmin} from "../../layouts/AccountLayoutAdmin";

enum LoginFormFields {
    Email = 'email',
    Password = 'password'
}

interface LoginForm {
    [LoginFormFields.Email]: string;
    [LoginFormFields.Password]: string
}

function Login () {
    
    const loginSchema = yup.object().shape({
        [LoginFormFields.Email]: yup.string().email('El campo debe ser un mail válido').required('Campo obligatorio'),
        [LoginFormFields.Password]: yup.string().required('Campo obligatorio'),
    })
    
    const { control, handleSubmit } = useForm<LoginForm>({
        resolver: yupResolver(loginSchema)
    });
    
    const onLogin = async (data: LoginForm) => {

        const URL = "http://localhost:8080/api/v1/users/login";
        const body = {
            mail: data[LoginFormFields.Email],
            password: data[LoginFormFields.Password]
        }

        try {
            const response = await fetch(URL,
                {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(body)
                })
            if(response.status === 200) {
                alert('User successfully')
            } else {
                alert('An error has ocurred')
            }
        } catch {
            alert('No response from server')
        }
    }
    
    return (
        <form onSubmit={handleSubmit(onLogin)}>
            <Stack spacing={2}>
                <ControlledTextField label="Email"
                                     control={control}
                                     name={LoginFormFields.Email}
                />
                
                <ControlledTextFieldPassword label="Password"
                                             control={control}
                                             name={LoginFormFields.Password}
                />
                
                <Button variant="contained" type="submit">
                    Ingresar
                </Button>
            </Stack>
        </form>
    );
} 

export default Login;