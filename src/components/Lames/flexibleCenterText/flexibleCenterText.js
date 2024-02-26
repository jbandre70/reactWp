import React , {Component} from 'react';
import './flexibleCenterText.css';
import {gen4} from './../../../utils/keygen.js';

class flexibleCenterText extends Component {
    constructor(){
        super();
        this.state = {
        }
    }

    render() {
        const {title, content, subtitle} = this.props;

        return (
            <section className="flexible-text-center" key={gen4()}>
                <div className="container">
                    <h2 className="title-section text-center">{title}</h2>
                    {subtitle !=='' &&
                    <h3 className="subtitle-section text-center"><div dangerouslySetInnerHTML={{__html: subtitle}}></div></h3>
                    }
                    <div className="paragraph-section text-center">
                        <div dangerouslySetInnerHTML={{__html: content}}></div>
                    </div>
                </div>
            </section>
        );
    }
}
export default flexibleCenterText;
