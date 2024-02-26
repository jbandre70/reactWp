import React, {Component} from 'react';
import './AdvertBox.css';
import {RingLoader} from 'react-spinners';
import {ADVERTBOXADDRESS, LOADER_COLOR} from '../../../constants';
import Img from 'react-image';
import Cta from "../../Lames/Cta/Cta";
import {gen4} from "../../../utils/keygen";

class AdvertBox extends Component {
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
        let pageUrl = ADVERTBOXADDRESS;
        fetch(pageUrl)
        .then(response => response.json())
        .then(response => {
            this.setState({
                dioramas: response,
                loading: false,
            })
        })
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        let {dioramas} = this.state;
        let ls = dioramas.map((diorama, index) => {
            return (
                <div className="blue-wrapper" key={gen4()}>
                    <section className="container vignette">
                        <div className="column">
                            <h2>Partners</h2>
                                <div key={index} className="blogbox-home">
                                    <div className="blogbox-img">
                                        {diorama.acf.advert_video.length === 0 &&
                                            <Img
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
                                        {diorama.acf.advert_video.length !== 0   &&
                                            <p dangerouslySetInnerHTML={{__html: diorama.acf.advert_video}}/>
                                        }
                                    </div>
                                    <div className="blogbox-txt">
                                        <h2 dangerouslySetInnerHTML={{__html: diorama.title.rendered}}/>
                                        <h3>{diorama.date.substring(0, 10)}</h3>
                                        <span dangerouslySetInnerHTML={{__html: diorama.content.rendered}}/>
                                        <Cta
                                            link={diorama.acf.cta_link}
                                            txt={diorama.acf.cta_txt}
                                            bg={diorama.acf.cta_bg}
                                            target={diorama.acf.cta_target}
                                            index={index}
                                        />
                                    </div>
                                </div>
                        </div>
                    </section>
                </div>
            )
        });
        return (
            <React.Fragment>
                <div key={gen4()}>
                    <section className="vignette" id="top">
                        <div className="column header-galery">
                            <h1 className="header-page partners">Partners</h1>
                        </div>
                            {ls}
                    </section>
                </div>
            </React.Fragment>
        );
    }
}

export default AdvertBox;
