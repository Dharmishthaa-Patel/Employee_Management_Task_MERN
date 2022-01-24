import React, { useEffect,useState } from 'react';
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useDispatch, useSelector} from 'react-redux';
import { TextField } from '@material-ui/core';
import { EDITDATA, ADD_DATA, UPDATEDATA } from '../Action/Action';
import queryString from 'query-string'
import { useHistory } from 'react-router-dom';

const SignUp = () => {

    const [formikState, setFormikState] = useState([])
    const history = useHistory();
    const templist = useSelector(state => state.templist)

    const { id } = queryString.parse(window.location.search);
    console.log("id",id);
    
    const dispatch = useDispatch()
    
    const validation = Yup.object().shape({
        name: Yup.string()
        .min(3,"Name is must be 3 character at minimum")
        .required("Name is Required"),

        profession: Yup.string()
        .required("profession is Required"),

        email: Yup.string()
        .email("Invalid Email Address format")
        .required("Email is Require"),

        pwd: Yup.string()
        .min(8, "Add Minimum 3 characters")
        .max(32)
        .required("Password is Require"),

        cpwd: Yup.string()
        .oneOf([Yup.ref('pwd'),null], "Password is not match")
        .required("Confirm Password is Required"),

        phone: Yup.string()
        .max(10)
        .required("Contact No is Required"),

        salary1: Yup.string()
        .max(6)
        .required("Salary is Required"),

        salarySecond: Yup.string()
        .max(6)
        .required("Second Salary is Required"),

        salaryThird: Yup.string()
        .max(6)
        .required("Third Salary is Required")

    })

    const formik = useFormik({
        initialValues: {
            name:'',
            profession:'',
            email:'',
            pwd:'',
            cpwd:'',
            phone:'',
            salary:'',
            salarySecond:'',
            salaryThird:'',
        },
       // validationSchema: {validation},
        onSubmit: (values) => {
            if(id) {
                console.log("update",values)
                dispatch(UPDATEDATA(id,values))
                history.push('/deshboard')
            } else {
                dispatch(ADD_DATA(values))
                history.push('/signin')
                formik.handleReset()
            }
        }
    });

    // id of edit data
    useEffect(() => {  
        if (id) {
            dispatch(EDITDATA(id))
            setFormikState(templist)
        }
    }, [])

    //set value of edit user
    useEffect(() => {
        if (id && templist) {
            formik.setValues(templist)     
        }
    }, [templist])

    return (
        <>
            
            <div className="addItems">
                <form onSubmit={formik.handleSubmit}>
                
                <h2> Registration Form </h2>
                <TextField 
                     input type="text" placeholder="Employee Name" name='name' 
                     onChange={formik.handleChange} autoComplete='off'
                     value={formik.values.name} required 
                />
                <br /><br />
                <TextField 
                     input type="text" placeholder="Employee Name" name='profession' 
                     onChange={formik.handleChange} autoComplete='off'
                     value={formik.values.profession} required 
                />
                <br /><br />
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
                <TextField 
                     input type="password" placeholder="Confirm Password" name='cpwd' 
                     onChange={formik.handleChange} autoComplete='off'
                     value={formik.values.cpwd} required
                />
                <br /><br />
                <TextField 
                     input type="number" placeholder="Contact No" name='phone' 
                     onChange={formik.handleChange} autoComplete='off'
                     value={formik.values.phone} required
                />
                <br /><br />
                <TextField 
                     input type="number" placeholder="First Salary" name='salary' 
                     onChange={formik.handleChange} autoComplete='off'
                     value={formik.values.salary} required
                />
                <br /><br />
                <TextField 
                     input type="number" placeholder="Second Salary" name='salarySecond' 
                     onChange={formik.handleChange} autoComplete='off'
                     value={formik.values.salarySecond} required
                />
                <br /><br />
                <TextField 
                     input type="number" placeholder="Third Salary" name='salaryThird' 
                     onChange={formik.handleChange} autoComplete='off'
                     value={formik.values.salaryThird} required
                />
                <br /><br />

                <button type='submit' className='btn btn-dark mt-3'>
                    {
                        id ? 'Update' : 'Submit'
                    }
                </button>
                </form> 
            </div>
        </>
    )
}

export default SignUp