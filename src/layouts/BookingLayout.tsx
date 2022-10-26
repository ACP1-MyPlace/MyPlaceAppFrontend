import React from 'react';
import {Card, CardContent, Grid, Typography} from '@mui/material';

import styles from './AccountLayoutAdmin.module.css';

interface BookingLayoutProps {
    children: React.ReactNode
}

export function BookingLayout (props: BookingLayoutProps) {
    return (
        <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={12}>
                <Typography component="div" className={styles.root}>
                    <Grid container spacing={3} item xs={12} sm={12} md={12} lg={12} className={styles.contentForm}>
                        { props.children }
                    </Grid>
                </Typography>
            </Grid>
        </Grid>
    );
}