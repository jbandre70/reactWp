import React, { Component } from 'react';
import './VideoImages.css';

class VideoImages extends Component
{
    constructor(props) {
        super(props);
        this.videoExists = this.videoExists.bind(this);
        this.videoNotExists = this.videoNotExists.bind(this);
        this.state = {};
    }

    videoExists(video, img, ratio) {
        let ratioN = ratio === true ? ' max-height:266px' : ' max-height:340px'
        const backgroundPlayerC = '/assets/dist/img/player-center.svg';
        const backgroundPlayer = '/assets/dist/img/player.png';
        const styles = {
            backgroundImage: `url(${backgroundPlayerC})`,
            backgroundImageC: `url(${backgroundPlayer})`,
            minHeight: ratioN
        };

        if (video !== '') {
            return (
                <div>
                    <div className="playercenter" style={{backgroundImage: styles.backgroundImage}}></div>
                    <div
                        className="player"
                        style={{backgroundImage: styles.backgroundImageC}}
                    >
                    </div>
                    <div class="overlay" style={{img}}>
                        <video
                            className="video-lame"
                            width="100%"
                            height="500px"
                            style={{ minHeight: styles.minHeight}}
                            controls
                            data-name="video-0"
                            poster={img}
                        >
                        <source src={video} type="video/" />
                                Votre navigateur ne prend pas en charge les vidéos HTML5
                        </video>
                    </div>
                </div>
            );
        }
    }

    videoNotExists(img, imgF) {
        if (img !== '') {
            return (
               /* <a href={ imgF }><img src={ img } alt="" className="img_responsive" /></a>*/
                <img src={ img } alt="" className="img_responsive" />
            );
        }
    }

    render() {
        const {ratio, img, imgF, video, pos} = this.props;
        return (
            <article className={'img ' + (ratio === true ? 'deuxtiers' : '') + (pos === 'left' ? 'left' : 'right')}>
                {this.videoExists(video, img, ratio)}
                {this.videoNotExists(img, imgF)}
            </article>
        )
    }
}

export default VideoImages;
