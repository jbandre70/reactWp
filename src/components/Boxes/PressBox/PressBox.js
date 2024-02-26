import React, {Component} from 'react';
import './PressBox.css';
import {CircleLoader} from 'react-spinners';
import {LOADER_COLOR} from './../../../constants';
import Img from 'react-image';

class PressBox extends Component {
    constructor() {
        super();
        this.state = {}
    }

    render() {
        const {dioramas, loading, error, isthree} = this.props;
        if (loading) {
            return (
                <div className='sweet-loading'>
                    <CircleLoader
                        color={LOADER_COLOR}
                        loading={true}
                    />
                </div>
            )
        }

        if (error) {
            return <p>{error.message}</p>;
        }

        return (
            dioramas.map((diorama, index) => {
                return (
                    <div className={isthree ? 'column is-3 press-wrapper' : 'press-wrapper'} key={index} id={`suite-${index}`}>
                        <div className="item_d_inline">
                            <Img
                                alt={diorama.title}
                                src={[
                                    diorama.fimg_url
                                ]}
                                loader={
                                    <CircleLoader
                                        color={LOADER_COLOR}
                                        loading={true}
                                    />
                                }
                            />
                            <div className="item-overlay top"></div>
                        </div>
                        <div className="item_d_inline">
                            Published on {diorama.acf.press_date}
                            <div dangerouslySetInnerHTML={{__html: diorama.content.rendered}} className='pressContent' />
                            {diorama.acf.press_text_link !== '' &&
                                <a href={diorama.acf.press_link} target="_blank" rel="noopener noreferrer"><h3>{diorama.acf.press_text_link}</h3></a>
                            }
                        </div>
                    </div>
                )
            })
        );
    }
}

export default PressBox;
