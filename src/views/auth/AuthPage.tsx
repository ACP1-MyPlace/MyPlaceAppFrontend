import React, {useState} from "react";
import {
    BottomNavigation,
    BottomNavigationAction,
    Card,
    CardActions,
    CardContent,
    Stack,
    Typography
} from "@mui/material";
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded';
import {AccountLayoutAdmin} from "../../layouts/AccountLayoutAdmin";
import Login from "./Login";
import Register from "./Register";

function AuthPage() {
    
    const [actualTab, setActualTab] = useState<number>(0);
    
    return (
        <AccountLayoutAdmin>
            <Card sx={{ minWidth: '493px' }}>
                <CardContent>
                    <Typography variant="h1" color="primary" mb={2}>
                        MY PLACE
                    </Typography>

                    <Stack p={1}>
                        { (actualTab === 0) && <Login /> }

                        { (actualTab === 1) && <Register /> }
                    </Stack>
                </CardContent>
                
                <CardActions>
                    <BottomNavigation
                        showLabels
                        value={actualTab}
                        onChange={(event, newValue) => {
                            setActualTab(newValue);
                        }}
                        sx={{ width: '100%' }}
                    >
                        <BottomNavigationAction label="Iniciar Sesión" icon={<PersonRoundedIcon />} />
                        <BottomNavigationAction label="Registrarse" icon={<PersonAddAlt1RoundedIcon />} />
                    </BottomNavigation>
                </CardActions>
            </Card>
        </AccountLayoutAdmin>
    );
}

export default AuthPage;
