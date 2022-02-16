import React from 'react'
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Cookies from 'js-cookie';

const NavBar = () => {

    const LoginUser = useSelector(state => state.LoginUser)

    const cookie = Cookies.get('jwtLogin')
    console.log("cookie",cookie)

    const Menu = () => {

            return (
                <>
                    <nav className='navbar-expand-lg navbar-dark py-2'>
                        <div className='nav_div'>
                        {
                            cookie !== undefined && (
                                <>
                                    <NavLink to="/"> Home </NavLink>&nbsp;&nbsp;
                                    <NavLink to="/deshboard"> Dashboard </NavLink>&nbsp;&nbsp;
                                    <NavLink to="/uploadfile"> UploadFile </NavLink>&nbsp;&nbsp;
                                    <NavLink to="/logout"> Logout </NavLink>&nbsp;
                                </>
                            )
                        }
                        {
                            LoginUser === "" && cookie === undefined &&  (
                                <>
                                    <NavLink to="/"> Home </NavLink>&nbsp;&nbsp;
                                    <NavLink to="/signup"> SignUp </NavLink>&nbsp;&nbsp;
                                    <NavLink to="/signin"> SignIn </NavLink>&nbsp;
                                </>
                            )
                        }
                            
                        </div>
                    </nav>
                </>
            )
        
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
