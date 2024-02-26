import React, { Component } from 'react';
import './Press.css';
import PressBox from '../Boxes/PressBox';
import {gen4} from "../../utils/keygen";

class Press extends Component {
    constructor() {
        super();
        this.state = {
            dioramas: [],
            loading: true,
            error: null,
        }
    }

    componentDidMount() {
        this.setState({loading: true});
        let pageurl = this.props.path;

        fetch(pageurl)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong ...');
                }
             })
            .then(data => {
                this.setState({
                    dioramas: data,
                    loading: false
                })
            })
        .catch(error => this.setState({error, loading: false}));
    }

    render() {
        let {dioramas, loading, error} = this.state;
        return (
            <React.Fragment>
                <div key={gen4()}>
                    <section className="vignette" id="top">
                        <div className="column header-galery">
                            <h1 className="header-page">Press</h1>
                        </div>
                        <div className="columns is-multiline liste is-centered">
                            <React.Fragment>
                                <PressBox dioramas={dioramas} loading={loading} error={error} isthree={true} />
                            </React.Fragment>
                        </div>
                    </section>
                </div>
            </React.Fragment>
        )
    }
}

export default Press;
