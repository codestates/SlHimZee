import Web3 from 'web3';
import logo from './한강.png';
import React, { useState, useEffect } from 'react';
import { Navbar, Nav, NavDropdown, Button, Container, Offcanvas, Form, FormControl } from 'react-bootstrap';
import ham from './ham.png';

const Bar = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (

        <Navbar bg="warning" expand="lg">
            <Button variant="dark" onClick={handleShow}>
                <img
                    src={ham}
                    width="30"
                    height="30"
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
                </Navbar.Collapse>
            </Container>

        </Navbar>
    );
};

export default Bar;
