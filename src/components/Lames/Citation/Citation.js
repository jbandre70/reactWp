import React , {Component} from 'react';
import './Citation.css';
import {RingLoader} from "react-spinners";

class Citation extends Component {
    constructor(){
        super();
        this.state = {
        }
    }

    gen4() {
        return Math.random().toString(16).slice(-4)
    }
    render() {
        const {classe, loading, link, author} = this.props;

        if (loading) {
            return (
                <div className="loading">
                    <div className='sweet-loading'>
                        <RingLoader
                            color={'#f13ab8'}
                            loading={true}
                        />
                    </div>
                </div>
            )
        }

        return (
            <div key={this.gen4()}>
                <div className="leftquote">
                    <cite className={(classe ? 'cit-small' : '')}>
                        {link}
                    </cite>
                </div>
                <p className="author">{author}</p>
            </div>);
    }
}
export default Citation;
