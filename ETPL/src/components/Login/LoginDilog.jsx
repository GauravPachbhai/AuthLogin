import React, { useState } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import KeyIcon from '@mui/icons-material/Key';
import axios from 'axios';

const URL = 'http://localhost:8000';

function LoginDialog() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleChange = (e, field) => {
        setFormData({
            ...formData,
            [field]: e.target.value
        });
    };

    const loginUser = async () => {
        try {
            const result = await axios.post(`${URL}/api/users/login`, formData);
            const userData = result.data;
            console.log(userData.token)
            localStorage.setItem('userData', JSON.stringify(userData));
            localStorage.setItem('token',JSON.stringify(userData.token))
            navigate('/dashboard'); // Redirect to dashboard after successful login
        } catch (error) {
            console.log("login fail", error);
            // Handle login failure, display error message to the user
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: "center",
                alignItems: 'center',
                height: '89vh',
                flexDirection: 'column'
            }}
        >
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '30ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <Box
                    sx={{
                        backgroundColor: '#6c7797',
                        padding: '20px',
                        paddingLeft: '-2px',
                        borderRadius: '20px',
                        marginTop: '20px',
                        alignContent: 'center'
                    }}
                >
                    <Box
                        sx={{
                            backgroundColor: '#70f1e1',
                            order: -1,
                            marginTop: '-7% !important',
                            margin: 'auto',
                            width: '30%',
                            textAlign: 'center',
                        }}>
                        <Typography
                            sx={{
                                fontSize: "30px",
                                fontWeight: '100',
                                color: '#4ca9aa'
                            }}>Login</Typography>
                    </Box>
                    <Box
                        sx={{
                            marginTop: '2%',
                            width: '100%'
                        }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12} sx={{ paddingLeft: '7px !important' }}>
                                <PersonIcon sx={{ paddingTop: '20px' }} />
                                <TextField
                                    required
                                    id="outlined-email-input"
                                    label="Email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => handleChange(e, 'email')}
                                />
                            </Grid>
                            <Grid item xs={12} sx={{ paddingLeft: '-3px !important' }}>
                                <KeyIcon sx={{ paddingTop: '20px' }} />
                                <TextField
                                    required
                                    id="outlined-password-input"
                                    label="Password"
                                    type="password"
                                    autoComplete="current-password"
                                    value={formData.password}
                                    onChange={(e) => handleChange(e, 'password')}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                    <Button
                        sx={{
                            marginTop: '2%',
                            bgcolor: '#70f1e1',
                        }}
                        variant="contained"
                        disableElevation
                        disableRipple
                        onClick={loginUser}>Login</Button>
                </Box>
            </Box>
        </Box>
    )
}

export default LoginDialog;
