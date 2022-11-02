import React from 'react';
import {Button, Card, CardContent, Chip, Grid, Stack, Typography} from "@mui/material";
import {ReservationFields, ReservationStatus, ReservationView} from "../../types/ReservationTypes";
import {dateFormatter} from "../../utils/dateFormatter";
import {PlaceFields} from "../../types/PlacesTypes";
import {userStorage} from "../../userSession/userStorage";

interface ReservationComponentProps {
    reservation: ReservationView
}

function ReservationComponent(props: ReservationComponentProps) {
    let isHost : boolean = userStorage.isHost();

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
            <Button variant="contained" color="error">Rechazar</Button>
            <Button variant="contained" color="success">Aceptar</Button>
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
    }/**/
    
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
                            {`Precio por noche: ${props.reservation[ReservationFields.Accommodation][PlaceFields.PricePerNight] || 0}`}
                        </Typography>
                    </Grid>
                    <Grid item xs={4} alignSelf="center">
                        { !isHost ? renderButtons() : renderState() }
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default ReservationComponent;