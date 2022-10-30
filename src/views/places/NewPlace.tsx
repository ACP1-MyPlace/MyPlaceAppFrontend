import React, { useState } from "react";
import {Button, Card, CardActions, CardContent, CardHeader, Grid, Input} from "@mui/material";
import {FormProvider, useForm} from "react-hook-form";
import {ControlledTextField} from "../../components/ControlledTextField";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {NewPlaceForm, PlaceFields, PriceTypeFields, PropertyType} from "../../types/PlacesTypes";
import NewPlaceServices from "./NewPlaceServices";
import NewPlaceTypes from "./NewPlaceTypes";
import { handleUploadFirebaseImage } from "../../firebase/FirebaseHandler";

function NewPlace() {
    
    const [statusState, setStatusState] = useState({error: false, message: ''})
    const [photosInput, setPhotosInput] = useState("");
    const [uploadedPhotos, setPhotosToUpload] = useState<FileList>();
    const [uuidNamesFromPhotos, setUuidNamesFromPhotos] = useState<string[]>([]);

    const newPlaceSchema = yup.object().shape({
        [PlaceFields.PropertyType]: yup.number().required('Campo obligatorio'),
        [PlaceFields.Country]: yup.string().required('Campo obligatorio'),
        [PlaceFields.State]: yup.string().required('Campo obligatorio'),
        [PlaceFields.Street]: yup.string().required('Campo obligatorio'),
        [PlaceFields.StreetNumber]: yup.number().required('Campo obligatorio'),
        [PlaceFields.RoomsCount]: yup.number().required('Campo obligatorio'),
        [PlaceFields.BathroomCount]: yup.number().required('Campo obligatorio'),
        [PlaceFields.PricePerNight]: yup.object().shape({
            [PriceTypeFields.Amount]: yup.number().required('Campo obligatorio')
        })
    });

    const methods = useForm<NewPlaceForm>({
        defaultValues: {
            [PlaceFields.UserId]: 1,
            [PlaceFields.PropertyType]: PropertyType.HOUSE,
            [PlaceFields.Services]: [],
            [PlaceFields.RoomsCount]: 0,
            [PlaceFields.BathroomCount]: 0,
            [PlaceFields.GarageAvailable]: false,
            [PlaceFields.PetsAvailable]: false,
            [PlaceFields.PricePerNight]: {
                [PriceTypeFields.Currency]: {
                    currencyId: "USD",
                    currencyName: "Dolares",
                }
            }
        },
        resolver: yupResolver(newPlaceSchema)
    });
    
    const onNewPlace = async (data: NewPlaceForm) => {
        setStatusState({error:false,message:''})
        const URL = "http://localhost:8080/api/v1/accommodations";
        let photosNames = []
        try{
            photosNames = await handleUploadPhotos();
        } catch {
            console.log('Error with firebase')
            // setStatusState({error:true,message:'No se pudieron guardar las fotos'})
        }

        try {
            const response = await fetch(URL,
                {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(data)
                })
            if(response.status === 200) {
                console.log('Place created successfully')
                setStatusState({error:false,message:'Alojamiento creado exitosamente'})
            } else {
                console.log('An error has ocurred')
                setStatusState({error:true,message:'Ocurrio un error creando el alojamiento'})
            }
        } catch {
            console.log('No response from server')
            setStatusState({error:true,message:'No hay respuesta del servidor'})
        }
    }

    const handlePhotosSelection = (event:React.ChangeEvent<HTMLInputElement>) => {
        setPhotosInput(event.target.value);
        if(event.target.files){
            setPhotosToUpload(event.target.files)
        }
    }
    
    const handleUploadPhotos = async () => {
        if(!uploadedPhotos){
            return []
        }
        const hashedNames :string[]= [];
        for ( let i=0; i<uploadedPhotos.length; i++ ){
            hashedNames.push(await handleUploadFirebaseImage(uploadedPhotos[i]));
        }
        setUuidNamesFromPhotos(hashedNames);
        return hashedNames;
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
                                                         name={`${PlaceFields.PricePerNight}.${PriceTypeFields.Amount}`}
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
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Input
                                        id="fileSelector"
                                        type = "file"
                                        name="Upload Photos"
                                        value={photosInput}
                                        inputProps = {{accept: "image/*", "multiple":true}}
                                        style={{width:"100%", marginBottom: 10}}
                                        onChange = {handlePhotosSelection}
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

                &nbsp;
                {statusState.error &&  <div className="alert alert-danger animate__animated animate__flipInX"> {statusState.message} </div>}
                {!statusState.error && statusState.message.length!=0 && <div className="alert alert-success animate__animated animate__flipInX"> {statusState.message} </div>}
            </Grid>
        </Grid>
    )
}

export default NewPlace;