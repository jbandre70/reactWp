import React, {Component} from 'react';
import './GaleryDioramas.css';
import {
    ADRESS_IMAGES,
    LOADER_COLOR,
    GALERY_PAGE,
    ADDRESS_V2,
    META_TITLE,
    META_DESCRIPTION
} from '../../constants';
import {CircleLoader, RingLoader} from 'react-spinners';
import ModalImage from 'react-modal-image';
import pinterest from './../../img/pinterest.svg';
import {gen4} from './../../utils/keygen.js';
import {InfiniteScroll} from 'react-simple-infinite-scroll';
import HelmetComponent from './../HelmetComponent';

class GaleryDioramas extends Component {
    constructor() {
        super();
        this.state = {
            pageGalery: {
                title: {
                    rendered: ''
                },
                content: {
                    rendered: ''
                },
                featured_media: {
                    rendered: ''
                }
            },
            items: [],
            total_pages: 0,
            isLoading: true,
            cursor: 0
        }
    }

    componentDidMount() {
        this.loadUser();
        let pageurl = ADDRESS_V2 + 'pages/' + GALERY_PAGE;
        fetch(pageurl)
            .then(response => response.json())
            .then(response => {
                this.setState({
                    pageGalery: response,
                    loading: false
                })
            });

    }

    loadUser = () => {
        this.setState({ isLoading: true, error: undefined })
        let {items, cursor} = this.state;
        cursor +=1;
        fetch(ADRESS_IMAGES + cursor)
            .then(response => {
                for (let pair of response.headers.entries()) {
                    if (pair[0] === 'x-wp-totalpages') {
                        this.setState(state => ({
                            total_pages:  pair[1]
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
                    this.setState({ isLoading: false, error })
                }
            )
    };

    render() {
        const {items, total_pages, cursor, isLoading, pageGalery} = this.state;
        if (cursor <= total_pages) {
            this.cursor = 'lol';
        }
        let ls = items.map(diorama => {
            if (typeof diorama.better_featured_image.media_details.sizes.medium_large !== 'undefined') {
                return (
                    <div key={diorama.id} className="item">
                        <a
                            href={`http://pinterest.com/pin/create/button/?url=${diorama.fimg_url}&media=${diorama.fimg_url}&description=${diorama.title.rendered}`}
                            className="pin-it-button"
                            data-pin-round="round"
                            target="blank"
                        >
                            <img src={pinterest} alt="" />
                        </a>
                        <ModalImage
                            small={diorama.better_featured_image.media_details.sizes.medium_large.source_url}
                            large={diorama.fimg_url}
                            alt={diorama.title.rendered}
                            loader={<RingLoader color={LOADER_COLOR} loading='true'/>}
                            hideDownload={true}
                        />
                    </div>
                );
            } else {
                return '';
            }
        })

        return (
            <div>
                <HelmetComponent title={META_TITLE } description={META_DESCRIPTION} canonical={'Galer'} />
                <div className="header-galery">
                    <h1 dangerouslySetInnerHTML={{
                        __html: pageGalery.title.rendered
                    }}/>
                    <div dangerouslySetInnerHTML={{
                        __html: pageGalery.content.rendered
                }}/>
                </div>
                <InfiniteScroll
                    throttle={100}
                    threshold={300}
                    isLoading={isLoading}
                    hasMore={!!cursor}
                    onLoadMore={this.loadUser}
                >
                    <div className="columns" key={gen4()}>
                        <div className="column" key={gen4()}>
                            <div className="masonry" key={gen4()}>
                                {ls}
                            </div>
                        </div>
                    </div>
                </InfiniteScroll>
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

export default GaleryDioramas;
