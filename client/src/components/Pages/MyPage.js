import React, { useState} from 'react';
import { Box, ThemeProvider, createTheme } from '@mui/system';
import { Container } from '@mui/material';
import { useDispatch } from 'react-redux';
import { auth, logoutUser } from '../actions/user_action';
import axios from 'axios';

const theme = createTheme({
    palette: {
        background: {
            paper: '#fff',
        },
        text: {
            primary: '#173A5E',
            secondary: '#46505A',
        },
        action: {
            active: '#001E3C',
        },
        success: {
            dark: '#009688',
        },
    },
});

export default function MyPage() {

    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [tokenBalance, setTokenBalance] = useState("");
    const [ethBalance, setEthBalance] = useState("");

    dispatch(auth())
        .then((res) => {
            console.log(res.payload);
            setEmail(res.payload.email);
            setName(res.payload.name);
            setAddress(res.payload.address);
            setTokenBalance(res.payload.tokenBalance);
            setEthBalance(res.payload.ethBalance);
        })

    return (
        <Container component="main" maxWidth="xs">
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    marginTop: 10,
                        bgcolor: "#FFC314",
                    boxShadow: 3,
                    borderRadius: 3,
                    p: 1,
                    minWidth: 300,
                }}
            >
                <Box sx={{ color: 'text.secondary' }}>Name</Box>
                <Box sx={{ color: 'text.primary', fontSize: 20, fontWeight: 'medium' }}>
                    {name}
                </Box>
            </Box>
                <Box
                    sx={{
                        marginTop: 3,
                        bgcolor: "#FFC314",
                        boxShadow: 3,
                        borderRadius: 3,
                        p: 1,
                        minWidth: 300,
                    }}
                >
                    <Box sx={{ color: 'text.secondary' }}>Email</Box>
                    <Box sx={{ color: 'text.primary', fontSize: 20, fontWeight: 'medium' }}>
                        {email}
                    </Box>
                </Box>
                <Box
                    sx={{
                        marginTop: 3,
                        bgcolor: "#FFC314",
                        boxShadow: 3,
                        borderRadius: 3,
                        p: 1,
                        minWidth: 300,
                    }}
                >
                    <Box sx={{ color: 'text.secondary' }}>Address</Box>
                    <Box sx={{ color: 'text.primary', fontSize: 16, fontWeight: 'medium' }}>
                        {address}
                    </Box>
                </Box>
                <Box
                    sx={{
                        marginTop: 3,
                        bgcolor: "#FFC314",
                        boxShadow: 3,
                        borderRadius: 3,
                        p: 1,
                        minWidth: 300,
                    }}
                >
                    <Box sx={{ color: 'text.secondary' }}>Token Balance</Box>
                    <Box sx={{ color: 'text.primary', fontSize: 20, fontWeight: 'medium' }}>
                        {tokenBalance}
                    </Box>
                </Box>
                <Box
                    sx={{
                        marginTop: 3,
                        bgcolor: "#FFC314",
                        boxShadow: 3,
                        borderRadius: 3,
                        p: 1,
                        minWidth: 300,
                    }}
                >
                    <Box sx={{ color: 'text.secondary' }}>Eth Balance</Box>
                    <Box sx={{ color: 'text.primary', fontSize: 20, fontWeight: 'medium' }}>
                        {ethBalance/1000000000000000000} ETH
                    </Box>
                </Box>
            </ThemeProvider>
        </Container>
    );
}
