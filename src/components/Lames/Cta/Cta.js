import React, { Component } from 'react';
import './Cta.css';
import arrow from './../../../img/arrow-long-right-white.svg';

class Cta extends Component
{
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {bg, txt, link, target} = this.props;
        let classname = 'cta '
        if (bg !== '') {
            classname += bg;
        }
        if (txt !== '') {
            return (
                <div>
                    <a
                        className= {classname}
                        href={link}
                        target={target === true ? '_blank' : ''}
                    >
                        <img src={arrow} alt="" className="arrow" />
                        <span>{txt}</span>
                    </a>
                </div>
            )
        }
    }
}

export default Cta;