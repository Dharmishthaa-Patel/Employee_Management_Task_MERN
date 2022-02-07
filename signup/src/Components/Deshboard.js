import React, { useEffect, useState} from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { delete_User, get_User} from '../Action/Action'
import Pagination from '@material-ui/lab/Pagination'
import debounce from "lodash.debounce"

const Deshboard = () => {

    const history = useHistory();

    // ========= For Searching ==============
    const [request, setRequest] = useState('')
    // ============= For Pagination  ============
    const [page, setPage] = useState(1)
    // ========= For Sorting  =========
    const [sort, setSort] = useState('ascending')
    

    // ========== For Maping User Data ==================
    const userData = useSelector(state => state.userData);
    const pageNumber = useSelector(state => state.pageNumber);

    // ========= For display Login User Name ============
    const LoginUser = useSelector(state => state.LoginUser)

    // ========== Delete User =================
    const DeleteUser = useSelector(state => state.DeleteUser);
    
    
    const dispatch = useDispatch();
    
    // ============== Delete User ==========
    const deleteUser = (email) => {
        window.confirm("Are You Sure?")
            dispatch(delete_User(email))

    }

    // ============= For seraching ========== 
    const handleSearch = debounce((value) => {
        setPage(1)
        setRequest(value)
    }, 500)
    
    
    // ============ Get Request ===========
    useEffect(() => {
        dispatch(get_User(page,sort,request))        
    }, [page, sort, request, dispatch, DeleteUser])
    

    return (        
        <> 
            <div className='container'>
                    <div className='row'>
                        <div className='col-md-12 my-1 text-center'>
                            <h1>{LoginUser && (`Welcome ${LoginUser.name}`)}</h1>
                        </div>
                    </div>                    
            </div>

            {/* ======== Search User ============ */}
            <div>
                <input type="search"
                       className='search' 
                       placeholder='Search...'
                       onChange={(e) => handleSearch(e.target.value)} 
                />        
            </div>

            {/* ============= Ascending And Descending ============ */}
            <div>                    
                <button className='btn btn-small'
                        onClick={() => setSort("ascending")}>
                    Ascending
                </button>

                <button className='btn btn-small'
                        onClick={() => setSort("descending")}>
                    Decsending
                </button>
            </div> 
            
            <hr />
            {
                pageNumber !== 0 ? (
                    <>
                    <div className='col-md-12  mx-auto'>
                        <table className='table table-hover'>
                                <thead className='text-black text-center'>
                                    <tr>                                        
                                    <th scope='col'>Name</th>
                                           <th scope='col'>profession</th>
                                           <th scope='col'>Email-id</th>
                                           <th scope='col'>Password</th>
                                           <th scope='col'>Confirm Password</th>
                                           <th scope='col'>Contact No</th>
                                           <th scope='col'>First Salary</th>
                                           <th scope='col'>Second Salary</th>
                                           <th scope='col'>Third Salary</th>
                                           <th scope='col'>Total Salary</th>
                                           <th scope='col'>Country</th>
                                           <th scope='col'>State</th>
                                           <th scope='col'>City</th>
                                           <th scope='col'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        userData && userData.map((elem) => {
                                          return (
                                            <tr key={elem._id}>                                        
                                                <td align='center'>{elem.name}</td>
                                                <td align='center'>{elem.profession}</td>
                                                <td align='center'>{elem.email}</td>
                                                <td align='center'>{elem.password}</td>
                                                <td align='center'>{elem.confirmpassword}</td>
                                                <td align='center'>{elem.phone}</td>
                                                <td align='center'>{elem.salary1}</td>
                                                <td align='center'>{elem.salary2}</td>
                                                <td align='center'>{elem.salary3}</td>
                                                <td align='center'>{elem.salary1 + elem.salary2 + elem.salary3}</td>
                                                <td align='center'>
                                                    {elem.country && elem.country.map((i => i.countryName))}
                                                </td>
                                                <td align='center'>
                                                    {elem.state && elem.state.map((i => i.stateName))}
                                                </td>
                                                <td align='center'>
                                                    {elem.city && elem.city.map((i => i.cityName))}
                                                </td>
                                                <td align='center'><NavLink to={`/editUser/:?id=${elem._id}`}>
                                                        <button className='btn btn-small btn-secondary mr-2'>
                                                            Edit
                                                        </button>
                                                    </NavLink> &nbsp;
                                                <button className='btn btn-small btn-danger mr-2' 
                                                        onClick={() => deleteUser(elem.email)}>
                                                            Delete
                                                </button>
                                                </td>                                                        
                                            </tr> 
                                        )
                                    })}
                                </tbody>
                        </table>
                        {/* ========== Pagination =========  */}
                        <Pagination
                            count={pageNumber}
                            color='secondary'                            
                            variant='outlined'
                            size='medium'
                            showFirstButton={true}                   
                            onChange={(event, value) => { setPage(value) }}
                        />
                </div>
                </>
                ) : (
                    <>
                        <div>
                            <h1 align='center'> No Data Found </h1>
                        </div>
                    </>
                )
            }
            
        </>
    )
}

 export default Deshboard