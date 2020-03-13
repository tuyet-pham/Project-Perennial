import React from 'react';
import './App.css';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import {Route} from "react-router-dom";

const PageTemplate = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} component={matchProps => (
            <div className="PageTemplate">
                <Header {...matchProps}/>
                <Component {...matchProps} />
                <BottomNav />
            </div>
        )} />
    );
};

export default PageTemplate;