import React from "react";
import { Route, Redirect } from "react-router-dom";


const ProtectedRoute = ({isAuth, component: Component, ...rest}) => {
    console.log("isAuth",isAuth)
    
    return(
        <>
            <Route {...rest} 
                render={(props) => {
                 if(isAuth !== undefined) { return <Component {...props}  />  } 
                 else{
                       return  <Redirect to="/"/>
                        }
                }
                }
             />
        </>
    )
}

export default ProtectedRoute;

