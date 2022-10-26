import {Checkbox, FormControlLabel, FormGroup} from "@mui/material";
import {useFormContext} from "react-hook-form";
import {AccommodationService, PlaceFields} from "../../types/PlacesTypes";
import React from 'react';

function NewPlaceServices() {
    const { setValue, watch } = useFormContext();
    const watchServices = watch(PlaceFields.Services);
    const watchGarage = watch(PlaceFields.GarageAvailable);
    const watchPets = watch(PlaceFields.PetsAvailable);
    
    const onChangeService = (service: AccommodationService) => {
        if (watchServices) {
            if (watchServices.includes(service))
                setValue(PlaceFields.Services, watchServices.filter((x: number) => x != service))
            else
                setValue(PlaceFields.Services, [...watchServices, service])   
        }
    }
    
    const isChecked = (service: AccommodationService) : boolean =>
        watchServices && watchServices.includes(service);
    
    return (
        <FormGroup row>
            <FormControlLabel control={<Checkbox checked={isChecked(AccommodationService.WIFI)} />}
                              label="WIFI"
                              onChange={() => onChangeService(AccommodationService.WIFI)}
            />
            <FormControlLabel control={<Checkbox checked={isChecked(AccommodationService.KITCHEN)} />}
                              label="Cocina"
                              onChange={() => onChangeService(AccommodationService.KITCHEN)}
            />
            <FormControlLabel control={<Checkbox checked={isChecked(AccommodationService.MICROWAVE)} />}
                              label="Microondas"
                              onChange={() => onChangeService(AccommodationService.MICROWAVE)}
            />
            <FormControlLabel control={<Checkbox checked={isChecked(AccommodationService.AIR)} />}
                              label="Aire Acondicionado"
                              onChange={() => onChangeService(AccommodationService.AIR)}
            />
            <FormControlLabel control={<Checkbox checked={isChecked(AccommodationService.LAUNDRY)} />}
                              label="Lavandería"
                              onChange={() => onChangeService(AccommodationService.LAUNDRY)}
            />
            <FormControlLabel control={<Checkbox checked={isChecked(AccommodationService.TV)} />}
                              label="TV"
                              onChange={() => onChangeService(AccommodationService.TV)}
            />
            <FormControlLabel control={<Checkbox checked={isChecked(AccommodationService.POOL)} />}
                              label="Pileta"
                              onChange={() => onChangeService(AccommodationService.POOL)}
            />
            <FormControlLabel control={<Checkbox checked={watchGarage} />}
                              label="Garage"
                              onChange={() => setValue(PlaceFields.GarageAvailable, !watchGarage)}
            />
            <FormControlLabel control={<Checkbox checked={watchPets} />}
                              label="Permite Mascotas"
                              onChange={() => setValue(PlaceFields.PetsAvailable, !watchPets)}
            />
        </FormGroup>
    )
}

export default NewPlaceServices;