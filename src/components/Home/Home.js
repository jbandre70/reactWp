import React, {Component} from 'react';
import BodyClassName from 'react-body-classname';
import {ADDRESS_PAGES, ADDRESS_V3, META_DESCRIPTION, META_TITLE, PAGE_HOME} from '../../constants';
import './Home.css';
import Homediorama from '../Homediorama';
import NewsBox from '../NewsBox';
import {gen4} from "../../utils/keygen";
import LamesWrapper from "./../LamesWrapper";
/*import Blogbox from "./../Boxes/Blogbox";*/
import HelmetComponent from './../HelmetComponent'

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lames: [],
            pageHome: {
                title: {
                    rendered: ''
                },
                content: {
                    rendered: ''
                },
                better_featured_image: {
                    source_url: ''
                }
            },
            diorama: {
                title: {
                    rendered: ''
                },
                content: {
                    rendered: ''
                },
                acf: {
                    rendered: ''
                }
            },
            acfimg: {
                galerie: []
            },
        };
    }


    componentDidMount() {
        let pageurl = ADDRESS_V3 + 'pages/' + PAGE_HOME;
        this.loadTxtpage();

        fetch(pageurl)
            .then(response => response.json())
            .then(response => {
                this.setState({
                    lames: response.acf.content_page,
                })
            });
    }

    loadTxtpage = () => {
        this.setState({loading: true});
        let pageurl = ADDRESS_PAGES + PAGE_HOME;
        fetch(pageurl)
        .then(response => response.json())
        .then(response => {
            this.setState({
                pageHome: response,
                loading: false
            })
        })
        .catch(
            error => this.setState({
                error,
                loading: false
            })
        );
    };

    render() {
        let {lames, pageHome} = this.state;
        let lsd;
        if (lames !==  false) {
             lsd = lames.map((lien, index) => {
                return (
                    <LamesWrapper lien={lien} index={index} />
                )
            });
        }

        return (
            <div key={gen4()} className="body-wrapper">
                <BodyClassName className="homepage"/>
                <HelmetComponent title={META_TITLE} description={META_DESCRIPTION} canonical={'Home'} />
                <div className="header-wrapper">
                    <div key={pageHome.id}
                         className="header-home home"
                         style={{backgroundImage: `url(${pageHome.better_featured_image.source_url})`}}
                    >
                        <h1>JEAN DIORAMA</h1>
                    </div>
                    <NewsBox />

                    {lsd}
                </div>
                <div className="is-hidden-desktop accrochemobile">
                    <div dangerouslySetInnerHTML={{
                        __html: pageHome.content.rendered
                    }}/>
                </div>


                <section className="container vignette">
                    <div className="column is-one-third">
                        <h2>Latest dioramas</h2>
                    </div>
                    {<React.Fragment>
                        <Homediorama page={'home'} />
                    </React.Fragment>}
                </section>
            </div>);
    }
}

export default Home;
