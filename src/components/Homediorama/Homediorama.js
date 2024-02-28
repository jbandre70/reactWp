import React, {Component} from 'react';
import './Homediorama.css';
import {CircleLoader} from 'react-spinners';
import {LOADER_COLOR, ADDRESS_DIORAMAS_LIMIT} from './../../constants';
import {Link, useParams} from "react-router-dom";

class Homediorama extends Component {
    _isMounted = false;

    constructor() {
        super();
        this.state = {
            dioramas: [],
            loading: true,
            items: [],
            total_pages: 0,
            isLoading: true,
            cursor: 0,
            dioramaPage: ''
        }
    }

    loadUser = () => {
        this.setState({isLoading: true, error: undefined})
        let {items, cursor} = this.state;
        cursor += 1;

        fetch(ADDRESS_DIORAMAS_LIMIT + cursor)
            .then(response => {
                for (let pair of response.headers.entries()) {
                    if (pair[0] === 'x-wp-totalpages') {
                        this.setState(state => ({
                            total_pages: pair[1]
                        }))
                    }
                }
                if (response.ok) {
                    return response.json();

                } else {
                    throw new Error('Something went wrong ...');
                }
            })
            .then(
                response => {
                    this.setState(state => ({
                        items: [...items, ...response],
                        cursor: cursor,
                        isLoading: false
                    }))
                },
                error => {
                    this.setState({isLoading: false, error})
                }
            )
    };

    componentDidMount() {
        this._isMounted = true; //permet d'éviter des warnings https://www.robinwieruch.de/react-warning-cant-call-setstate-on-an-unmounted-component/
        this.setState({loading: true, dioramaPage: this.props.page});
        this.loadUser();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        const {items, dioramaPage} = this.state;
        let ls = items.map((diorama, index) => {
            const dioramaCat = parseInt(diorama.categories[0]);
            return (
                <div className='column is-3' key={index} id={`suite-${index}`}>
                    <div className="item_d">
                        {dioramaCat === 14 &&
                            <Link to={`/Diora/${diorama.id}`}>
                                <img
                                    alt={diorama.title}
                                    src={[
                                        diorama.fimg_url
                                    ]}
                                    loader={
                                        <CircleLoader
                                            color={LOADER_COLOR}
                                            loading={true}
                                        />
                                    }
                                />
                            </Link>
                        }
                        <div className="item-overlay top"></div>
                    </div>
                    <div className="item_d">
                        {dioramaCat === 14 &&
                            <Link to={`/Diora/${diorama.id}`}><h2
                                dangerouslySetInnerHTML={{__html: diorama.title.rendered}}></h2></Link>
                        }
                        <div dangerouslySetInnerHTML={{__html: diorama.excerpt.rendered}}/><div>
                    </div>
                </div>
            </div>
            )
        });
        return (
            <div>
                {dioramaPage === 'dioramaPage' &&
                    <div className="column header-galery">
                        <h1 className="header-page">Dioramas</h1>
                    </div>
                }

                <section className="vignette" key={5444444}>
                    <div className="columns is-multiline liste is-centered">
                        {ls}
                    </div>
                </section>

                {this.state.isLoading && (
                    <div className="loading">
                        <div className='sweet-loading'>
                            <CircleLoader
                                color={LOADER_COLOR}
                                loading={true}
                            />
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default Homediorama;
