import React from "react";
import {Button, Card, CardActions, CardContent, CardHeader, Grid} from "@mui/material";
import {FormProvider, useForm} from "react-hook-form";
import {ControlledTextField} from "../../components/ControlledTextField";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {NewPlaceForm, PlaceFields, PropertyType} from "../../types/PlacesTypes";
import NewPlaceServices from "./NewPlaceServices";
import NewPlaceTypes from "./NewPlaceTypes";

function NewPlace() {
    
    const newPlaceSchema = yup.object().shape({
        [PlaceFields.PropertyType]: yup.number().required('Campo obligatorio'),
        [PlaceFields.Country]: yup.string().required('Campo obligatorio'),
        [PlaceFields.State]: yup.string().required('Campo obligatorio'),
        [PlaceFields.Street]: yup.string().required('Campo obligatorio'),
        [PlaceFields.StreetNumber]: yup.number().required('Campo obligatorio'),
        [PlaceFields.RoomsCount]: yup.number().required('Campo obligatorio'),
        [PlaceFields.BathroomCount]: yup.number().required('Campo obligatorio'),
        [PlaceFields.PricePerNight]: yup.number().required('Campo obligatorio')
    })

    const methods = useForm<NewPlaceForm>({
        defaultValues: {
            [PlaceFields.PropertyType]: PropertyType.HOUSE,
            [PlaceFields.Services]: [],
            [PlaceFields.RoomsCount]: 0,
            [PlaceFields.BathroomCount]: 0,
        },
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
            <Grid item xs={9}>
                <Card>
                    <CardHeader title="Nuevo Alojamiento" />
                    
                    <form onSubmit={methods.handleSubmit(onNewPlace)}>
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={3}>
                                    <ControlledTextField label="Pais"
                                                         control={methods.control}
                                                         name={PlaceFields.Country}
                                                         fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} md={3}>
                                    <ControlledTextField label="Estado"
                                                         control={methods.control}
                                                         name={PlaceFields.State}
                                                         fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <FormProvider { ...methods }>
                                        <NewPlaceTypes />
                                    </FormProvider>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <ControlledTextField label="Calle"
                                                         control={methods.control}
                                                         name={PlaceFields.Street}
                                                         fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} md={2}>
                                    <ControlledTextField label="Número"
                                                         control={methods.control}
                                                         name={PlaceFields.StreetNumber}
                                                         fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} md={2}>
                                    <ControlledTextField label="Piso"
                                                         control={methods.control}
                                                         name={PlaceFields.Floor}
                                                         fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} md={2}>
                                    <ControlledTextField label="Departamento"
                                                         control={methods.control}
                                                         name={PlaceFields.Apartment}
                                                         fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} md={3}>
                                    <ControlledTextField label="Cantidad de Dormitorios"
                                                         control={methods.control}
                                                         name={PlaceFields.RoomsCount}
                                                         fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} md={3}>
                                    <ControlledTextField label="Cantidad de Baños"
                                                         control={methods.control}
                                                         name={PlaceFields.BathroomCount}
                                                         fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} md={3}>
                                    <ControlledTextField label="Precio por noche"
                                                         control={methods.control}
                                                         name={PlaceFields.PricePerNight}
                                                         fullWidth
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <FormProvider { ...methods }>
                                        <NewPlaceServices />
                                    </FormProvider>
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