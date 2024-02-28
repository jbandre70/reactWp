import React, {Component} from 'react';
import './Diorama.css';
import {ADDRESS_V2, ADDRESS_V3} from '../../constants';
//import Lightbox from 'react-image-lightbox';
//import 'react-image-lightbox/style.css';
import {isMobile} from 'react-device-detect';
import Pinterest from './../Pinterest';

class Diorama extends Component {
    constructor() {
        super();
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
            photoIndex: 0, //lightbox
            isOpen: false //lightbox
        }
    }

    componentWillMount() {
        const dioramaId = window.location.href.split('/')[4];
        let pageul = ADDRESS_V2 + 'posts/' + dioramaId;
        fetch(pageul)
        .then(response => response.json())
        .then(response => {
            this.setState({diorama: response})
        });

        let pageurl = ADDRESS_V3 + "posts/" + dioramaId + '/galerie';
        fetch(pageurl)
        .then(response => response.json())
        .then(data => {
            this.setState({galerie: data.galerie});
        });
    }



/*
    async componentDidMount() {
        const dioramaId = window.location.href.split('/')[4];
        let requestsArray= [ADDRESS_V2 + 'posts/' + dioramaId, ADDRESS_V3 + "posts/" + dioramaId + '/galerie'];
        Promise.all(requestsArray.map((request) => {
            return fetch(request).then((response) => {
                return response.json();
            }).then((data) => {
                return data;
            });
        })).then((values) => {
            console.log(Object.values(values[1]));
            console.log(Object.entries(values[1]));
let rr = Object.values(values[1]);

            let a = [rr.map(object => object.link) ]
console.log('zzza');
console.log(a);



            this.setState({diorama: Object.values(values[0])});
            this.setState({galerie: Object.values(values[1])});
        });
    }
*/

    render() {
        let {galerie, diorama, photoIndex, isOpen} = this.state;
        let nbPhotos = galerie.length;
        let photos = [];

        photoIndex = Number(photoIndex);

        galerie.map((galf, index) => {
          return photos.push(galf.url);
        });
        galerie.slice(0, 2);
        let i = 0;
        let limit = isMobile ? 100 : 3;
        let ls = galerie.map((gal, photoIndex) => {
            i++;
            if (i <= limit) { // on limite la qtté de photos dans la galerie
                return (
                    <div key={photoIndex} className="pinterestImageWrapper">
                        <Pinterest
                            url={gal.link}
                            img= {gal.sizes.large}
                            alt= {gal.alt}
                        />
                        <img
                            alt={gal.alt}
                            src={gal.sizes.medium}
                            onClick={() => this.setState({isOpen: true, photoIndex: photoIndex})}
                            className="cinqcent"
                        />
                    </div>
                )
            } else {
                return '';
            }
        });

        let lsMiniature = '';
        if (isMobile === false) {
            lsMiniature = galerie.map((gal, photoIndex) => {
                i++;
                return (
                    <div key={photoIndex} className="pinterestImageWrapper imageWrapper">
                        <Pinterest
                            url={gal.link}
                            img={gal.sizes.large}
                            alt={gal.alt}
                        />
                        <img
                            alt={gal.alt}
                            src={gal.sizes.thumbnail}
                            onClick={() => this.setState({isOpen: true, photoIndex: photoIndex})}
                            className="cinqcent"
                        />
                    </div>
                )
            });
        }

        return (
            <div key={diorama.id}>
                <section className="illustration">
                    <section className="texte">
                        <h1 className="titre" dangerouslySetInnerHTML={{ __html: diorama.title.rendered }}/>
                    </section>
                    <div className="wrapped">
                        {ls}
                    </div>
                    <div className="wrappedminiatures">
                        {lsMiniature}
                    </div>
                </section>
                {
                    /*isOpen && (
                        <Lightbox
                            mainSrc={photos[(photoIndex)]}
                            nextSrc={photos[(photoIndex + 1) % nbPhotos]}
                            prevSrc={photos[(photoIndex + nbPhotos - 1) % nbPhotos]}
                            onCloseRequest={() => this.setState({isOpen: false})}
                            onMovePrevRequest={() => {
                                this.setState({
                                  photoIndex: (photoIndex + nbPhotos - 1) % nbPhotos
                                });  //alert(photos[(photoIndex)]);
                            }}
                            onMoveNextRequest={() => {
                                this.setState({
                                  photoIndex: (photoIndex + 1) % nbPhotos
                                });  //alert(photos[(photoIndex)]);
                            }}
                        />
                    )*/
                }

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
