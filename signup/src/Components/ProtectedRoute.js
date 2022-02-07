import React from "react";
import { Route, Redirect } from "react-router-dom";


const ProtectedRoute = ({isAuth, component: Component, ...rest}) => {
    return(
        <>
            <Route {...rest} 
                render={(props) => 
                 isAuth ? <Component {...props}  />  : 
                         <Redirect to={{path: "/signin", 
                         state: { from: props.location}}} 
                         />
                }
             />
        </>
    )
}

export default ProtectedRoute;

