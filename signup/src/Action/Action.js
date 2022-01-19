import axios from "axios"

// add User
export const ADD_DATA = (values) => dispatch => {
    return(
        axios.post(`/signup`,values)
        .then(res => {
            const getdata = res.data
            console.log(getdata)
            alert("Registration Successfull")
            dispatch({ type: "SIGNUP", payload: getdata })
            console.log("Registration Successfully", getdata)
        })
        .catch(err => {
            console.log(err);
        })
    )
}

// get data with pagination
export const GETDATA = (pageNo) => dispatch => {
    return(
        axios.get(`/getuser/page=${pageNo}/getdata`)
        .then(res => {
            const getUserData = res.data
            console.log("getUserData",getUserData)
            dispatch({ type: "GETDATA", payload: getUserData })
        })
        .catch(err => {
            console.log(err);
        })
    )
}

//Sorting
export const ASC_ORDER = (pageNo) => dispatch => {
    return(
        axios.get(`/getuser/page=${pageNo}/asc`)
        .then(res => {
            const ascData = res.data
            dispatch({ type: "ASC_ORDER", payload: ascData})
        })
        .catch(err => {
            console.log(err);
        })
    )
}

export const DSC_ORDER = (pageNo) => dispatch => {
    return(
        axios.get(`/getuser/page=${pageNo}/dsc`)
        .then(res => {
            const dscData = res.data
            dispatch({ type: "DSC_ORDER", payload: dscData})
        })
        .catch(err => {
            console.log(err);
        })
    )
}

//Searching
export const SEARCH = (pageNo, value) => dispatch => {
    console.log("value",value)
    return(
        axios.get(`/getuser/page=${pageNo}/${value}`)
        .then(res => {
            const search = res.data
            dispatch({ type: "SEARCH" , payload: search})
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
                console.log(editUserData);
                dispatch({type: "EDITDATA", payload:editUserData})
            })
            .catch(err => {
            console.log("Error", err);
        })
    )
}

//update User
export const UPDATEDATA  = (id,values) => dispatch => {
    return (
        axios.put(`/signup/${id}`, values)
            .then(res => {
                const updateUserData = res.data;
                console.log("updateUserData", updateUserData);
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
    return(
        axios.post(`/signin`,values)
        .then(res => {
            const loginData = res.data
            console.log(loginData)
            alert("Login Successfully")
            dispatch({ type: "LOGIN_USER", payload: loginData})
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
                payload : logOut
            })
        })
        .catch(err => {
            console.log("Error", err)
        })
    )
}