import React, {Component} from 'react';
import './About.css';
import AboutText from './../AboutText';
import Links from './../Links';
import Contact from './../Contact';
import DioramaOSMaps from './../DioramaOSMaps';
import HelmetComponent from './../HelmetComponent'
import {
    META_DESCRIPTION,
    META_TITLE,
} from '../../constants';

class About extends Component {
    render() {
        return (
            <div className="">
                <HelmetComponent title={META_TITLE} description={META_DESCRIPTION} canonical={'About'}/>
                <section className="purplepage">
                    <div className="columns">
                        <div className="column is-three-quarters bio">
                            <AboutText/>
                        </div>
                        <div className="column form">
                            <div className="columns is-multiline is-mobile bordertop">
                                <div className="column is-12">
                                    <h2 className="contact">Contact</h2>
                                    <Contact/>
                                </div>
                                <div className="column is-12 links">
                                    <h2>LINKS</h2>
                                    <React.Fragment>
                                        <Links/>
                                    </React.Fragment>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <React.Fragment>
                            <DioramaOSMaps/>
                        </React.Fragment>
                    </div>
                </section>
            </div>
        );
    }
}

export default About;
