import {FormControl, FormControlLabel, Radio, RadioGroup} from "@mui/material";
import {useFormContext} from "react-hook-form";
import {PlaceFields, PropertyType} from "../../types/PlacesTypes";
import React from 'react';

function NewPlaceTypes() {
    const { setValue, watch } = useFormContext();
    const watchPropertyType = watch(PlaceFields.PropertyType)
    
    const onChangeValue = (event: React.ChangeEvent<HTMLInputElement>, value: string) =>
        setValue(PlaceFields.PropertyType, parseInt(value) as PropertyType)
    
    return (
        <FormControl>
            <RadioGroup row value={watchPropertyType} onChange={onChangeValue}>
                <FormControlLabel value={PropertyType.HOUSE} control={<Radio />} label="Casa" />
                <FormControlLabel value={PropertyType.APARTMENT} control={<Radio />} label="Departamento" />
            </RadioGroup>
        </FormControl>
    )
}

export default NewPlaceTypes;