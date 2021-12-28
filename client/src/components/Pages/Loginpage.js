import React, { useState } from 'react'

import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';                
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import logo from '../../img/리뷰존.png';

import { useDispatch } from 'react-redux';
import { loginUser, auth } from '../actions/user_action';
import { withRouter } from 'react-router-dom';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://github.com/codestates/sad-exhausted-tired.">
                김건우, 송근동, 이민정
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

function LoginPage(props) {
    const dispatch = useDispatch();


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [open, setOpen] = useState(false);
    const [login, setLogin] = useState(false); 
    const [message, setMessage] = useState("");

    const handleClose = () => {
        setOpen(false);
        if (login) {
            window.location.replace("/main")
        }
    };

    const onSubmitHandler = (event) => {
        event.preventDefault();

        let body = {
            email: email,
            password: password
        }

        dispatch(loginUser(body))
            .then(response => {
                setMessage(response.payload.message);
                if (response.payload.loginSuccess) {
                    setLogin(true);
                }
                setOpen(true);
            })
            .then(() => {

                dispatch(auth())
                    .then(res => {
                        console.log(res.payload);
                })
            })


    }

    return (

        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <img
                        src={logo}
                        width="200"
                    />
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={onSubmitHandler} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={(event) => {
                                setEmail(event.target.value);
                            }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={(event) => {
                                setPassword(event.target.value);
                            }}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>

                {/* Modal */}
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                           {login? "✅ 로그인 성공!" : "❌ 로그인 실패.."} 
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            {message}
                        </Typography>
                    </Box>
                </Modal>
                {/* Modal */}
                <Copyright sx={{ mt: 8, mb: 10 }} />
            </Container>
        </ThemeProvider>
    );
}

export default withRouter(LoginPage)