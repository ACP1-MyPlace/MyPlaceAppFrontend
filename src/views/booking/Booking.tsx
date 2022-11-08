import React, { useState } from "react";
import dayjs, { Dayjs } from 'dayjs';
import { Rental as IRental } from "../../types/Rentals";
import Checkbox from '@mui/material/Checkbox';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { Card, CardActions, CardContent, Stack, Button, Typography, TextField, Grid } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import FormControlLabel from '@mui/material/FormControlLabel';
import { BookingLayout } from "../../layouts/BookingLayout";
import { userStorage } from "../../userSession/userStorage";
import { useLocation, useNavigate } from "react-router-dom";
import { book } from "./bookingActions"
import "./booking.css";

export const Booking = () => {
    const {state} = useLocation();
    const rental : IRental = state;
    let navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [reservationReqState, setReservationReqState] = useState({error: false, msg: ''})
    let [startingDate, setStartingDate] = React.useState<Dayjs | null>(
        dayjs('2022-11-09T21:11:54'),
    );

    let [finishingDate, setFinishingDate] = React.useState<Dayjs | null>(
        dayjs('2022-11-19T21:11:54'),
    );

    let [ isCash, setIsCash ] = useState(true)

    const handleChangeStartingDate = (newValue: Dayjs | null) => {
        setStartingDate(newValue);
    };

    const handleChangeFinishingDate = (newValue: Dayjs | null) => {
        setFinishingDate(newValue);
    };

    const userId = userStorage.getUserId();
    const userMail = userStorage.getMail();

    const sendReservationRequest = () => {
        if (loading) {
            return;
        }
        setReservationReqState({ error: false, msg: '' });
        setLoading(true);
        book(
            {
                userId: userId,
                accommodationId: rental.id,
                startingDate: startingDate,
                finishingDate: finishingDate,
                paymentMethod: isCash ? "CASH" : "CASH",
                price: {
                    currency: {
                        currencyId: rental.price.currency.currencyId,
                        currencyName: rental.price.currency.currencyName
                    },
                    amount: rental.price.amount
                },
                status: "PENDING"
            }).then(() => {
                setLoading(false);
                setReservationReqState({ error: false, msg: 'Reserva creada exitosamente' });
            }).catch(() => {
                setLoading(false);
                setReservationReqState({ error: true, msg: 'Error creando la reserva, ya esta ocupada!' });
            });
    };
    return <>
        <BookingLayout>
            <Card sx={{ minWidth: '70%' }}>
                <CardContent>
                    <Typography variant="h1" color="primary" mb={2}>
                        MY PLACE
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={2}/>
                        <Grid item xs={3}>
                            <Typography variant="h3" color="primary" mb={2}>
                                Tus datos
                            </Typography>
                            <Stack spacing={2}>
                                <TextField
                                        disabled  
                                        variant="outlined"
                                        label="Email"
                                        size="small"
                                        value={userMail}/>
                            </Stack>
                        </Grid>
                        <Grid item xs={2}/>
                        <Grid item xs={3}>
                            <Typography variant="h3" color="primary" mb={2}>
                                Fecha de reserva
                            </Typography>
                            <Stack spacing={4}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DesktopDatePicker
                                        label="Reservar desde"
                                        inputFormat="DD/MM/YYYY"
                                        value={startingDate}
                                        onChange={handleChangeStartingDate}
                                        renderInput={(params) => <TextField {...params} />}
                                    />                 
                                </LocalizationProvider>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DesktopDatePicker
                                        label="Reservar hasta"
                                        inputFormat="DD/MM/YYYY"
                                        value={finishingDate}
                                        onChange={handleChangeFinishingDate}
                                        renderInput={(params) => <TextField {...params} />}
                                    />                 
                                </LocalizationProvider>
                                <div className='payment'>
                                    {checkbox('Efectivo', isCash, () => setIsCash(true))}
                                    {checkbox('Tarjeta de Credito/Debito', !isCash, () => setIsCash(false))}
                                </div>
                            </Stack>
                        </Grid>
                        <Grid item xs={2}/>
                    </Grid>
                </CardContent>
                <CardActions>
                    <Button fullWidth color="secondary" variant="contained" onClick={ () => {navigate("/")}}>
                        CANCELAR
                    </Button>
                    <Button fullWidth color="primary" variant="contained" onClick = {sendReservationRequest}>
                        CONFIRMAR
                    </Button>
                </CardActions>
            </Card>


        </BookingLayout>

        &nbsp;
        {loading && <div className="alert alert-info animate__animated animate__flipInX"> Cargando... </div>}
        {reservationReqState.error && <div className="alert alert-danger animate__animated animate__flipInX"> {reservationReqState.msg} </div>}
        {!reservationReqState.error && reservationReqState.msg && <div className="alert alert-success animate__animated animate__flipInX"> {reservationReqState.msg} </div>}
    </>
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