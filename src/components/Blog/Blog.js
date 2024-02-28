import React, {Component} from 'react';
import './Blog.css';
import {RingLoader} from 'react-spinners';
import HelmetComponent from "./../HelmetComponent";
import {ADDRESS_V2, LOADER_COLOR, BLOG_ID, META_TITLE, META_DESCRIPTION} from '../../constants';
import ModalImage from 'react-modal-image'

class Blog extends Component {
    constructor() {
        super();
        this.state = {
            dioramas: [],
            loading: true
        }
    }

    componentDidMount() {
        this.setState({loading: true});
        let pageurl = ADDRESS_V2 + 'posts/?categories=' + BLOG_ID + '&per_page=100';
        fetch(pageurl).then(response => response.json()).then(response => {
            this.setState({dioramas: response, loading: false})
        })
    }

    render() {
        let {dioramas, loading} = this.state;

        if (loading) {
            return (
                <div className="loading">
                    <div className='sweet-loading'>
                        <RingLoader color={LOADER_COLOR} loading={true}/>
                    </div>
                </div>
            )
        }
        let blogDioramas = dioramas.map((diorama, index) => {
            const dioramaCat = diorama.categories;
            return (dioramaCat === '6' && <div key={index} className="item">
                <HelmetComponent title={META_TITLE} description={META_DESCRIPTION} canonical={'Blog'}/>
                <div className="item__content item__content--medium">
                    <h2 dangerouslySetInnerHTML={{
                        __html: diorama.title.rendered
                    }}/>
                    <h3>{diorama.date.substring(0, 10)}</h3>
                    <ModalImage
                        small={diorama.better_featured_image.media_details.sizes.medium_large.source_url}
                        large={diorama.better_featured_image.media_details.sizes.medium_large.source_url}
                        alt={diorama.better_featured_image.alt_text}
                        loader={<RingLoader color={LOADER_COLOR} loading='true'/>}
                        hideDownload={true}
                    />
                    <span dangerouslySetInnerHTML={{
                        __html: diorama.content.rendered
                    }}/>
                </div>
            </div>)
        });

        return (<div>
            <section className="blogpage">
                <div className="columns">
                    <div className="column">
                        <div className="masonry">
                            {blogDioramas}
                        </div>
                    </div>
                </div>
            </section>
        </div>);
    }
}

export default Blog;
