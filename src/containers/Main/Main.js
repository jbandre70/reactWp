import React, {Component} from 'react';
import './Main.css';
import {BrowserRouter as Router, Link, Route, Routes} from 'react-router-dom';
import Home from './../../components/Home';
import Blog from './../../components/Blog';
import PageSwitch from './../../components/PageSwitch';
import About from './../../components/About';
import Press from './../../components/Press';
import Diora from './../../components/Diora';
import Maps from './../../components/Maps';
import GaleryDioramas from '../../components/GaleryDioramas';
import NotFound from './../../components/NotFound';
import Tooltip from 'rc-tooltip';
import {isMobile} from 'react-device-detect';

import {ADRESS_MENU, PRESSADDRESS} from '../../constants';

import {cinq} from "../../utils/cinq";

import facebook from './../../img/facebook.svg';
import instagram from './../../img/instagram.svg';
import logo from './../../img/logo1.svg';
import ds from './../../img/distantshoresg.svg';
import dsmob from './../../img/ds-mobile.png';
import AdvertBox from "../../components/Boxes/AdvertBox";

class Main extends Component
{
    constructor() {
        super();
        this.state = {
            liens: [],
            active: false
        }
        this.toggleClass= this.toggleClass.bind(this);
    }

    toggleClass() {
        const currentState = this.state.active;
        this.setState({ active: !currentState });
    };
    componentDidMount() {
        fetch(ADRESS_MENU).then(response => response.json()).then(response => {
            this.setState({liens: response.items});
         });
    }

    render() {
        let {liens} = this.state;
        let ls = liens.map((lien, index) => {
                return (
                    <Link key={index} to={'/' + cinq(lien.title)} className="navbar-item baisse" onClick={this.toggleClass}>
                        {lien.title}
                    </Link>)
            }
        );

        let tooltip;

        if (isMobile) {
            tooltip =
                <Tooltip
                    placement="top"
                    trigger={['hover']}
                    overlay={<span>Distant Shores, my other website with nature based boxed dioramas</span>}
                    arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
                >
                    <span className="icon" style={{color: '#bbb'}}>
                      <img src={dsmob} alt=""/>
                    </span>
                </Tooltip>
        } else {
            tooltip =
                <span className="icon" style={{color: '#bbb'}}>
                      <img src={ds} alt=""/>
                </span>
        }

        return (
            <main id="main">
                <Router>
                    <div>
                        <div>
                            <nav className="navbar">
                                <div className="navbar-brand">
                                    <a className="navbar-item logo" href="http://www.jbadiorama.com">
                                        <img className="dslogo" src={logo} alt="JBA | Jean Dioramas"  />
                                    </a>
                                    <div
                                        className={this.state.active ? 'navbar-burger burger is-active': 'navbar-burger burger'}
                                        id="burgerking"
                                        data-target="navMenubd-example"
                                        onClick={this.toggleClass}
                                    >
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </div>
                                <div id="navMenubd-example" className={this.state.active ? 'navbar-menu is-active' : 'navbar-menu'} >
                                        <div className="navbar-start">
                                            <Link to={'/'} className="navbar-item baisse">
                                                Home
                                            </Link>
                                            {ls}
                                        </div>
                                </div>
                                <div className="navbar-end">
                                    <div className="navbar-item">
                                        <div className="field is-grouped">
                                            <a
                                                className="navbar-item"
                                                href="http://www.distant-shores.com"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {tooltip}
                                            </a>
                                            <a
                                                className="navbar-item"
                                                href="https://www.facebook.com/jbadiorama"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <span className="icon" style={{color: '#bbb'}}>
                                                  <img src={facebook} alt=""/>
                                                </span>
                                            </a>
                                            <a
                                                className="navbar-item "
                                                href="https://www.instagram.com/jean_diorama/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <span className="icon" style={{color: '#bbb'}}>
                                                  <img src={instagram} alt="" />
                                                </span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </nav>
                        </div>
                        <Routes>
                            <Route exact path='/'  element={<Home />}/>
                            <Route path='/Diora/*'  element={<Diora />} />
                            <Route exact path='/About'  element={<About />}/>
                            <Route exact path='/Blog' element={<Blog />}/>
                            <Route exact path='/Press' element={(props) => <Press path={PRESSADDRESS} {...props} /> } />
                            <Route exact path='/Galer' element={<GaleryDioramas />}/>
                            <Route exact path='/Pages' element={<PageSwitch />}/>
                            <Route exact path='/Partn' element={<AdvertBox />}/>
                            <Route exact path='/Maps' element={<Maps />}/>
                            <Route component={ <NotFound /> } />
                        </Routes>
                    </div>
                </Router>
            </main>
        );
    }
}

export default Main;
