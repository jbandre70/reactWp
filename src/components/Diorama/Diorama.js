import React, {Component} from 'react';
import './Diorama.css';
import {ADDRESS_MENU, ADDRESS_V2, ADDRESS_V3, OPTIONS, ROOT_ADDRESS} from '../../constants';
//import Lightbox from 'react-image-lightbox';
//import 'react-image-lightbox/style.css';
import {isMobile} from 'react-device-detect';
import Pinterest from './../Pinterest';
import ModalImage from "react-modal-image";

class Diorama extends Component {
    constructor() {
        super();
        this.dioramaId = window.location.href.split('/')[4];

        this.state = {
            diorama: {
                title: {
                    rendered: ''
                },
                content: {
                    rendered: ''
                },
                acf: {
                    completed_on: '',
                    vendu: '',
                    size_of_the_scene: '',
                    size_of_the_frame: ''
                }
            },
            galerie: [],
        }
    }


    componentWillMount() {
        fetch(ADDRESS_V2 + 'posts/' + this.dioramaId)
        .then(response => response.json())
        .then(response => {
            this.setState({diorama: response})
        });

        fetch(ADDRESS_V3 + "posts/" + this.dioramaId + '/galerie')
        .then(response => response.json())
        .then(data => {
            this.setState({galerie: data.galerie});
        });
    }


/*    async componentDidMount() {
        let requestsArray= [ADDRESS_V2 + 'posts/' + this.dioramaId, ADDRESS_V3 + "posts/" + this.dioramaId + '/galerie'];
        Promise.all(requestsArray.map((request) => {
            return fetch(request).then((response) => {
                return response.json();
            }).then((data) => {
                return data;
            });
        })).then((values) => {
            console.log(Object.entries(values[1]));

            let a = Object.values(values[1]);

            a.forEach(e => {
                console.log('e');
                console.log(Object.entries(e));
            })
/!*            let a = Object.values(values[1]);
            console.log(a[0]);
            let b = Object.values(a[0]);
            let c= Object.values(b);
            console.log(Object.entries(c));*!/


            this.setState({diorama: Object.values(values[0])});
            this.setState({galerie: Object.values(values[1])});
        });
    }*/

    render() {
        let {galerie, diorama} = this.state;
        let photos = [];

        galerie.map((galf, index) => {
          return photos.push(galf.url);
        });
        galerie.slice(0, 2);
        let i = 0;
        let limit = isMobile ? 100 : 10;
        let ls = galerie.map((gal, photoIndex) => {
            i++;
            if (i <= limit) {
                return (
                    <div key={photoIndex} className="pinterestImageWrapper">
                        <Pinterest
                            url={gal.link}
                            img= {gal.sizes.large}
                            alt= {gal.alt}
                        />
                        <ModalImage
                            small={gal.sizes.medium}
                            large={gal.sizes.large}
                            alt={gal.alt}
                        />
                    </div>
                )
            } else {
                return '';
            }
        });

        return (
            <div key={diorama.id}>
                <section className="illustration">
                    <section className="texte">
                        <h1 className="titre" dangerouslySetInnerHTML={{ __html: diorama.title.rendered }}/>
                    </section>
                    <div className="wrapped">
                        {ls}
                    </div>
                </section>
                <section className="texte">
                    <div className="columns">
                        <div className="column is-two-thirds">
                        </div>
                        <div className="column  ">
                            <div className="data">Completed on {diorama.acf.completed_on.substring(0,4)}-{diorama.acf.completed_on.substring(2,4)}-{diorama.acf.completed_on.substring(4,6)} </div>
                        </div>
                        <div className="column has-text-centered sold">
                            {
                              diorama.acf.vendu
                                ? <div className="purple">sold / unavailable</div>
                                : <div className="neutral"></div>
                            }
                        </div>
                    </div>
                    <div className="columns v2">
                        <div className="column is-one-third size">
                            {diorama.acf.size_of_the_scene &&
                                <div>
                                    Size of the scene : {diorama.acf.size_of_the_scene}cm
                                    <br/>
                                    Size of the frame : {diorama.acf.size_of_the_frame}cm
                                </div>
                            }
                        </div>
                        <div className="column desc">
                            {diorama.content.rendered !== '' &&
                                <h2>About</h2>
                            }
                            <p className="dioramaText" dangerouslySetInnerHTML={{ __html: diorama.content.rendered }} />
                        </div>
                    </div>
                </section>
            </div>);
        }
    }

    export default Diorama;
