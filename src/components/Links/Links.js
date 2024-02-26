import React, { Component } from 'react';
import Tooltip from 'rc-tooltip';
import './Links.css';
import {ADDRESS_V2} from '../../constants';

class Links extends Component {
    constructor() {
        super();
        this.state = {
            links: []
        }
    }

    componentDidMount() {
        let pageurl = ADDRESS_V2 + 'posts/?categories=13';
        fetch (pageurl)
        .then (response => response.json())
        .then (response => {
            this.setState({
              links:response
            })
        })
    }

    render() {
        let {links} = this.state;
        let ls = links.map((link, index) => {
            function strip_html_tags(str) {
                if ((str === null) || (str === '')) {
                    return false;
                } else {
                    str = str.toString();
                }

                return str.replace(/<[^>]*>/g, '');
            }
            const echappe = strip_html_tags(link.content.rendered);
            return(
                <div key={index}>
                    <Tooltip
                        placement="top"
                        trigger={['hover']}
                        overlay={<span>{echappe}</span>}
                        arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
                    >
                        <a href={link.acf.link} target="blank">{link.title.rendered}</a>
                    </Tooltip>
                </div>
            )
        });

        return (
            <div>
                {ls}
            </div>
        );
    }
}

export default Links;
