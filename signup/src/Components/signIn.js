import React from "react";
import { TextField } from "@material-ui/core";
import { useFormik } from "formik";
import * as Yup from "yup"
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LOGIN } from "../Action/Action";

const SignIn = () => {

    const history = useHistory()
    const dispatch = useDispatch()

    const validation = Yup.object().shape({
        email: Yup.string()
        .email("Invalid Email Address format")
        .required("Email is Require"),

        pwd: Yup.string()
        .min(3, "Add Minimum 3 characters")
        .required("Password is Require"),
    })

    const formik = useFormik({
        initialValues : {
            email:'',
            pwd:''
        },
        //validationSchema: validation,
        onSubmit: (values) => {
            dispatch(LOGIN(values))
            history.push('/deshboard')
            formik.handleReset(); 
        }
    })

    return(
        <>
            
            <div className="addItems">
                 
                <form onSubmit={formik.handleSubmit}>

                    <h2> Login Form </h2>

                    <TextField 
                        input type="email" placeholder="Email-Id" name='email' 
                        onChange={formik.handleChange} autoComplete='off'
                        value={formik.values.email} required
                    />
                    <br /><br />
                    <TextField 
                        input type="password" placeholder="Password" name='pwd' 
                        onChange={formik.handleChange} autoComplete='off'
                        value={formik.values.pwd} required
                    />
        
                    <br /><br />
                    <button type="submit" className="btn btn-dark mt-3">SignIn</button>
                    
                    <div>
                        <NavLink to ='/signup'> Create An Account</NavLink>
                    </div>
                </form>
            </div>
        </>
    )
}

export default SignIn