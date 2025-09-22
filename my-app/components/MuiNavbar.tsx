'use client';
import {AppBar, Toolbar, IconButton, Typography, Stack, Button } from "@mui/material"
import CatchingPokemonIcon from '@mui/icons-material/Map'

export const MuiNavbar = () => {
    return(
        <AppBar position='static'>
            <Toolbar>
                <IconButton 
                    size='large' 
                    edge='start' 
                    color='inherit' 
                    aria-label='logo'
                >
                    <CatchingPokemonIcon />
                </IconButton>
                <Typography variant='h6' component='div' sx={{ flexGrow: 1}}>
                    Real Estate Map
                    </Typography>
                    <Stack direction='row' spacing={2}>
                        <Button color='inherit'>Map</Button>
                        <Button color='inherit'>About</Button>
                        <Button color='inherit'>Login</Button>
                    </Stack>
            </Toolbar>
        </AppBar>
    );
};