import React from 'react'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { LOGOUT } from '../Action/Action';

const Logout = () => {

    const history = useHistory();
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(LOGOUT())
        window.location.reload()
        history.push('/signin')
    },[])

    return (
        <>
            
        </>
    )
}

export default Logout
