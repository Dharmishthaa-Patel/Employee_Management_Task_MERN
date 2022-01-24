import axios from "axios"

// add User
export const ADD_DATA = (values) => dispatch => {
    return (
        axios.post(`/signup`, values)
            .then(res => {
                const getdata = res.data
                alert("Registration Successfull")
                dispatch({ type: "SIGNUP", payload: getdata })
            })
            .catch(err => {
                console.log(err);
            })
    )
}

// get data with pagination
export const GETDATA = (pageNo, sorting) => dispatch => {
    return (
        axios.get(`/getuser/${pageNo}/${sorting}`)
            .then(res => {
                const getUserData = res.data
                dispatch({ type: "GETDATA", payload: getUserData })
            })
            .catch(err => {
                console.log(err);
            })
    )
}

//edit User
export const EDITDATA = (id) => dispatch => {
    return (
        axios.get(`/signup/${id}`)
            .then(res => {
                const editUserData = res.data;
                dispatch({ type: "EDITDATA", payload: editUserData })
            })
            .catch(err => {
                console.log("Error", err);
            })
    )
}

//update User
export const UPDATEDATA = (id, values) => dispatch => {
    return (
        axios.put(`/signup/${id}`, values)
            .then(res => {
                const updateUserData = res.data;
                dispatch({ type: "UPDATEDATA", payload: updateUserData })
            })
            .catch(err => {
                console.log("Error", err);
            })
    )
}

//Delete User
export const DELETEDATA = (id) => dispatch => {
    return (
        axios.delete(`/signup/${id}`)
            .then(res => {
                const userData = res.data;
                dispatch({ type: "DELETEDATA", payload: userData })
            })
            .catch(err => {
                console.log("Error", err);
            })
    )
}

// Login User
export const LOGIN = (values) => dispatch => {
    return (
        axios.post(`/signin`, values)
            .then(res => {
                const loginData = res.data
                alert("Login Successfully")
                dispatch({ type: "LOGIN_USER", payload: loginData })
            })
            .catch(err => {
                alert("Invalid User")
                console.log(err);
            })
    )
}

// Logout 
export const LOGOUT = () => dispatch => {
    return (
        axios.get(`/logout`)
            .then(res => {
                const logOut = res.data
                dispatch({
                    type: "LOGIN_USER",
                    payload: logOut
                })
            })
            .catch(err => {
                console.log("Error", err)
            })
    )
}