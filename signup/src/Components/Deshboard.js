import React, { useEffect, useState} from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { DELETEDATA, GETDATA, ASC_ORDER, DSC_ORDER, SEARCH} from '../Action/Action'
import { Box, CssBaseline, Container } from '@material-ui/core'
import Pagination from '@material-ui/lab/Pagination'

const Deshboard = () => {

    // for pagination
    const [page, setPage] = useState(1)

    //for Searching
    const [search, setSearch] = useState("")

    const dispatch = useDispatch();
    const history = useHistory() 

    const list = useSelector(state => state.list)
    console.log("list",list);

    
    //For Delete User
    const deleteUser = (id) => {        
        dispatch(DELETEDATA(id))
        window.location.reload();
        history.push('/signup')
    }
    
    //Pagination
     useEffect(() => {
        // console.log("page", page);
        // console.log("getdata");
        dispatch(GETDATA(page))
     }, [page])
 
    return (        
         <>  
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12 my-5 text-center'>
                        <h1> Welcome To DashBoard </h1>            
                    </div>
                </div>                    
            </div>                                          

            <div>
                <button className='btn btn-small' 
                        onClick={() => dispatch(ASC_ORDER(page))}>
                        Ascending
                </button>&nbsp;

                <button className='btn btn-small' 
                        onClick={() => dispatch(DSC_ORDER(page))}>
                        Descending
                </button>

                    <input type="text" 
                            placeholder='Search...' 
                            className='search'
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                    />
                    <button className='btn_search' 
                            onClick={(e) => dispatch(SEARCH(page,search))}>
                            Search 
                    </button>
            </div>

               <div className='col-md-12  mx-auto'>
                          <table className='table table-hover'>
                                 <thead className='text-black text-center'>
                                      <tr>                                        
                                      <th scope='col'>Name</th>
                                           <th scope='col'>Email-id</th>
                                           <th scope='col'>Password</th>
                                           <th scope='col'>Confirm Password</th>
                                           <th scope='col'>Contact No</th>
                                           <th scope='col'>First Salary</th>
                                           <th scope='col'>Second Salary</th>
                                           <th scope='col'>Third Salary</th>
                                           <th scope='col'>Total</th>
                                           <th scope='col'>Action</th>                                                      
                                      </tr>
                                  </thead>
                                  <tbody>
                                      { 
                                        list.map((elem) => { 
                                          return ( 
                                              <tr key={elem._id}>
                                                  <td align='center'>{elem.name}</td>
                                                  <td align='center'>{elem.email}</td>
                                                  <td align='center'>{elem.pwd}</td>
                                                  <td align='center'>{elem.cpwd}</td>
                                                  <td align='center'>{elem.phone}</td>
                                                  <td align='center'>{elem.salary}</td>
                                                  <td align='center'>{elem.salarySecond}</td>
                                                  <td align='center'>{elem.salaryThird}</td>
                                                  <td align='center'>{elem.salary + elem.salarySecond + elem.salaryThird}</td>
                                                  <td align='center'><NavLink to={`/signup/:?id=${elem._id}`}>
                                                          <button className='btn btn-small btn-secondary mr-2'>
                                                              Edit
                                                          </button>
                                                      </NavLink> &nbsp;
                                                       <button type='button' 
                                                            className='btn btn-small btn-danger'
                                                            onClick={() => deleteUser(elem._id)}>
                                                                Delete
                                                        </button>
                                                      
                                                  </td>                                                        
                                              </tr> 
                                          )
                                       })
                                      }                                                                                                                                                         
                                  </tbody>
                          </table>
                  </div> 
                       
                    <div>
                        <CssBaseline />

                        <Container component={Box} >
                            <Pagination 
                                count={list}
                                color='secondary'
                                variant='outlined'
                                shape='squre'
                                size='medium'
                                showFirstButton={true}
                                onChange={(e, value) => setPage(value)}   
                            />
                        </Container>
                    </div>                    
        </>
    )    
 }

 export default Deshboard