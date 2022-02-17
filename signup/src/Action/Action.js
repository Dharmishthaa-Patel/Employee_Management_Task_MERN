import axios from "axios"
import 'react-toastify/dist/ReactToastify.css'
import { toast } from 'react-toastify'


// ============= GetList Of Upload File ============
export const get_upload_file = (page) => dispatch => {
    axios.get(`/getUploadFile/?page=${page}`)
    .then(res => {
        const getUploadFile = res.data
        dispatch({
            type : "GET_UPLOAD_FILE",
            payload : getUploadFile
        })
    })
    .catch(error => {
        console.log("Error", error);
    })
}

// ============= Upload File =================
toast.configure()
export const upload_file = (multi_files) => dispatch => {
    return(
        axios.post(`/uploadFile`, multi_files)
        .then((res) => {
            if(res.data.length <= 0){
                toast.success("File Uploaded Successfully",{
                    position : toast.POSITION.TOP_RIGHT, 
                    autoClose :2000 
                })
            } else {
                toast.warning(`${res.data} ${res.data.length} Files Not Uploaded`, { 
                    position: toast.POSITION.TOP_CENTER, 
                    autoClose: 3000 
                });
            }
            dispatch({
                type : "UPLOAD_FILE", 
                payload: res.data
            })
        })
        .catch(error => {
            dispatch({
                type : "UPLOAD_FILE"
            })
            toast.error("File Is Not Uploaded",{
                position : toast.POSITION.TOP_RIGHT, 
                autoClose :2000 
            })
            console.log("Error",error);
        })
    )
}

// ============ Delete Upload File ============
toast.configure()
export const delete_file = (id) => dispatch => {
    axios.delete(`/deleteUploadFile/?id=${id}`)
        .then(res => {
            toast.success("File Deleted Successfully",{
                position : toast.POSITION.TOP_RIGHT, 
                autoClose :2000 
            })
            dispatch({
                type : "DELETEFILE"
            })
        })
        .catch (error => {
            dispatch({
                type : "DELETEFILE"
            })

            toast.error("File Is Not Deleted",{
                position : toast.POSITION.TOP_RIGHT, 
                autoClose :2000 
            })
            console.log("Error", error);
        })
}

// =========== Delete Multiple File ===========
toast.configure()
export const delete_multiple_file = (files) => dispatch => {
    axios.put(`/deleteMultipleFile`, files)
    .then(res => {
        toast.success("Files Deleted Successfully",{
            position : toast.POSITION.TOP_RIGHT, 
            autoClose :2000 
        })
        dispatch({
            type : "DELETE_MULTIPLE_FILE"
        })
    })
    .catch (error => {
        dispatch({
            type : "DELETE_MULTIPLE_FILE"
        })
        toast.error("Files Is Not Deleted",{
            position : toast.POSITION.TOP_RIGHT, 
            autoClose :2000 
        })
        console.log("Error", error);
    })
}

// =========== Loading ==========
export const loading_Action = () => dispatch => { 
    return (
        dispatch({
            type: "LOADER"
        })
    )
}

// ============== Check Cookie ===============
export const check_cookie = () => dispatch => {
    axios.get(`/checkCookie`)
    .then((res) => {
        const checkCookie = res.data
        dispatch({
            type: "CHECK_COOKIE",
            payload: checkCookie
        })
    })
    .catch (error => {
        console.log("Error", error);
    })
}
// ============== Add New User ================
toast.configure()
export const register_user = (values) => dispatch => {
    return (
       axios.post(`/signUp`, values)
            .then((res) => {

                const newUser = res.data

                if (newUser === " This Email is already Exists") {
                toast.error(newUser, { 
                    position : toast.POSITION.TOP_RIGHT, 
                    autoClose :2000 
                })
                } else {
                toast.success(newUser, { 
                    position : toast.POSITION.TOP_RIGHT, 
                    autoClose :2000 
                });
                dispatch({ 
                    type : "REGISTER_USER", 
                    payload : values 
                })
                }
            })
            .catch(error => {
                console.log('Error', error);
            })
    )

}

// ============== Register Toggle ==========
export const register_Toggle = () => dispatch => {
    return (
        dispatch({
            type : "REGISTER_TOGGLE"
        })
    )
}

// ================= Login =============
toast.configure()
export const login_User = (values) => dispatch => {
    return (
        axios.post(`/signIn`, values)
            .then((res) => {                
                toast.success("Login Successfully", { 
                    position : toast.POSITION.TOP_RIGHT, 
                    autoClose : 2000 
                });
                dispatch({ 
                    type : "LOGIN_USER" 
                })
            })
            .catch(error => {
                toast.error("Invalid User", { 
                    position : toast.POSITION.TOP_RIGHT, 
                    autoClose : 2000 
                })
                console.log('Error', error);
            })
    )
}

// ============== Get Data =================
export const get_User = (page,sort,Request) => dispatch => {
    return (
        axios.get(`/getUser/?page=${page}&sort=${sort}&Request=${Request}`)
            .then(res => {
                const getUserData = res.data
                dispatch({ 
                    type : "GET_USER" , 
                    payload : getUserData 
                })            
            })
            .catch(error => {
                console.log("Error", error);            
            })
    )
}

// ============== Edit Data ===============
export const edit_User = (id) => dispatch => {
    return (
        axios.get(`/editUser/${id}`)
            .then(res => {
                const editUserData = res.data;
                dispatch({
                    type : "EDIT_USER", 
                    payload : editUserData
                })
            })
                .catch(error => {
                console.log("Error", error);
            })
    )
}

// ============ Update Data =============
toast.configure()
export const update_User = (id, values, email) => dispatch => {
    return (
        axios.put(`/updateUser/${id}/${email}`, values)
            .then(res => {
                toast.success("Updated Successfully!", { 
                    position : toast.POSITION.TOP_RIGHT, 
                    autoClose : 2000 
                });
                dispatch({ 
                    type : "UPDATE_USER" 
                })
            })
            .catch(error => {
                toast.error("Email already Exists", { 
                    position : toast.POSITION.TOP_RIGHT, 
                    autoClose : 2000 
                });
                console.log("Error", error);
            })
    )
}

// ============ Delete Data ====================
toast.configure()
export const delete_User = (email) => dispatch => {
    return (
        axios.delete(`/deleteUser/?email=${email}`)
            .then(res => {
                toast.success("Deleted Successfully", { 
                    position : toast.POSITION.TOP_RIGHT, 
                    autoClose : 2000 
                });                             
                const userData = res.data;
                dispatch({ 
                    type : "DELETE_USER", 
                    payload : userData 
                })
            })
            .catch(error => {
                console.log("Error", error);
            })
    )
}

// ============ Logout =============
toast.configure()
export const logout_User = () => dispatch => {
    return (
        axios.get(`/logout`)
        .then(res => {
                toast.success("You are Logout", { 
                    position : toast.POSITION.TOP_RIGHT, 
                    autoClose : 2000 
                });    
                const userData = res.data;
                dispatch({ 
                    type : "LOGOUT_USER", 
                    payload : userData 
                })
            })
            .catch(error => {
                console.log("Error", error);
            })
    )
}

// =========== Country Data ============
export const country = () => dispatch => {
    axios.get(`/getCountry`)
        .then(res => {
                const userData = res.data;
                dispatch({ 
                    type : "COUNTRY", 
                    payload : userData 
                })
            })
            .catch(error => {
                console.log("Error", error);
            })
}

// ============ State Data ===============
export const state = (countryId) => dispatch => {
    axios.get(`/getState/${countryId}`)
        .then(res => {
            const userData = res.data;
                dispatch({ 
                    type : "STATE", 
                    payload : userData 
                })
            })
            .catch(error => {
                console.log("Error", error);
            })
}

// ========== City Data ===============
export const city = (stateId) => dispatch => {
    axios.get(`/getCity/${stateId}`)
        .then(res => {
            const userData = res.data;
                dispatch({ 
                    type : "CITY", 
                    payload : userData 
                })
            })
            .catch(error => {
                console.log("Error", error);
            })
}

