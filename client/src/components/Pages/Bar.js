import Web3 from 'web3';
import logo from '../../img/리뷰존.png';
import React, { useState, useEffect } from 'react';
import { Navbar, Nav, NavDropdown, Button, Container, Offcanvas, Form, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const Bar = () => {

    return (
       
        <Navbar bg= 'warning' expand="lg">
            <Container fluid>
                <Navbar.Brand href="/" al >
                    <img
                        src={logo}
                        width="200"
                        className='ms-4'
                    />
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