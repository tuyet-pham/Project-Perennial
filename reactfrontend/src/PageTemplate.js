import React from 'react';
import './App.css';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import { Redirect, Route } from "react-router-dom";
// import AuthService from "./Services/AuthService";

const PageTemplate = ({component: Component, isLoggedIn, ...rest}) => {

    // const isLoggedIn = AuthService.isLoggedIn() 

    return (
        <Route {...rest} component={matchProps => 
            isLoggedIn ? (
                <div className="PageTemplate">
                    <Header {...matchProps} {...rest} />
                    <Component {...matchProps} />
                    <BottomNav />
                </div>
            ) : (
                <Redirect to={{ pathname:'/login', state: {from: matchProps.location}}} />
            )
        } />
    );
};

export default PageTemplate;