import React, {Component} from 'react';
import './PageBox.css';
import {Link} from 'react-router-dom';
import {CircleLoader} from 'react-spinners';
import {LOADER_COLOR} from './../../../constants';


class PageBox extends Component {
    constructor() {
        super();
        this.state = {}
    }

    render() {
        const {dioramas, loading, error} = this.props;
        if (loading) {
            return (
                <div className='sweet-loading'>
                    <CircleLoader
                        color={LOADER_COLOR}
                        loading={true}
                    />
                </div>
            )
        }

        if (error) {
            return <p>{error.message}</p>;
        }

        return (
            dioramas.map((diorama, index) => {
                return (
                    <section className="lamehomes switch" key={index}>
                        <figure className="lamehome full">
                            <Link to={`/Pages/${diorama.id}`}>
                                <picture
                                    className="lametitre"
                                    style={{backgroundImage: `url(${diorama.fimg_url})`}}
                                />
                                <figcaption>
                                    <h2>{diorama.title.rendered}</h2>
                                    <div className="textcaption" dangerouslySetInnerHTML={{__html: diorama.excerpt.rendered}}/>
                                </figcaption>
                            </Link>
                        </figure>
                    </section>
                )
            })
        );
    }
}

export default PageBox;
