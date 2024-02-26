import React, {Component} from 'react';
import './Maps.css';
import DioramaOSMaps from './../DioramaOSMaps';
import HelmetComponent from './../HelmetComponent'
import {META_DESCRIPTION, META_TITLE} from '../../constants';

class Maps extends Component {
    render() {
        return (
            <div className="">
                <HelmetComponent title={META_TITLE} description={META_DESCRIPTION} canonical={'Maps'}/>
                <section className="purplepage">
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

export default Maps;
