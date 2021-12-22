import Web3 from 'web3';
import logo from './리뷰.png';
import React, { useState, useEffect } from 'react';
import { Navbar, Nav, NavDropdown, Button, Container, Offcanvas, Form, FormControl } from 'react-bootstrap';


const Bar = () => {

    return (
        <Navbar bg="" expand="lg">
        <Container fluid>
            <Navbar.Brand href="#">
                    <img
                        src={logo}
                        width="100"
                        height="50"
                    />
                   RIVIEW ZONE
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
                <Form className="d-flex">
                    <FormControl
                        type="search"
                        placeholder="Search"
                        className="me-4"
                        aria-label="Search"
                    />
                    <Button variant="outline-success">Search</Button>
                </Form>
            </Navbar.Collapse>
        </Container>
        
    </Navbar>
    );
};

export default Bar;