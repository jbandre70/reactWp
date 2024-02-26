import React , {Component} from 'react';
import './lameImages.css';
import {RingLoader} from "react-spinners";
import {isMobile} from "react-device-detect";
import {LOADER_COLOR} from "../../../constants";
import ModalImage from "react-modal-image";
import pinterest from "../../../img/pinterest.svg";
import {gen4} from '../../../utils/keygen';

class lameImages extends Component {
    constructor(){
        super();
        this.state = {
        }
    }
    gen4() {
        return Math.random().toString(16).slice(-4)
    }
    render() {
        const {li_imgs} = this.props;

        let widthDiv = '';
        let imgSize = 'medium'
        if (li_imgs && li_imgs.length > 0) {
            const nb = li_imgs.length;
            if (nb === 1) {
                imgSize = 'large';
                if (isMobile) {
                    widthDiv = 100;
                } else {
                    widthDiv = 90;
                }
            } else if (isMobile) {
                widthDiv = 100;
            } else {
                widthDiv = Math.round(100 / nb) - 4;
            }
        }


        const images = (li_imgs && li_imgs.length > 0) ? li_imgs.map(li_img => {
            let pint =
                <a
                    href={`http://pinterest.com/pin/create/button/?url=${li_img.li_img.sizes.large}&media=${li_img.li_img.sizes.large}&description=`}
                    className="pin-it-button"
                    data-pin-round="round"
                    target="blank"
                >
                    <img src={pinterest} alt="" />
                </a>
            ;
            if (li_img.li_link !== '') {
                return (
                    <div className="imageInline"  key={li_img.li_img.ID} style={{width: `${widthDiv}%`}}
                    >
                        {pint}
                        <a href={li_img.li_link} target={li_img.li_target === true ? '_blank' : ''}>
                            <ModalImage
                                small={li_img.li_img.sizes.medium}
                                large={li_img.li_img.sizes.large}
                                loader={<RingLoader color={LOADER_COLOR} loading='true'/>}
                                hideDownload={true}
                            />
                        </a>
                    </div>
                );
            } else {

                return (
                    <div className="imageInline"  key={li_img.li_img.ID}>
                        {pint}
                        <ModalImage
                            small={li_img.li_img.sizes[imgSize]}
                            large={li_img.li_img.sizes.large}
                            loader={<RingLoader color={LOADER_COLOR} loading='true'/>}
                            hideDownload={true}
                            className='img_imgInline'
                        />
                    </div>
                );
            }
        }) : null;

        return (
            <section className="container lame_image" key={gen4()}>
                <div className="images">
                    {images}
                </div>
            </section>
        );
    }
}
export default lameImages;
