import React , {Component} from 'react';
import './imageFullTextHalf.css';

class imageFullTextHalf extends Component {
    constructor(){
        super();
        this.state = {
        }
    }

    render() {
        const {field} = this.props;
        //let iterator = 0;
        return (
            field.map((field, index) => {
/*                let leftRightBorder = '';
                let classn= '';
                if (field.lameh_full === true) {
                    classn = 'full';
                } else {
                    classn = 'half';
                    leftRightBorder = iterator % 2 !== 0 ? 'bleft' : 'bright';
                }*/
                //iterator ++;
                const stylesI = {
                    backgroundImage: `url(${field.lameh_img.sizes.large})`,
                };
                return (
                    <section className="lamehomes" key={index}>
                        <figure className="lamehome {classn}">
                            <a href={field.lameh_link.url}>
                                <picture
                                    className="lametitre"
                                    style={{backgroundImage: stylesI.backgroundImage}}
                                />
                                <figcaption>
                                    <h2>{field.lameh_title}</h2>
                                    <p className="text">{field.lameh_text}</p>
                                </figcaption>
                            </a>
                        </figure>
                    </section>
                );
            })
        )
    }
}

export default imageFullTextHalf;
