import React from 'react'
import { NavLink } from 'react-router-dom';


const NavBar = () => {

    return (
        <>
            <nav className='navbar navbar-expand-lg navbar-dark py-2'>
                
                <div className='nav_div'>
                    <NavLink to="/"> Home </NavLink>&nbsp;
                    <NavLink to="/deshboard"> Deshboard </NavLink>&nbsp;
                    <NavLink to="/signup"> SignUp </NavLink>&nbsp;
                    <NavLink to="/signin"> SignIn </NavLink>&nbsp;
                    <NavLink to="/logout"> LogOut </NavLink>
                </div>
                
            </nav>
        </>
    )
}

export default NavBar;
