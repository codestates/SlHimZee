import Web3 from 'web3';
// import logo from './한강.png';
import React, { useState, useEffect } from 'react';
import { Navbar, Nav, NavDropdown, Button, Container, Offcanvas, Form, FormControl } from 'react-bootstrap';
import ham from '../../img/ham.png';
import { useDispatch } from 'react-redux';
import { auth, logoutUser } from '../actions/user_action';
import axios from 'axios';

const Bar = ({isLogin}) => {
    const [show, setShow] = useState(false);
    const [isAuth, setIsAuth] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const dispatch = useDispatch();
    
    dispatch(auth())
        .then((res) => {
            console.log(res.payload);
            if (res.payload.isAuth) {
                console.log("login check");
                setIsAuth(true);
                setIsAdmin(res.payload.isAdmin);
            }
        })

    const handleLogout = () => {
        console.log("logoout");
        axios.get(`http://localhost:4000/api/users/logout`, { withCredentials: true })
        .then(response => {
            if (response.data.success) {
                console.log('로그아웃 성공')
                setIsAuth(false);
            } else {
                console.log('로그아웃 실패')
                alert('로그아웃 하는데 실패 했습니다.')
            }
        })
    }

    return (

        <Navbar bg="warning" expand="lg">
            <Button variant="dark" onClick={handleShow} className='ms-1'>
                <img
                    src={ham}
                    width="30"
                />
                All
            </Button>

            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title id="offcanvasNavbarLabel">로그인</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav className="justify-content-end flex-grow-1 pe-3">
                        <Nav.Link href="#action1">화장품</Nav.Link>
                        <Nav.Link href="#action2">주방용품</Nav.Link>
                        <Nav.Link href="#action1">가전제품</Nav.Link>
                        <Nav.Link href="#action2">미술품</Nav.Link>
                        <Nav.Link href="#action1">헬스용품</Nav.Link>
                        <NavDropdown title="Dropdown" id="offcanvasNavbarDropdown">
                            <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action5">
                                Something else here
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Form className="d-flex">
                        <FormControl
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                </Offcanvas.Body>
            </Offcanvas>


            <Container fluid>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >

                        <Nav.Link href="/Tl">Today's likes</Nav.Link>
                        <Nav.Link href="/CS">Customor Service</Nav.Link>
                        <Nav.Link href="/CA">Commercial application</Nav.Link>
                        <Nav.Link href="/TD">Today's deal</Nav.Link>
                        <Nav.Link href="#" disabled>
                            Market Price Review Token : $
                        </Nav.Link>
                    </Nav>
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <NavDropdown title="Link" id="navbarScrollingDropdown">
                            <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action5">
                                Something else here
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <div className="mb-2">
                        {isAdmin ?
                                <Button variant="dark" href="/product/upload" size="md" className="me-1">
                                    Upload
                                </Button> : ""}

                            <Button variant="dark" href={isAuth ? "" : "/login"} size="md" className="me-1" onClick={() => {
                                if (isAuth) {
                                    handleLogout();
                                }
                            }}>
                                {isAuth? "Sign Out" : "Sign In"}
                            </Button>
                            <Button variant="dark" href="/register" size="md">
                                {isAuth? "Sign Out" : "Sign Up"}
                            </Button>
                            <Button variant="dark" href={isAuth ? "/myPage" : "/register"} size="md">
                                {isAuth? "My Page" : "Sign Up"}
                            </Button>

                        </div>
                    </Nav>
                </Navbar.Collapse>
            </Container>

        </Navbar>
    );
};

export default Bar;
