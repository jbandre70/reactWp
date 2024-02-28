import React, {Component} from 'react';
import './PageList.css';
import PageBox from '../Boxes/PageBox';
import {CATEGORIE_PAGES} from '../../constants';
import {gen4} from "../../utils/keygen";

class PageList extends Component {
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
        fetch (CATEGORIE_PAGES)
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
                            <h1 className="header-page">Articles</h1>
                        </div>
                        <div className="columns is-multiline liste is-centered">
                            <React.Fragment>
                                <PageBox dioramas={dioramas} loading={loading} error={error} isthree={true} />
                            </React.Fragment>
                        </div>
                    </section>
                </div>
            </React.Fragment>
        )
    }
}

export default PageList;
