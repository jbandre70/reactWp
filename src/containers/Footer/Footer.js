import React, {Component} from 'react';
import './Footer.css';
import {DOMAIN_NAME} from "../../constants";
import CookieConsent from "react-cookie-consent";

const dat = new Date().getFullYear();

class Footer extends Component {
    constructor() {
        super();
        this.state = {
        }
    }

    render() {
        return(
            <footer>
                <div className="columns">
                    <div className="column">
                    </div>
                    <div className="column has-text-centered">
                        <ul>
                            <li><a href={DOMAIN_NAME}>Home</a></li>
                            <li><a href={DOMAIN_NAME + 'Galer'}>GalLery Masonry</a></li>
                            <li><a href={DOMAIN_NAME + 'Pages'}>Articles</a></li>
                        </ul>
                    </div>
                    <div className="column has-text-right">
                        <p>
                            @jeanDiorama {dat}
                        </p>
                    </div>
                </div>
                <a href="#0" className="cd-top">Top</a>
                <CookieConsent
                    enableDeclineButton
                    flipButtons
                    location="bottom"
                    buttonText="I accept"
                    cookieName="myAwesomeCookieName2"
                    style={{ background: "#404040", fontSize: "16px"}}
                    buttonStyle={{ color: "#fff", fontSize: "13px", background: '#f13ab8' }}
                    declineButtonStyle={{ color: "#fff", fontSize: "13px", background: '#bbb' }}
                    expires={150}
                >
                    This website uses cookies .{" "}
                </CookieConsent>
            </footer>
        );
    }
}
export default Footer;
