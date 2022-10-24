import React from "react";
import {Button, Card, CardActions, CardContent, CardHeader, Grid} from "@mui/material";
import {useForm} from "react-hook-form";
import {ControlledTextField} from "../../components/ControlledTextField";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";

enum NewPlaceFields {
    Country = 'country',
    Address = 'address',
    PricePerNight = 'price_per_night',
    PlaceType = 'place_type',
    Description = 'description',
    NumberOccupants = 'number_occupants',
}

interface NewPlaceForm {
    [NewPlaceFields.Country]: string,
    [NewPlaceFields.Address]: string,
    [NewPlaceFields.PricePerNight]: number,
    [NewPlaceFields.PlaceType]: string,
    [NewPlaceFields.Description]: string,
    [NewPlaceFields.NumberOccupants]: number,
}

function NewPlace() {
    
    const newPlaceSchema = yup.object().shape({
        [NewPlaceFields.Country]: yup.string().required('Campo obligatorio'),
        [NewPlaceFields.Address]: yup.string().required('Campo obligatorio'),
        [NewPlaceFields.PricePerNight]: yup.number().required('Campo obligatorio'),
        [NewPlaceFields.PlaceType]: yup.string().required('Campo obligatorio'),
        [NewPlaceFields.Description]: yup.string().required('Campo obligatorio'),
        [NewPlaceFields.NumberOccupants]: yup.number().required('Campo obligatorio')
    })
    
    const { control, handleSubmit } = useForm<NewPlaceForm>({
        resolver: yupResolver(newPlaceSchema)
    });
    
    const onNewPlace = async (data: NewPlaceForm) => {
        const URL = "http://localhost:8080/api/v1/****/****";
        
        try {
            const response = await fetch(URL,
                {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(data)
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
    
    return (
        <Grid container justifyContent="center">
            <Grid item xs={8}>
                <Card>
                    <CardHeader title="Nuevo Alojamiento" />
                    
                    <form onSubmit={handleSubmit(onNewPlace)}>
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={3}>
                                    <ControlledTextField label="Pais"
                                                         control={control}
                                                         name={NewPlaceFields.Country}
                                                         fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} md={3}>
                                    <ControlledTextField label="Dirección"
                                                         control={control}
                                                         name={NewPlaceFields.Address}
                                                         fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} md={3}>
                                    <ControlledTextField label="Tipo"
                                                         control={control}
                                                         name={NewPlaceFields.Address}
                                                         fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} md={3}>
                                    <ControlledTextField label="Precio por noche"
                                                         control={control}
                                                         name={NewPlaceFields.PricePerNight}
                                                         fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} md={3}>
                                    <ControlledTextField label="Cantidad de huéspedes"
                                                         control={control}
                                                         name={NewPlaceFields.NumberOccupants}
                                                         fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <ControlledTextField label="Descripción"
                                                         control={control}
                                                         name={NewPlaceFields.NumberOccupants}
                                                         fullWidth
                                                         multiline
                                                         minRows={2}
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                        <CardActions>
                            <Button color="primary" variant="contained" type="submit">
                                CONFIRMAR
                            </Button>
                        </CardActions>
                    </form>
                </Card>
            </Grid>
        </Grid>
    )
}

export default NewPlace;