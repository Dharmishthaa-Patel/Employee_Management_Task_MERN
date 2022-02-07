import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup"
import { useDispatch } from "react-redux";
import { login_User } from "../Action/Action";

const SignIn = () => {

    const dispatch = useDispatch();

    const initialValues = {
        email: '',
        password: ''
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('E-mail is not valid!')
            .required('E-mail is required!'),
        
        password: Yup.string()
            .required('Password is required!'),
    })

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {            
            dispatch(login_User(values))             
        }
    })
 
    return (
        <>
            <div>            
                    <h2> Sign In </h2>
                    
                    <form className="loginForm" onSubmit={formik.handleSubmit}>
                        <input type="text"
                            name="email"
                            autoComplete="off" placeholder='Email-Id'
                            onChange={formik.handleChange}
                        {...formik.getFieldProps("email")}
                    /><br />
                    {formik.touched.email && formik.errors.email ? (
                        <div className="fv-plugins-message-container">
                            <div className="fv-help-block error">
                                {formik.errors.email}
                            </div>
                        </div>
                    ) : null}
                    <br />
                        
                        <input type="password"
                            name="password"
                            autoComplete="off" placeholder='Password'
                            onChange={formik.handleChange}
                        {...formik.getFieldProps("password")}
                    /><br />
                    {formik.touched.password && formik.errors.password ? (
                        <div className="fv-plugins-message-container">
                            <div className="fv-help-block error">
                                {formik.errors.password}
                            </div>
                        </div>
                    ) : null}
                    <br />

                        <button className='btn btn-dark mt-3' 
                                type='submit' >
                            Login
                        </button>                    
                    </form>
            </div>
        </>
    )
}

export default SignIn