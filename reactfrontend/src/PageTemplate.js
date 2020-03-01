import React from 'react';
import './App.css';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import { render } from '@testing-library/react';
import {Route} from "react-router-dom";

const PageTemplate = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={matchProps => (
            <div className="PageTemplate">
                <Header />
                <Component {...matchProps} />
                <BottomNav />
            </div>
        )} />
    );
};

export default PageTemplate;