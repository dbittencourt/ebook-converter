import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Collapse, Label, Nav, Navbar, NavbarBrand, NavItem, NavLink } from 'reactstrap';
import Auth from '../tools/Auth';
  
const NavBar = (props: any) => {

    const signOut = () =>{
        Auth.signOut();
        props.history.push('/');
    }
    
    return (
    <Navbar color="dark" expand="md">
        <NavbarBrand href="/">Converter</NavbarBrand>
        <Collapse isOpen={true} navbar={true}>
            <Nav className="ml-auto navbar-left">
                <NavItem>
                    <NavLink href="/home">Home</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/about">About</NavLink>
                </NavItem>
                {
                    Auth.isAuthenticated() && 
                        <NavItem>
                            <NavLink href="/books">Books</NavLink>
                        </NavItem>
                }
            </Nav>
            <Nav className="ml-auto navbar-right">  
                {
                    !Auth.isAuthenticated() 
                    ? <Button color="primary" onClick={Auth.signIn}>Sign In</Button>
                    : <div>
                        <Label className="text-white">{Auth.getProfile().name}</Label>
                        <Button color="primary" onClick={signOut}>Sign Out</Button>
                      </div>
                }
            </Nav>
        </Collapse>
    </Navbar>);        
}

export default withRouter(NavBar);