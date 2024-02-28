import React, {Component} from 'react';
import './Main.css';
import {BrowserRouter as Router, Link, Route, Routes} from 'react-router-dom';
import Home from './../../components/Home';
import Blog from './../../components/Blog';
import PageSwitch from './../../components/PageSwitch';
import About from './../../components/About';
import Press from './../../components/Press';
import Diora from './../../components/Diora';
import Diorama from './../../components/Diorama';
import Maps from './../../components/Maps';
import GaleryDioramas from '../../components/GaleryDioramas';
import NotFound from './../../components/NotFound';
import Tooltip from 'rc-tooltip';
import {isMobile} from 'react-device-detect';

import {ADDRESS_MENU, OPTIONS, PRESSADDRESS, ROOT_ADDRESS} from '../../constants';

import {cinq} from '../../utils/cinq';

import facebook from './../../img/facebook.svg';
import instagram from './../../img/instagram.svg';
import logo from './../../img/logo1.svg';
import distantShores from './../../img/distantshoresg.svg';
import distantShoresMob from './../../img/ds-mobile.png';
import AdvertBox from '../../components/Boxes/AdvertBox';

class Main extends Component
{
    constructor() {
        super();
        this.state = {
            links: [],
            basicSiteInfos: [],
            options: [],
            active: false
        }
        this.toggleClass= this.toggleClass.bind(this);
    }

    toggleClass() {
        const currentState = this.state.active;
        this.setState({ active: !currentState });
    };

    async componentDidMount() {
        let requestsArray= [ADDRESS_MENU, ROOT_ADDRESS, OPTIONS];
        Promise.all(requestsArray.map((request) => {
            return fetch(request).then((response) => {
                return response.json();
            }).then((data) => {
                return data;
            });
        })).then((values) => {
            this.setState({links: Object.values(values[0].items)});
            this.setState({basicSiteInfos: Object.values(values[1])});
            this.setState({options: Object.values(values[2])});
        });
    }

    render() {
        let {links, basicSiteInfos, options} = this.state;
        let listLinks = links.map((link, index) => {
            return (
                <Link key={index} to={'/' + cinq(link.title)} className="navbar-item baisse" onClick={this.toggleClass}>
                    {link.title}
                </Link>)
            }
        );

        let tooltip;

        if (isMobile) {
            tooltip =
                <Tooltip
                    placement="top"
                    trigger={['hover']}
                    overlay={`${options.distant_shores_description}`}
                    arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
                >
                    <span className="icon">
                      <img src={distantShoresMob} alt=""/>
                    </span>
                </Tooltip>
        } else {
            tooltip =
                <span className="icon">
                      <img src={distantShores} alt=""/>
                </span>
        }

        return (
            <main id="main">
                <Router>
                    <div>
                        <div>
                            <nav className="navbar">
                                <div className="navbar-brand">
                                    <a className="navbar-item logo" href={basicSiteInfos.url}>
                                        <img className="dslogo" src={logo} alt={basicSiteInfos.name}  />
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
                                            {listLinks}
                                        </div>
                                </div>
                                <div className="navbar-end">
                                    <div className="navbar-item">
                                        <div className="field is-grouped">
                                            <a
                                                className="navbar-item"
                                                href={options.distantshores_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {tooltip}
                                            </a>
                                            <a
                                                className="navbar-item"
                                                href={options.facebook_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <span className="icon">
                                                  <img src={facebook} alt=""/>
                                                </span>
                                            </a>
                                            <a
                                                className="navbar-item "
                                                href={options.instagram_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <span className="icon">
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
                            <Route path="/Diora/:id" element={<Diorama />} />
                            <Route path="/Diora" element={<Diora />} />
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
