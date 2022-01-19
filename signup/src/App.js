import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from './Components/signUp';
import NavBar from './Components/NavBar'
import { Route, Switch } from 'react-router-dom';
import Deshboard from './Components/Deshboard';
import SignIn from './Components/signIn';
import ProtectedRoute from './Components/ProtectedRoute';
import Home from './Components/Home';
import Logout  from './Components/Logout';
import Context from './Components/Context'
import { useSelector } from 'react-redux';

const App = () => {

  const loading = useSelector(state => state.loading)
  //console.log(loading)

  return(
    <>
      <NavBar />
      <Context.Provider value={{loading}}>
       <hr />

      <Switch>
          <Route exact path="/" component={Home} />
           {/* for Registration */}
          <Route exact path="/signup" component={SignUp} />
          {/* for Edit data  in Registration */}
          <Route exact path="/signup/:id" component={SignUp} />
          <ProtectedRoute exact path="/signin" component={SignIn} isAuth={!loading} /> 
          {/* for Pagination */}
          <ProtectedRoute exact path="/getuser/page" component={Deshboard}/>
          <ProtectedRoute exact path="/deshboard" component={Deshboard} isAuth={loading} />
          <ProtectedRoute exact path="/logout" component={Logout} isAuth={loading}/>
      </Switch>

      </Context.Provider>
    </>
  );
}

export default App;
