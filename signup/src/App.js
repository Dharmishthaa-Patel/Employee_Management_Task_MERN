import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from './Components/signUp';
import NavBar from './Components/NavBar'
import { Route, Switch, Redirect } from 'react-router-dom';
import Deshboard from './Components/Deshboard';
import SignIn from './Components/signIn';
import ProtectedRoute from './Components/ProtectedRoute';
import Home from './Components/Home';
import Logout  from './Components/Logout';
import { useSelector } from 'react-redux';
import Error404 from './Components/Error404';


const App = () => {

  const loginStatus = useSelector(state => state.loginStatus)
  console.log(loginStatus);
  
  return (
     <>      
        <NavBar />  
      
        <hr />

          <Switch>

            <Route exact path='/' component={Home}></Route>  
            <Route exact path='/signup' component={SignUp}></Route>        
            <Route exact path='/editUser/:id' component={SignUp}></Route>
        
            <ProtectedRoute exact path='/deshboard' component={Deshboard} isAuth={loginStatus} ></ProtectedRoute>
            <ProtectedRoute exact path='/Logout' component={Logout} isAuth={loginStatus}></ProtectedRoute>

        {
          !loginStatus ?
                <Route exact path='/signin' component={SignIn} isAuth={loginStatus} />
              : <Redirect to = '/deshboard'/> 
        }
            <Route component={Error404} />  

        </Switch>
        
        
    </>
  );
}

export default App;
