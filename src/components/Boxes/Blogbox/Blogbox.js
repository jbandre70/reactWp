import React, {Component} from 'react';
import './Blogbox.css';
import {RingLoader} from 'react-spinners';
import {BLOG_POST_TEXT, BLOGPOST_DIORAMAS, LOADER_COLOR} from '../../../constants';

class Blogbox extends Component {
    _isMounted = false;

    constructor() {
        super();
        this.state = {
            dioramas: [],
        }
    }

    componentDidMount() {
        this._isMounted = true;
        this.setState({loading: true});
        let pageUrl = BLOGPOST_DIORAMAS;

        fetch(pageUrl)
            .then(response => response.json())
            .then(response => {
                this.setState({
                    dioramas: response,
                    loading: false,
                });
            })
            .catch(
                error => this.setState({
                    error,
                    loading: false
                })
            );
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        let {dioramas} = this.state;
        let blogBoxBuild;
        if (dioramas.code !== 'no_posts') {
            blogBoxBuild = dioramas.map((diorama, index) => {
                return (
                    <div key={index} className="blogbox-home">
                        <div className="blogbox-txt">
                            <h2 dangerouslySetInnerHTML={{__html: diorama.title.rendered}}/>
                            <h3>{diorama.date.substring(0, 10)}</h3>
                            <span dangerouslySetInnerHTML={{__html: diorama.content.rendered}}/>
                        </div>
                        <div className="blogbox-img">
                            {diorama.acf.advert_video.length === 0 &&
                            <img
                                alt={diorama.better_featured_image.alt_text}
                                src={[
                                    diorama.better_featured_image.media_details.sizes.medium_large.source_url,
                                ]}
                                loader={
                                    <RingLoader
                                        color={LOADER_COLOR}
                                        loading={true}
                                    />
                                }
                            />
                            }
                            {diorama.acf.advert_video.length !== 0 &&
                                <p dangerouslySetInnerHTML={{__html: diorama.acf.advert_video}}/>
                            }
                        </div>
                    </div>
                )
            });
        } else {
            blogBoxBuild = 'Nothing today - You may come back soon for other stories';
        }

        return (
            <div className="black-wrapper">
                <section className="container vignette">
                        <div className="column">
                            {BLOG_POST_TEXT}
                            {blogBoxBuild}
                        </div>
                </section>
            </div>
        );
    }
}

export default Blogbox;
