import React, {Component} from 'react';
import './Diorabox.css';
import {Link} from 'react-router-dom';
import {CircleLoader} from 'react-spinners';
import {LOADER_COLOR} from './../../../constants';

class Diorabox extends Component {
    constructor() {
        super();
        this.state = {}
    }

    render() {
        const {dioramas, loading, error, isthree} = this.props;
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
                const dioramaCat = parseInt(diorama.categories[0]);
                let plus = dioramaCat === 14 ? <Link to={`/Diora/${diorama.id}`} className="plus">+</Link> : '';

                return (
                    <div className={isthree ? 'column is-3' : ''} key={index} id={`suite-${index}`}>
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
                            {dioramaCat !== 14 &&
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
                            }
                            <div className="item-overlay top"></div>
                        </div>
                        <div className="item_d">
                            {dioramaCat === 14 &&
                                <Link to={`/Diora/${diorama.id}`}><h2 dangerouslySetInnerHTML={{__html: diorama.title.rendered}}></h2></Link>
                            }
                            {dioramaCat !== 14 &&
                                <h2 dangerouslySetInnerHTML={{__html: diorama.title.rendered}}></h2>
                            }
                            <div dangerouslySetInnerHTML={{__html: diorama.excerpt.rendered}}/>
                                {plus}
                            <div>
                            </div>
                        </div>
                    </div>
                )
            })
        );
    }
}

export default Diorabox;
