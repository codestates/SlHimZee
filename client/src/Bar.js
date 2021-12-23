import Web3 from 'web3';
import logo from './리뷰존.png';
import React, { useState, useEffect } from 'react';
import { Navbar, Nav, NavDropdown, Button, Container, Offcanvas, Form, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const Bar = () => {

    return (
       
        <Navbar bg="" expand="lg">
            <Container fluid>
                <Navbar.Brand href="#">
                    <img
                        src={logo}
                        width="100"
                        height="90"
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
                <Nav>
                    <div className="mb-2">
                    
                        <Button variant="dark" href="/signinfrom" size="md">
                            Sign in
                        </Button>
                      
                        <Button variant="warning" herf="/signup" size="md">
                            Sign up
                        </Button>
                        
                    </div>
                </Nav>
            </Container>

        </Navbar>
       
    );
};

export default Bar;