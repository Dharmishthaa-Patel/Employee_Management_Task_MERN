import React from 'react'
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const NavBar = () => {

    const loginStatus = useSelector(state => state.loginStatus)

    const Menu = () => {

        if(loginStatus){
            return (
                <>
                    <nav className='navbar-expand-lg navbar-dark py-2'>
                        <div className='nav_div'>
                            <NavLink to="/">Home</NavLink>&nbsp;
                            <NavLink to="/logout">Logout</NavLink>&nbsp;
                        </div>
                    </nav>
                </>
            )
        } else {
            return (
                <>
                    <nav className='navbar-expand-lg navbar-dark py-2'>
                        <div className='nav_div'>
                            <NavLink to="/">Home</NavLink>&nbsp;
                            <NavLink to="/signup">SignUp</NavLink>&nbsp;
                            <NavLink to="/signin">SignIn</NavLink>&nbsp;
                        </div>
                    </nav>
                </>
            )
        }
    }

    return (
        <>
            <div className='nav_div'>
                <Menu />
            </div>
        </>
    )
}

export default NavBar;
