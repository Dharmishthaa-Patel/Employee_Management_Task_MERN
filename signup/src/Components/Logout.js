import React from 'react'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { logout_User } from '../Action/Action';

const Logout = () => {

    const history = useHistory()
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(logout_User());
        history.push('/signin')
    }, [dispatch])
 

    return (
        <>
            
        </>
    )
}

export default Logout
