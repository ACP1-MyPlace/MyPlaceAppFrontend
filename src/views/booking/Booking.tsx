import React from "react";
import dayjs, { Dayjs } from 'dayjs';
import { Booking as IBooking } from "../../types/Booking";
import Checkbox from '@mui/material/Checkbox';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { Card, CardActions, CardContent, Stack, Button, Typography, TextField, Grid } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import FormControlLabel from '@mui/material/FormControlLabel';
import { BookingLayout } from "../../layouts/BookingLayout";
import { useNavigate } from "react-router-dom";
import { book } from "./bookingActions"
import "./booking.css";

export const Booking = (data : IBooking) => {
    let navigate = useNavigate();

    const [value, setValue] = React.useState<Dayjs | null>(
        dayjs('2014-08-18T21:11:54'),
    );

    const handleChange = (newValue: Dayjs | null) => {
        setValue(newValue);
    };

      
    return (
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
                                <TextField variant="outlined"
                                            label="Nombre"
                                            size="small" />
                                <TextField variant="outlined"
                                            label="Apellido"
                                            size="small" />
                                <TextField variant="outlined"
                                            label="Email"
                                            size="small"/>
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
                                        value={value}
                                        onChange={handleChange}
                                        renderInput={(params) => <TextField {...params} />}
                                    />                 
                                </LocalizationProvider>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DesktopDatePicker
                                        label="Reservar hasta"
                                        inputFormat="DD/MM/YYYY"
                                        value={value}
                                        onChange={handleChange}
                                        renderInput={(params) => <TextField {...params} />}
                                    />                 
                                </LocalizationProvider>
                                <div className='payment'>
                                    {checkbox('Efectivo', true, null)}
                                    {checkbox('Tarjeta de Credito/Debito', false, null)}
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
                    <Button fullWidth color="primary" variant="contained" onClick = {() => {book(
                    {
                        userId: 1,
                        accommodationId: 1,
                        startingDate: "2022-01-06T12:25:29.395Z",
                        finishingDate: "2022-02-06T12:25:29.395Z",
                        paymentMethod: "CASH",
                        price: {
                        currency: {
                            currencyId: "USD",
                            currencyName: "Dolares"
                        },
                        amount: 15000
                        },
                        status: "PENDING"
                    })}}>
                        CONFIRMAR
                    </Button>
                </CardActions>
            </Card>
        </BookingLayout>
    )
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