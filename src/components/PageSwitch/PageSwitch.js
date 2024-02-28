import React from 'react';
import './PageSwitch.css';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import PageList from '../PageList';
import Page from '../Page';
import HelmetComponent from '../HelmetComponent';
import {META_DESCRIPTION, META_TITLE} from '../../constants';

class DebugRouter extends BrowserRouter {
    constructor(props) {
        super(props);
        this.history.listen((location, action)=>{
        });
    }
}

const PageSwitch = () => (
    <div>
        <HelmetComponent title={META_TITLE } description={META_DESCRIPTION} canonical={'Page'} />
        <DebugRouter>
            <Routes>
                <Route exact path='/Pages' component={PageList} />
                <Route path='/Pages/:number' component={Page} />
            </Routes>
        </DebugRouter>
    </div>
);

export default PageSwitch;
