import React, { useEffect,useState } from 'react';
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useDispatch, useSelector} from 'react-redux';
import {register_user, update_User, country, state, city, register_Toggle } from '../Action/Action';
import queryString from 'query-string'
import { useHistory } from 'react-router-dom';


const SignUp = () => {

  const { id } = queryString.parse(window.location.search);
  
  const history = useHistory();
  const dispatch = useDispatch();

  // ========= For Set Country Id =========
  const [countryId, setCountryId] = useState('')
  // ============ For Set State Id  ========
  const [stateId, setStateId] = useState('')
  //  ============= For Set City Id ==========
  const [cityId, setCityId] = useState('') 
  // ============ For Edited User Data ==========
  const [employee, setEmployee] = useState([]) 


  const userData = useSelector(state => state.userData) //maping state
  const countryData = useSelector(state => state.countryData)
  const stateData = useSelector(state => state.stateData)
  const cityData = useSelector(state => state.cityData)
  const emailExist = useSelector(state => state.emailExist)
  const registerToggle = useSelector(state => state.registerToggle)


  // ========= For Country, State and City =========
  const countryChange = (e) => {
      formik.values.countryId = e.target.value
      setCountryId(e.target.value)
  }

  const stateChange = (e) => {
      formik.values.stateId = e.target.value
      setStateId(e.target.value)
  }

  const cityChange = (e) => {
      formik.values.cityId = e.target.value
      setCityId(e.target.value)
  }

  
  // ========== Validation =========
  const validationSchema = Yup.object().shape({
      name: Yup.string()
          .min(3)
          .max(20, 'Must be 20 characters or less')
          .required('Name is Required'),

      profession: Yup.string()
          .min(3)
          .required('Profession is not valid!'),

      email: Yup.string()
          .email('E-mail is not valid!')
          .required('E-mail is required!'),
      
      password: Yup.string()
          .min(6, 'must be add at least 6 character')
          .required('Password is required!'),
      
      confirmpassword: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Password must match')
          .required('Password is required!'),
      
      phone: Yup.string()
          .min(10, 'Must be 10 digits or less')
          .max(12, 'Must be 12 digits or less')
          .required('Enter Your Phone'),
      
      salary1: Yup.number()
          .min(3)
          .required('Enter Your salary1'),
      
      salary2: Yup.number()
          .min(3)
          .required('Enter Your salary2'),
      
      salary3: Yup.number()
          .min(3)
          .required('Enter Your salary3'),
      
      countryId: Yup.string()
          .required('Countr is required'),
      
      stateId: Yup.string()
          .required('State is required'),
      
      cityId: Yup.string()
          .required('City is required'),
  })
  // ============= Initial Value ========
   const initialValues = {
          name: "",
          phone: "",
          profession: "",
          salary1: "",
          salary2: "",
          salary3: "",
          email: "",
          password: "",
          confirmpassword: "",
          countryId: "",
          stateId: "",
          cityId: ""
  }

  const formik = useFormik({
      initialValues,
      validationSchema, 
      onSubmit: (values) => {
          if (id) {
              // ====== Update User ===== 
                  dispatch(update_User(id, values, employee.email))
              // ========== add new User ============
          } else {
                dispatch(register_user(values))
                formik.handleReset()                                  
          }
      },                        
  });
  
  // ========== For E-mail ===========
  useEffect(() => {
      if (emailExist === true) {
          history.push('/deshboard')
      }
  }, [emailExist])

  // =========== Register Toggle ============
  useEffect(() => {
      if (registerToggle === true) {
          history.push('/signin')
          dispatch(register_Toggle());
      }
  }, [registerToggle])

 // ============ Edit User Data ============  
  useEffect(() => {
      if (id) {
          setEmployee(edit_User)
      }
  }, [])
  // =========== Get Country, State, City Name For Edit User =========
  const edit_User = userData.find((elem) => elem._id === id ? elem : null);
  const countryEdit = edit_User && edit_User.country.map(item => item.countryName)
  const stateEdit = edit_User && edit_User.state.map(item => item.stateName)
  const cityEdit = edit_User && edit_User.city.map(item => item.cityName)

  //========== set update values ========
  useEffect(() => {
      if (id && employee) {
          formik.setValues(employee)
      }
  }, [employee])

  // ========= Get Country ==========
  useEffect(() => {
      dispatch(country())
  }, [dispatch])
  
  // ========= Get State ==========
  useEffect(() => {
      dispatch(state(countryId))
  }, [countryId, dispatch])

  // ========= Get City ==========
  useEffect(() => {
      dispatch(city(stateId))
  }, [stateId, dispatch])


  return (
      <>
          <div>
                <h2> Sign Up </h2> <br />                   
              <form onSubmit={formik.handleSubmit}>                    
                  <input type="text"
                      name="name"
                      autoComplete='off' placeholder='Name'
                      onChange={formik.handleChange}
                      {...formik.getFieldProps("name")}
                  /><br />
                  {formik.touched.name && formik.errors.name ? (
                      <div className="fv-plugins-message-container">
                          <div className="fv-help-block error">
                              {formik.errors.name}
                          </div>
                      </div>
                  ) : null}
                  <br />

                  <input type="text"
                      name='profession'
                      autoComplete='off' placeholder='Profession'
                      onChange={formik.handleChange}
                      {...formik.getFieldProps("profession")}
                  /><br />
                  {formik.touched.profession && formik.errors.profession ? (
                      <div className="fv-plugins-message-container">
                          <div className="fv-help-block error">
                              {formik.errors.profession}
                          </div>
                      </div>
                  ) : null}
                  <br />

                  <input type="text"
                      name='email'
                      autoComplete='off' placeholder='Email - Id'
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
                      name='password'
                      autoComplete='off' placeholder='Password'
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
                  
                  <input type="password"
                      name='confirmpassword'
                      autoComplete='off' placeholder='Confirm Password'
                      onChange={formik.handleChange}
                      {...formik.getFieldProps("confirmpassword")}
                  /><br />
                  {formik.touched.confirmpassword && formik.errors.confirmpassword ? (
                      <div className="fv-plugins-message-container">
                          <div className="fv-help-block error">
                              {formik.errors.confirmpassword}
                          </div>
                      </div>
                  ) : null}
                  <br />
                  
                  <input type="number"
                      name="phone"
                      autoComplete='off' placeholder='Contact No'
                      onChange={formik.handleChange}
                      {...formik.getFieldProps("phone")}
                  /><br />
                  {formik.touched.phone && formik.errors.phone ? (
                      <div className="fv-plugins-message-container">
                          <div className="fv-help-block error">
                              {formik.errors.phone}
                          </div>
                      </div>
                  ) : null}
                  <br />


                  <input type="number"
                      name='salary1'
                      autoComplete='off' placeholder='First Salary'
                      onChange={formik.handleChange}
                      {...formik.getFieldProps("salary1")}
                  /><br />
                  {formik.touched.salary1 && formik.errors.salary1 ? (
                      <div className="fv-plugins-message-container">
                          <div className="fv-help-block error">
                              {formik.errors.salary1}
                          </div>
                      </div>
                  ) : null}
                    <br />

                  <input type="number"
                      name='salary2'
                      autoComplete='off' placeholder='Second Salary'
                      onChange={formik.handleChange}
                      {...formik.getFieldProps("salary2")}
                  /><br />
                  {formik.touched.salary2 && formik.errors.salary2 ? (
                      <div className="fv-plugins-message-container">
                          <div className="fv-help-block error">
                              {formik.errors.salary2}
                          </div>
                      </div>
                  ) : null}
                  <br />

                  <input type="number"
                      name='salary3'
                      autoComplete='off' placeholder='Third Salary'
                      onChange={formik.handleChange}
                      {...formik.getFieldProps("salary3")}
                  /><br />
                  {formik.touched.salary3 && formik.errors.salary3 ? (
                      <div className="fv-plugins-message-container">
                          <div className="fv-help-block error">
                              {formik.errors.salary3}
                          </div>
                      </div>
                  ) : null}
                  <br />

                  <input type="number"
                        autoComplete="off" autoComplete='off' placeholder='Total Salary'
                        disabled
                        value={formik.values.salary1 + 
                                formik.values.salary2 + 
                                formik.values.salary3} 
                    /><br />
                    <br />
                                     
                  

                  <select name="countryId" {...formik.getFieldProps("countryId")}  
                  onChange={(e) => countryChange(e)}>
                      <option>
                        {countryEdit ? countryEdit: "Select Country"}
                    </option>
                      {
                          countryData.map((elem) => {
                          return (
                              <option value={elem._id} key={elem._id}>
                                {elem.countryName}
                            </option>
                          )
                        })
                      } 
                  </select>
                  <br />
                  {formik.touched.countryId && formik.errors.countryId ? (
                      <div className="fv-plugins-message-container">
                          <div className="fv-help-block error">
                              {formik.errors.countryId}
                          </div>
                      </div>
                  ) : null}
                    <br />

                  <select name="stateId" {...formik.getFieldProps("stateId")}   
                          onChange={(e) => stateChange(e)}>
                      <option>
                        {stateEdit ? stateEdit: "Select State"}
                    </option>
                      {
                          stateData.map((elem) => {
                          return (
                              <option value={elem._id} key={elem._id}>
                                { elem.stateName}
                            </option>                        
                          )
                        })
                      }                          
                  </select><br />
                  {formik.touched.stateId && formik.errors.stateId ? (
                      <div className="fv-plugins-message-container">
                          <div className="fv-help-block error">
                              {formik.errors.stateId}
                          </div>
                      </div>
                  ) : null}
                  <br />

                  <select name="cityId" {...formik.getFieldProps("cityId")}  
                          onChange={(e) => cityChange(e)}>
                      <option>
                        {cityEdit ? cityEdit: "Select City"}
                    </option>
                      {
                          cityData.map((elem) => {
                          return (
                              <option value={elem._id} key={elem._id}>
                                {elem.cityName}
                            </option>        
                          )
                        })
                      }                        
                  </select><br />
                  {formik.touched.cityId && formik.errors.cityId ? (
                      <div className="fv-plugins-message-container">
                          <div className="fv-help-block error">
                              {formik.errors.cityId}
                          </div>
                      </div>
                  ) : null}
                  <br />

                  <button type='submit' 
                          className='btn btn-dark mt-3'>
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