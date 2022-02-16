import React from 'react'
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const NavBar = () => {

    const isLoading = useSelector(state => state.isLoading)
    const loginStatus = useSelector(state => state.loginStatus)
    

    const Menu = () => {

            return (
                <>
                    <nav className='navbar-expand-lg navbar-dark py-2'>
                        <div className='nav_div'>
                        {
                            loginStatus === true  ? (
                                <>
                                    {
                                        isLoading ? (
                                            <>
                                                <button className='btn btn-dark mt-3' disabled > 
                                                    UploadFile 
                                                </button>&nbsp;&nbsp;
                                                
                                                <button className='btn btn-danger mt-3' disabled > 
                                                    Logout 
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <NavLink to="/uploadfile"> 
                                                    <button className='btn btn-dark mt-3'> UploadFile </button> 
                                                </NavLink>&nbsp;&nbsp;

                                                <NavLink to="/logout">
                                                    <button className='btn btn-danger mt-3'> Logout </button>  
                                                </NavLink>&nbsp;
                                            </>
                                        )
                                    }
                                </>
                            ) : (
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
