import React, {Component} from 'react';
import './HelmetComponent.css';
import {Helmet} from "react-helmet";
import {
    ROOT_ADRESS
} from '../../constants';


class HelmetComponent extends Component {
    constructor() {
        super();
        this.state = {}
    }
    render() {
        const {title, description, canonical} = this.props;

        return (
            <Helmet>
                <meta charSet="utf-8" />
                <title>{title}</title>
                <meta name="description" content={description} />
                <link rel="canonical" href={`${ROOT_ADRESS}`/`${canonical}`} />
            </Helmet>
        );
    }
}
export default HelmetComponent;
