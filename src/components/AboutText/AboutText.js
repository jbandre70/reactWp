import React, {Component} from 'react';
import './AboutText.css';
import {ADDRESS_V2, PAGE_ABOUT, LOADER_COLOR} from '../../constants';
import {CircleLoader} from 'react-spinners';

class AboutText extends Component {
    constructor() {
        super();
        this.state = {
            loading: true,
            AboutTextRendered: {
                title: {
                    rendered: ''
                },
                content: {
                    rendered: ''
                },
                featured_media: {
                    rendered: ''
                }
            }
        }
    }

    componentDidMount() {
        this.setState({loading: true});
        fetch(ADDRESS_V2 + 'pages/' + PAGE_ABOUT)
            .then(response => response.json())
            .then(response => {
                this.setState({
                    AboutTextRendered: response,
                    loading: false
                })
            });
    }

    render() {
        let {AboutTextRendered, loading} = this.state;
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
            <div key={AboutTextRendered.id}>
                <h1 dangerouslySetInnerHTML={{
                    __html: AboutTextRendered.title.rendered
                }}/>
                <div dangerouslySetInnerHTML={{
                    __html: AboutTextRendered.content.rendered
                }}/>
                <img src={AboutTextRendered.fimg_url}
                     alt={""}
                />
            </div>
        );
    }
}

export default AboutText;
