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
                        <Card sx={{ minWidth: '493px' }}>
                            <CardContent>
                                <Typography variant="h1" color="primary" mb={2}>
                                    MY PLACE
                                </Typography>

                                { props.children }
                            </CardContent>
                        </Card>
                    </Grid>
                </Typography>
            </Grid>
        </Grid>
    );
}