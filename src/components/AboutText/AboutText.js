import React, {Component} from 'react';
import './AboutText.css';
import {ADDRESS_V2, PAGE_ABOUT, LOADER_COLOR} from '../../constants';
import {CircleLoader} from 'react-spinners';

class AboutText extends Component {

    constructor() {
        super();
        this.state = {
            loading: true,
            aboutT: {
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
            mediaT: {
                guid: {
                    rendered: ''
                }
            },
            acfimg: {
                galerie: []
            }
        }
    }

    componentDidMount() {
        this.setState({loading: true});
        let pageurl = ADDRESS_V2 + 'pages/' + PAGE_ABOUT;
        fetch(pageurl)
            .then(response => response.json())
            .then(response => {
                this.setState({
                    aboutT: response,
                    loading: false
                })
            });
    }

    render() {
        let {aboutT, loading} = this.state;
        if (loading) {
            return (
                <div className="loading">
                    <div className='sweet-loading'>
                        <CircleLoader
                            color={LOADER_COLOR}
                            loading={true}
                        />
                    </div>
                </div>
            )
        }

        return (
            <div key={aboutT.id}>
                <h1 dangerouslySetInnerHTML={{
                    __html: aboutT.title.rendered
                }}/>
                <div dangerouslySetInnerHTML={{
                    __html: aboutT.content.rendered
                }}/>
                <img src={aboutT.fimg_url}
                     alt={""}
                />
            </div>
        );
    }
}

export default AboutText;
