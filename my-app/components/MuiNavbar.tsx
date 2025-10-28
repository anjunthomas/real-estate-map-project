'use client';
import { AppBar, Toolbar, IconButton, Typography, Stack, Button, TextField, InputAdornment } from "@mui/material"
import CatchingPokemonIcon from '@mui/icons-material/Map'
import SearchIcon from '@mui/icons-material/Search'

export const MuiNavbar = () => {
    return(
        <AppBar position='static' sx={{ bgcolor: '#2d7a6e' }}>
            <Toolbar>
                <IconButton 
                    size='large' 
                    edge='start' 
                    color='inherit' 
                    aria-label='logo'
                >
                    <CatchingPokemonIcon />
                </IconButton>
                <Typography variant='h6' component='div' sx={{ mr: 3 }}>
                    Real Estate Map
                </Typography>
                
                <TextField
                    placeholder="Search address..."
                    size="small"
                    sx={{ 
                        flexGrow: 1,
                        maxWidth: '500px',
                        bgcolor: 'rgba(255,255,255,0.15)',
                        borderRadius: 1,
                        '& .MuiOutlinedInput-root': {
                            color: 'white',
                            '& fieldset': {
                                borderColor: 'rgba(255,255,255,0.3)',
                            },
                            '&:hover fieldset': {
                                borderColor: 'rgba(255,255,255,0.5)',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'white',
                            },
                        },
                        '& .MuiInputBase-input::placeholder': {
                            color: 'rgba(255,255,255,0.7)',
                            opacity: 1,
                        }
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{ color: 'rgba(255,255,255,0.7)' }} />
                            </InputAdornment>
                        ),
                    }}
                />

                <Stack direction='row' spacing={2} sx={{ ml: 3 }}>
                    <Button color='inherit'>Map</Button>
                    <Button color='inherit'>About</Button>
                    <Button color='inherit'>Login</Button>
                </Stack>
            </Toolbar>
        </AppBar>
    );
};