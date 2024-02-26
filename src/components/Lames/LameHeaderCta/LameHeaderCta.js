import React , {Component} from 'react';
import './LameHeaderCta.css';
import {RingLoader} from "react-spinners";
import {LOADER_COLOR} from '../../../constants';
import {gen4} from '../../../utils/keygen';

class LameHeaderCta extends Component {
    constructor(){
        super();
        this.state = {
        }
    }

    render() {
        const {title, text, img, loading} = this.props;

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
            <div key={gen4()}>
                <div className="container-fluid header_cta" style={{backgroundImage: `url(${img})`}} >
                    <section>
                         {title &&
                            <h2>{title}</h2>
                         }
                         {text &&
                            <div dangerouslySetInnerHTML={{__html: text}}></div>
                         }
                        {/*<div class="ctalign"><?php include('partials/_cta.php'); ?></div>*/}
                    </section>
                </div>
            </div>);
    }
}
export default LameHeaderCta;
