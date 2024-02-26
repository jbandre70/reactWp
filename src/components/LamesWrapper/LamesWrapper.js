import React, {Component} from 'react';

import './LamesWrapper.css';
import Citation from '../Lames/Citation';
import lameImageTextSimple from '../Lames/lameImageTextSimple';
import lameImages from '../Lames/lameImages';
import flexibleCenterText from '../Lames/flexibleCenterText';
import LameHeaderCta from '../Lames/LameHeaderCta';
import imageFullTextHalf from "../Lames/imageFullTextHalf";

class LamesWrapper extends Component {

    constructor() {
        super();
        this.state = {}
    }

    render() {
        const {lien, index} = this.props;
        let lsd;

        if (lien.acf_fc_layout === 'lame_image_full_width') {
            lsd =
                <section
                    key={index}
                    style={{backgroundImage: `url(${lien.lifw_img.sizes.large})`}}
                    className="imgfw"
                >
                </section>
        }

        if (lien.acf_fc_layout === 'lame_citation') {
            lsd =
                <section className="container citation" key={index}>
                    <React.Fragment>
                        <Citation classe={lien.cit_small} link={lien.cit_cit} author={lien.cit_author}/>
                    </React.Fragment>
                </section>
        }

        if (lien.acf_fc_layout === 'lame_image_text_simple') {
            lsd =
                <section className="container lameimagetextsimple" key={index}>
                    <React.Fragment>
                        <lameImageTextSimple
                            position={lien.lit_pos}
                            ratio={lien.lit_ratio}
                            img={lien.lit_img.sizes.medium_large}
                            imgF={lien.lit_img.sizes.large}
                            video={lien.lit_video}
                            cite={lien.its_cite}
                            text={lien.its_text}
                        />
                    </React.Fragment>
                </section>
        }

        if (lien.acf_fc_layout === 'lame_wysiwyg') {
            lsd =
                <section className="container wysiwyg" key={index}>
                    <div dangerouslySetInnerHTML={{__html: lien.wy_txt}}></div>
                </section>
        }

        if (lien.acf_fc_layout === 'lame_header_txt_cta') {
            lsd =
                <div key={index}>
                    <React.Fragment>
                        <lameImageTextSimple
                            cta_bg={lien.cta_bg}
                            cta_txt={lien.cta_txt}
                            cta_link={lien.cta_link}
                            cta_target={lien.cta_target}
                            img={lien.htc_img.sizes.large}
                            text={lien.htc_text}
                            title={lien.htc_title}
                        />
                    </React.Fragment>
                </div>
        }

        if (lien.acf_fc_layout === 'lame_images') {
            lsd =
                <React.Fragment key={index}>
                    <lameImages
                        li_imgs={lien.li_imgs}
                    />
                </React.Fragment>
        }

        if (lien.acf_fc_layout === 'flexible-center-text') {
            lsd =
                <React.Fragment key={index}>
                    <flexibleCenterText
                        title={lien.title}
                        subtitle={lien.subtitle}
                        content={lien.content}
                    />
                </React.Fragment>
        }
        if (lien.acf_fc_layout === 'lame_home_it') {
            lsd =
                <React.Fragment key={index}>
                    <imageFullTextHalf
                        field={lien.lameh_home}
                    />
                </React.Fragment>
        }

        if (lien.acf_fc_layout === 'lame_header_txt_cta') {
            lsd =
                <React.Fragment key={index}>
                    <LameHeaderCta
                        title={lien.htc_title}
                        text={lien.htc_text}
                        img={lien.htc_img.sizes.large}
                    />
                </React.Fragment>
        }
    return (
            <div>
                {lsd}
            </div>
        )
    }
}

export default LamesWrapper;
