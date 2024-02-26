import React , {Component} from 'react';
import './lameImageTextSimple.css';
import {RingLoader} from "react-spinners";
import VideoImages from './../../VideoImages';
import {isMobile} from 'react-device-detect';
import {gen4} from './../../../utils/keygen.js';
import {LOADER_COLOR} from './../../../constants';

class lameImageTextSimple extends Component {
    constructor(){
        super();
        this.state = {
        }
    }

    render() {
        const {position, ratio, img, imgF, video, cite, text, loading} = this.props;


        if (loading) {
            return (
                <div className="loading">
                    <div className='sweet-loading'>
                        <RingLoader
                            color={LOADER_COLOR}
                            loading={true}
                        />
                    </div>
                </div>
            )
        }

        return (
            <section className="container lameimagetextsimple" key={gen4()}>
                <div className="wrapper">
                    {(position === 'left' || isMobile === true) &&
                        <React.Fragment>
                            <VideoImages ratio={ratio} img={img} imgF={imgF} video={video} pos={position}/>
                        </React.Fragment>
                    } {
                        <article key={gen4()} className={'realisation ' + (position === 'left' ? 'left' : 'right')}>
                            { (cite === true ) &&
                                <div className="quote">
                                    <div dangerouslySetInnerHTML={{__html: cite}}></div>
                                </div>
                                }
                            <div dangerouslySetInnerHTML={{__html: text}}></div>
                        </article>
                        }
                    { position === 'right'  && isMobile === false &&
                    <React.Fragment>
                        <VideoImages
                            ratio={ratio}
                            img={img}
                            imgF={img}
                            video={video}
                            pos={position}
                        />
                    </React.Fragment>
                    }
                </div>
            </section>
            );
    }
}
export default lameImageTextSimple;
