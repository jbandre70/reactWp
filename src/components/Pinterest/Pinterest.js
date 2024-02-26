import React from 'react'
import './Pinterest.css';

class Pinterest extends React.Component {

    componentDidMount() {
        if (!window.doBuild) {
            this.preloadWidgetScript();
        } else {
            window.doBuild();
        }
    }

    preloadWidgetScript = () => {
        const script = document.createElement('script');
        script.async = true;
        script.dataset.pinBuild = 'doBuild';
        script.src = '//assets.pinterest.com/js/pinit.js';
        document.body.appendChild(script);
    }

    render() {
        const {url, alt, img} = this.props

        return (
            <a
                href={`http://pinterest.com/pin/create/button/?url=${url}&media=${img}&description=${alt}`}
                className="pin-it-button"
                data-pin-round="round"
            >
                {url}
            </a>
        )
    }
}
export default Pinterest;
