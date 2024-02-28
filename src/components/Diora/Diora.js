import React, { Component } from 'react';
import './Diora.css';
import {BrowserRouter as Router, Link, Route, Routes} from 'react-router-dom';
import Diorabox from '../Boxes/Diorabox';
import Dioralist from '../Dioralist';
import Diorama from '../Diorama';
import HelmetComponent from './../HelmetComponent'
import Tag from '../../components/Tag';
import {ADDRESS_DIORAMAS} from '../../constants';
import {gen4} from "../../utils/keygen";
import {META_DESCRIPTION, META_TITLE} from '../../constants';

class Diora extends Component {
    constructor() {
        super();
        this.state = {
            dioramas: [],
            loading: true,
            error: null,
            childText: "Click me! (parent prop)",
            filteredItems: false
        }
    }

    componentDidMount() {
        this.setState({loading: true});
        fetch (ADDRESS_DIORAMAS)
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

    loadRest = (e) => {
        e = parseInt(e);
        this.setState({
            filteredItems: this.state.dioramas.filter((item) => {
                return Number(item.tags) === e;
            })
        });
    }

    render() {
        let {dioramas, loading, error, filteredItems} = this.state;
        let dioramasShow = filteredItems || dioramas;

        return (
            <React.Fragment>
                <div key={gen4()}>
                    <section className="vignette" id="top">
                        <div className="column header-galery">
                            <h1 className="header-page">Dioramas</h1>
                        </div>
                        <div>
                            <Tag onClick={this.loadRest} />
                        </div>
                        <div className="columns is-multiline liste is-centered">
                            <React.Fragment>
                                <Diorabox dioramas={dioramasShow} loading={loading} error={error} isthree={true} />
                            </React.Fragment>
                        </div>
                    </section>
                </div>
            </React.Fragment>
        )
    }
}

export default Diora;
