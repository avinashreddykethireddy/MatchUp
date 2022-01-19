import React from 'react';
import { Route , Navigate } from 'react-router-dom';
import Auth from './Auth/Auth';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
    {...rest}
    render={props =>
    Auth.getAuth() ? (
    <Component {...props} />
    ) : (
        <Navigate
        to={{
            pathname: "/login"
            }}
        />
        )
        }
    />
);

export default PrivateRoute;