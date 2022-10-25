import React from 'react';
import {Card, CardContent, Grid, Typography} from '@mui/material';

import styles from './AccountLayoutAdmin.module.css';

interface AccountLayoutAdminProps {
    children: React.ReactNode
}

export function AccountLayoutAdmin (props: AccountLayoutAdminProps) {
    return (
        <Grid container>
            <Grid item xs={12}>
                <Typography component="div" className={styles.root}>
                    <Grid container spacing={3} item xs={12} sm={6} md={3} lg={3} className={styles.contentForm}>
                        { props.children }
                    </Grid>
                </Typography>
            </Grid>
        </Grid>
    );
}