import React, {useContext} from 'react'
import * as bs from 'react-bootstrap'
import { Navbar } from 'react-bootstrap'
import {Link} from "react-router-dom"
import Logo from './labLogo.png'
import AppContext from './context'



function Top() {
    const state = useContext(AppContext)
    let qtyTotal = state.getTotayQty()

    return (
        <div>
            <Navbar variant="dark" expand="lg">
                <Link to="/">
                    <Navbar.Brand>
                    <img
                        alt="NW Labs"
                        src={Logo}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                        Artic Shoppings
                    </Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <bs.Nav className="mr-auto">
                        <Link to="/" className="nav-link" style={{color: "white"}}>Home</Link>
                        <Link to="/about" className="nav-link" style={{color: "white"}}>About</Link>
                        <Link to="/help" className="nav-link" style={{color: "white"}}>Help</Link>
                    </bs.Nav>
                    <bs.Nav>
                        <Link to="/cart" className="nav-link" style={{color: "white"}}>
                            <i className="fas fa-shopping-cart"></i> ({qtyTotal})
                        </Link> 
                        <bs.NavDropdown title="Welcome, Dakota" alignRight style={{color: "white"}}>
                            <bs.NavDropdown.Item>My Account</bs.NavDropdown.Item>
                            <bs.NavDropdown.Divider />
                            <bs.NavDropdown.Item href="#action/3.4">Log Out</bs.NavDropdown.Item>
                        </bs.NavDropdown>
                    </bs.Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )  
}

export default Top