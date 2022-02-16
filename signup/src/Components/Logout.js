import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { logout_User } from '../Action/Action';

const Logout = () => {

    const loginStatus = useSelector(state => state.loginStatus)
    const history = useHistory()
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(logout_User())
        
    }, [dispatch])
 
    useEffect(() => {
        if(loginStatus === false){
            history.push('/')
        }
    },[loginStatus])

    return (
        <>
            
        </>
    )
}

export default Logout
