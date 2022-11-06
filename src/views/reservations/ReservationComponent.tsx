import React, {useState} from 'react';
import {Button, Card, CardContent, Chip, Grid, Stack, Typography} from "@mui/material";
import {ReservationFields, ReservationStatus, ReservationView} from "../../types/ReservationTypes";
import {dateFormatter} from "../../utils/dateFormatter";
import {CurrencyTypeFields, PlaceFields, PriceTypeFields} from "../../types/PlacesTypes";
import {userStorage} from "../../userSession/userStorage";

interface ReservationComponentProps {
    reservation: ReservationView,
    onReload: () => void
}

function ReservationComponent(props: ReservationComponentProps) {
    let isHost : boolean = userStorage.isHost();
    console.log({ 'is': isHost });
    const [statusState, setStatusState] = useState({error: false, message: ''})

    const renderDates = () => (
        <Stack direction='row' spacing={1} alignItems='center'>
            <Typography fontSize={'1rem'} color={'text.disabled'}>
                Fecha: del
            </Typography>
            <Typography fontSize={'.95rem'} color={'text.disabled'}>
                {dateFormatter.toShortDate(props.reservation[ReservationFields.StartingDate]) || "-"} al
            </Typography>
            <Typography fontSize={'.95rem'} color={'text.disabled'}>
                {dateFormatter.toShortDate(props.reservation[ReservationFields.FinishingDate]) || "-"}
            </Typography>
        </Stack>
    )
    
    const renderButtons = () => (
        <Stack direction="row" spacing={1} justifyContent='end'>
            {
                props.reservation[ReservationFields.Status] === ReservationStatus.PENDING ?
                    <>
                        <Button variant="contained" color="error" onClick={() => updateState(ReservationStatus.NOT_ACCEPTED)}>
                            Rechazar
                        </Button>
                        <Button variant="contained" color="success" onClick={() => updateState(ReservationStatus.ACCEPTED)}>
                            Aceptar
                        </Button>
                    </>
                    :
                    renderState()
            }
        </Stack>
    )
    
    const renderState = () => {
        let colorChip : 'error' | 'info' | 'success' = "info";
        let labelChip : string = "Pendiente";
        
        switch (props.reservation[ReservationFields.Status]) {
            case ReservationStatus.PENDING:
                colorChip = 'info';
                labelChip = 'Pendiente';
                break;
            case ReservationStatus.ACCEPTED:
                colorChip = 'success';
                labelChip = 'Aceptada';
                break;
            case ReservationStatus.NOT_ACCEPTED:
                colorChip = 'error';
                labelChip = 'Rechazada';
                break;
        }
        
        return (
            <Stack direction="row" spacing={1} justifyContent='end'>
                <Chip color={colorChip} label={labelChip} />
            </Stack>
        );
    }
    const updateState = async (status: ReservationStatus) => {
        const URL = `http://localhost:8080/api/v1/reservations/${props.reservation[ReservationFields.Id]}`;
        let token = userStorage.getToken() || '';
        let headers = {
            'Content-Type': 'application/json',
            'auth': token
        };
        let body = {
            userId: props.reservation[ReservationFields.User].id,
            accommodationId: props.reservation[ReservationFields.Accommodation][PlaceFields.Id],
            startingDate: props.reservation[ReservationFields.StartingDate],
            finishingDate: props.reservation[ReservationFields.FinishingDate],
            paymentMethod: props.reservation[ReservationFields.PaymentMethod],
            price: props.reservation[ReservationFields.Price],
            status: status
        }

        try {
            const response = await fetch(URL,
                {
                    method: 'PUT',
                    headers: headers,
                    body: JSON.stringify(body)
                })
            if(response.status === 200) {
                props.onReload();
            } else {
                console.log('An error has ocurred')
                setStatusState({error:true,message:'Ocurrio un error creando el alojamiento'})
            }
        } catch {
            console.log('No response from server')
            setStatusState({error:true,message:'No hay respuesta del servidor'})
        }
    }
    
    const getPrice = () => {
        let price : number = props.reservation[ReservationFields.Price][PriceTypeFields.Amount] || 0;
        let currency : string = props.reservation[ReservationFields.Price][PriceTypeFields.Currency][CurrencyTypeFields.Id] || "$";
        
        return `Precio por noche: ${currency} ${price}`
    }
    
    return (
        <Card>
            <CardContent>
                <Grid container spacing={1}>
                    <Grid item xs={4}>
                        <Stack direction="column">
                            <Typography fontWeight={600} fontSize={'1.15rem'}>
                                {props.reservation[ReservationFields.Accommodation][PlaceFields.Country]}
                            </Typography>

                            {renderDates()}
                        </Stack>
                    </Grid>
                    <Grid item xs={4} alignSelf="center" textAlign="center" >
                        <Typography>
                            {getPrice()}
                        </Typography>
                    </Grid>
                    <Grid item xs={4} alignSelf="center">
                        { isHost ? renderButtons() : renderState() }
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default ReservationComponent;