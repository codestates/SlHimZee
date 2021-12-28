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

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleClose = () => {
        setSuccess(false);
        setError(false);
        if (success) {
            props.history.push("/login");
        }
    };


    const onSubmitHandler = (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setError(true);
        }

        let body = {
            email: email,
            password: password,
            name: name
        }
        console.log(body);
        dispatch(registerUser(body))
            .then(response => {
                if (response.payload.success) {
                    setSuccess(true);
                }
                else {
                    setError(true);
                }
            })
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
                {/* 비밀번호 오류 Modal */}
                <Modal
                    open={error}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            ❌ 회원가입 오류 ❌
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            정보를 다시 확인해 주세요
                        </Typography>
                    </Box>
                </Modal>
                {/* 비밀번호 오류 Modal */}
                {/* 회원가입 성공 Modal */}
                <Modal
                    open={success}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            ✅ 회원가입 성공!
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            🦊 지금 바로 로그인해 보세요! 🦊
                        </Typography>
                    </Box>
                </Modal>
                {/* 회원가입 성공 Modal */}
            </Container>
        </ThemeProvider>




    )
}

export default withRouter(RegisterPage)