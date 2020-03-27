import React from 'react';
import './App.css';
import {Route} from "react-router-dom";

const LoginTemplate = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} component={matchProps => (
            <div className="LoginTemplate">
                <Component {...matchProps} />
            </div>
        )} />
    );
};

export default LoginTemplate;
