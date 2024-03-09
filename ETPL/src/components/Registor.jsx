import React, { useState} from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import axios from 'axios';

const URL = 'http://localhost:8000'; // Replace with your actual backend URL

function Registor() {

    const [formData, setFormData] = useState({
        name: '',
        dob: '',
        email: '',
        password: ''
    });
    const handleChange = (e, field) => {
        const updatedFormData = {
            ...formData,
            [field]: e.target.value
        };
        setFormData(updatedFormData);
    };

    const saveUser = async () => {
        try {
            const result = await axios.post(`${URL}/api/users/register`, formData).data;
          
            localStorage.setItem('userData', JSON.stringify(formData));

            setFormData({
                name: '',
                dob: '',
                email: '',
                password: ''
            });
            alert('Register Successfully!!!')
            localStorage.removeItem('formData');
        } catch (error) {
            console.log(error);
            // Handle error - display error message to the user
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: "center",
                alignItems: 'center',
                height: '89vh',
            }}
        >
            <Box
                sx={{
                    backgroundColor: '#6c7797',
                    padding: '30px',
                    borderRadius: '20px',
                    marginTop: '20px'
                }}
            >
                <Box
                    component="form"
                    sx={{
                        marginTop: "20px",
                        width: '600px',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <Box
                        sx={{
                            backgroundColor: '#70f1e1',
                            order: -1,
                            marginTop: '-11%',
                            width: '30%',
                            marginLeft: '33%',
                            textAlign: 'center',
                        }}
                    >
                        <Typography sx={{
                            fontSize: "30px",
                            fontWeight: '100',
                            color: '#4ca9aa'
                        }}>SIGN IN</Typography>
                    </Box>
                    <Box
                        sx={{
                            marginTop: '2%'
                        }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Name"
                                    type='text'
                                    value={formData.name}
                                    onChange={(e) => handleChange(e, 'name')}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    required
                                    fullWidth
                                    type='date'
                                    placeholder=''
                                    value={formData.dob}
                                    onChange={(e) => handleChange(e, 'dob')}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="outlined-email-input"
                                    label="Email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => handleChange(e, 'email')}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    required
                                    fullWidth
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
                        onClick={saveUser}
                    >
                        Register
                    </Button>
                </Box>
                <Typography>Already register? <a href='/login'>login</a></Typography>
            </Box>
        </Box>
    );
}

export default Registor;
