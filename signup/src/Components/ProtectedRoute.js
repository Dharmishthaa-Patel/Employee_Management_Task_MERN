import React from "react";
import { Route, Redirect } from "react-router-dom";


const ProtectedRoute = ({isAuth, component: Component, ...rest}) => {
    
    return(
        <>
            <Route {...rest} 
                    render={(props) => {
                if (isAuth !== undefined) {
                    return <Component {...props} />;
                }
                if (isAuth === undefined) {
                    return <Redirect to='/' />
                }
            }} />
        </>
    )
}

export default ProtectedRoute;

