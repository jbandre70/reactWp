import React, {Component} from 'react';
import BodyClassName from 'react-body-classname';
import './Page.css';
import LamesWrapper from "../LamesWrapper";
import HelmetComponent from "./../HelmetComponent";
import {gen4} from "../../utils/keygen";
import {ADDRESS_V2, META_TITLE, META_DESCRIPTION} from "../../constants";

class Page extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lames: [],
            acfimg: {
                galerie: []
            }
        };
    }

    componentDidMount() {
        let pageul = ADDRESS_V2 + 'posts/' + this.props.match.params.number;
        fetch(pageul)
            .then(response => response.json())
            .then(response => {
                this.setState({
                    lames: response.acf.content_page,
                })
            });
    }


    render() {
        let {lames} = this.state;
        return (
            <div key={gen4()} className="body-wrapper">
                <BodyClassName className="homepage"/>
                <HelmetComponent title={META_TITLE } description={META_DESCRIPTION} canonical={'Page'} />
                <div key={gen4()}>
                    {lames.map((lien, index) => {
                        return (
                            <div key={index}>
                                <LamesWrapper lien={lien} index={index}/>
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
}

export default Page;
