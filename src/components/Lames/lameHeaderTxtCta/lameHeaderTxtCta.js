import React , {Component} from 'react';
import './lame_image_full_width.css';
import {RingLoader} from "react-spinners";
import VideoImages from './../../VideoImages';
import {isMobile} from "react-device-detect";
import Lame_image_text_simple from "../Lame_image_text_simple";

class lame_image_full_width extends Component {
    constructor(){
        super();
        this.state = {
        }
    }
    gen4() {
        return Math.random().toString(16).slice(-4)
    }
    render() {
        const {position, ratio, img, imgF, video, cite, text, loading} = this.props;

        if (loading) {
            return (
                <div className="loading">
                    <div className='sweet-loading'>
                        <RingLoader
                            color={'#f13ab8'}
                            loading={true}
                        />
                    </div>
                </div>
            )
        }

        return (
            <div key={this.gen4()}>
                <div className="wrapper">
                    {(position === 'left' || isMobile === true) &&
                    <React.Fragment>
                        <VideoImages
                            ratio={ratio}
                            img={img}
                            imgF={imgF}
                            video={video}
                            pos={position}
                        />
                    </React.Fragment>
                    }
                    <article
                        className={"realisation " + (position === 'left' ? 'left' : 'right')}>
                        { cite.length > 0 &&
                        <div className="quote">
                            <div dangerouslySetInnerHTML={{__html: cite}}></div>
                        </div>
                        }
                        <div dangerouslySetInnerHTML={{__html: text}}></div>
                    </article>
                    { position === 'right'  && isMobile === false &&
                    <React.Fragment>
                        <VideoImages ratio={ratio} img={img} imgF={imgF} video={video} pos={position} />
                    </React.Fragment>
                    }
                </div>
            </div>);
    }
}
export default lame_image_full_width;
