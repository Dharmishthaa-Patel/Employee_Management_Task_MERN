import React, { useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import SignUp from './Components/signUp';
import NavBar from './Components/NavBar'
import Deshboard from './Components/Deshboard';
import SignIn from './Components/signIn';
import ProtectedRoute from './Components/ProtectedRoute';
import Home from './Components/Home';
import Logout  from './Components/Logout';
import Error404 from './Components/Error404';
import UploadFile from './Components/UploadFile';
import { check_cookie } from './Action/Action';
import Cookies from 'js-cookie'


const App = () => {


  // ======== For Cookie ===========
  //const dispatch = useDispatch();

  const cookie = Cookies.get('jwtLogin')
  console.log("AppCookie",cookie);
    // useEffect(() => {
    //     dispatch(check_cookie())
    // }, [])

  // ========== For LoginStatus =========
  const LoginUser = useSelector(state => state.LoginUser)
  console.log(LoginUser)
  
  return (
     <>      
        <NavBar />  
      
        <hr />

          <Switch>
          
            <Route exact path='/' component={Home}></Route>  
            
            <Route exact path='/editUser/:id' component={SignUp}></Route>
        
            <ProtectedRoute exact path='/deshboard' component={Deshboard} isAuth={cookie}></ProtectedRoute>
            <ProtectedRoute exact path='/Logout' component={Logout} isAuth={cookie}></ProtectedRoute>
            <ProtectedRoute exact path='/uploadfile' component={UploadFile} isAuth={cookie}></ProtectedRoute>

        {
          LoginUser === "" && cookie === undefined ? (
            
            <>
                <Route exact path='/signup' component={SignUp}></Route>        
                <Route exact path='/signin' component={SignIn} />
            </>
              
           ) : <Redirect to = '/deshboard'/> 
        }

            <Route component={Error404} />  

        </Switch>
        
        
    </>
  );
}

export default App;
