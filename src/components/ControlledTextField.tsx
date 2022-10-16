import React, { useState } from 'react';
import { Control, Controller } from "react-hook-form";
import { IconButton, InputAdornment, StandardTextFieldProps, TextField } from "@mui/material";

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export interface ControlledTextFieldProps extends StandardTextFieldProps {
    control?: Control<any>
}

export const ControlledTextField = (props: ControlledTextFieldProps) => (
    <Controller
        control={props.control}
        name={props.name || ''}
        render={({field: {onChange, value}, fieldState: {error}}) => (
            <TextField
                {...props}
                variant="outlined"
                size="small"
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error ? error.message : null}
                InputLabelProps={{shrink: !!(value + 1)}}
            />
        )}
    />
);

export function ControlledTextFieldPassword (props: ControlledTextFieldProps) {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleClickShowPassword = () => setShowPassword(!showPassword);

    return (
        <Controller
            control={props.control}
            name={props.name || ''}
            render={({field: {onChange, value}, fieldState: {error}}) => (
                <TextField
                    {...props}
                    type={showPassword ? 'text' : 'password'}
                    variant="outlined"
                    size="small"
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                    InputLabelProps={{shrink: !!(value + 1)}}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">
                            <IconButton
                                onClick={handleClickShowPassword}
                                edge="end"
                            >
                                { showPassword ? <VisibilityOff /> : <Visibility /> }
                            </IconButton>
                        </InputAdornment>
                    }}
                />
            )}
        />
    );
}