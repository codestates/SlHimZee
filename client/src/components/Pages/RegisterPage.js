import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { registerUser } from '../actions/user_action';
import Axios from 'axios';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';   
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { withRouter } from 'react-router-dom';
import logo from '../../img/리뷰존.png';

const theme = createTheme();

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


function RegisterPage(props) {
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("");
    const [Name, setName] = useState("");
    const [Password, setPassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);



    const onSubmitHandler = (event) => {
        event.preventDefault();

        if (Password !== ConfirmPassword) {
            setOpen(true);
        }

        let body = {
            email: Email,
            password: Password,
            name: Name
        }
        // dispatch(registerUser(body))
        //     .then(response => {
        //         if (response.payload.success) {
        //             props.history.push("/login")
        //         } else {
        //             alert("Failed to sign up")
        //         }
        //     })
    }



    return (
        // <div style={{
        //     display: 'flex', justifyContent: 'center', alignItems: 'center'
        //     , width: '100%', height: '100vh'
        // }}>
        //     <form style={{ display: 'flex', flexDirection: 'column' }}
        //         onSubmit={onSubmitHandler}
        //     >
        //         <label>Email</label>
        //         <input type="email" value={Email} onChange={onEmailHandler} />

        //         <label>Name</label>
        //         <input type="text" value={Name} onChange={onNameHandler} />

        //         <label>Password</label>
        //         <input type="password" value={Password} onChange={onPasswordHandler} />

        //         <label>Confirm Password</label>
        //         <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />

        //         <br />
        //         <button type="submit">
        //             회원 가입
        //         </button>
        //     </form>
        // </div>

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
                        Sign up
                    </Typography>
                    <Box component="form" onSubmit={onSubmitHandler} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="name"
                            name="name"
                            autoComplete="name"
                            autoFocus
                            onChange={(event) => {
                                setName(event.target.value);
                            }}
                        />
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
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="confirm_password"
                            label="confirm_password"
                            type="password"
                            id="corfirm_password"
                            autoComplete="current_password"
                            onChange={(event) => {
                                setConfirmPassword(event.target.value);
                            }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign UP
                        </Button>
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
                            ❌ 비밀번호 오류 ❌ 
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            '비밀번호'와 '비밀번호 확인'이 달라요
                        </Typography>
                    </Box>
                </Modal>
                {/* Modal */}
            </Container>
        </ThemeProvider>




    )
}

export default withRouter(RegisterPage)
