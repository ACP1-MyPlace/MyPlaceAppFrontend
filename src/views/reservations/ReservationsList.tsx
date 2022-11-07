import React, {useEffect, useState} from 'react';
import {Grid, Typography} from "@mui/material";
import {ReservationView} from "../../types/ReservationTypes";
import {userStorage} from "../../userSession/userStorage";
import ReservationComponent from "./ReservationComponent";

function ReservationsList () {
    
    const [reservations, setReservations] = useState<ReservationView[]>();
    const [statusState, setStatusState] = useState({error: false, message: ''})
    
    const loadReservations = async () => {
        setReservations(undefined);
        setStatusState({error:false,message:''})
        const URL = "http://localhost:8080/api/v1/reservations/myreservations";
        let token = userStorage.getToken() || '';
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
        
        try {
            const response = await fetch(URL,
                {
                    method: 'GET',
                    headers: headers
                })
            if(response.status === 200) {
                let responseData = await response.json();
                setReservations(responseData)
            } else {
                console.log('An error has ocurred')
                setStatusState({error:true,message:'Ocurrio un error creando el alojamiento'})
            }
        } catch {
            console.log('No response from server')
            setStatusState({error:true,message:'No hay respuesta del servidor'})
        }
    }
    
    useEffect(() => {
        loadReservations();
    }, []);
    
    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Typography color="primary" fontWeight={500} fontSize={'1.5rem'}>
                    Reservas
                </Typography>

            </Grid>
            <Grid item xs={12}>
                {
                    reservations ?
                        reservations.length ?
                            <Grid container spacing={1}>
                                {
                                    reservations.map((res, index) => (
                                        <Grid item xs={12} key={`keyReservationComponent_${index}`}>
                                            <ReservationComponent reservation={res} onReload={loadReservations} />
                                        </Grid>
                                    ))
                                }
                            </Grid>
                            :
                            <div className="alert alert-info animate__animated animate__flipInX">No se han encontrado reservas</div>
                        :
                        statusState.error ?
                            <div className="alert alert-error animate__animated animate__flipInX">Al parecer ha ocurrido un error</div>
                            :
                            <div>Cargando...</div>
                }
            </Grid>
        </Grid>
    );
}

export default ReservationsList;