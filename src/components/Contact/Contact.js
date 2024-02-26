import React from 'react';
import './Contact.css';
import ReactFormLabel from './../ReactFormLabel';
import {FETCH_ADDRESS} from '../../constants';

class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formName: '',
            formEmail: '',
            formMessage: '',
            formHoney: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.successCallback = this.successCallback.bind(this);
    }

    handleChange = (e) => {
        let newState = {};
        newState[e.target.name] = e.target.value;
        this.setState(newState)
    };

    successCallback = (e) => {
        if (window.confirm('Thank you for your message')) {
            console.log(e,'mail envoyé');
            this.setState({
                formName: '',
                formEmail: '',
                formMessage: '',
                formHoney: '',
            })
        }
    };

    handleSubmit = (e, message) => {
        e.preventDefault();
        let formData = {
            formName: this.state.formName,
            formEmail: this.state.formEmail,
            formMessage: this.state.formMessage,
            formHoney: this.state.formHoney,
        };

        function validateEmail(email) {
            let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }

        if (
            formData.formName.length < 1 ||
            formData.formEmail.length < 1 ||
            formData.formMessage.length < 1 ||
            (validateEmail(formData.formEmail) === false)
        ) {
            return false;
        }

        fetch(
            FETCH_ADDRESS + '?json=' + encodeURIComponent(JSON.stringify(formData)),
        )
        .then(e => e.text())
        .then(e => {
             if (window.confirm('Thank you for your message. Can I erase the forms?')) {
                 document.getElementById('contact').reset();
             }
        });

        this.setState({
        formName: '',
        formEmail: '',
        formMessage: '',
        formHoney: '',
        })
    };

     render() {
        return(
            <form className='react-form' onSubmit={this.handleSubmit} id="contact">
                <div className="field">
                <ReactFormLabel htmlFor='formName' title='Name:' />
                    <div className="control has-icons-left has-icons-right">
                        <input
                           className="input is-danger"
                           type="text"
                           id="formName"
                           name="formName"
                           required onChange={this.handleChange}
                           value={this.state.name}
                        />
                        <input className="honey" name="formHoney" id="formHoney" />
                        <span className="error" id="nameError"></span>
                        <span className="icon is-small is-left">
                        </span>
                        <span className="icon is-small is-right" id="nameC">
                            <i className=""></i>
                        </span>
                    </div>
                </div>

                <div className="field">
                    <ReactFormLabel htmlFor='formEmail' title='Email:' />
                    <div className="control has-icons-left has-icons-right">
                        <input
                            className="input is-danger"
                            type="email"
                            id='formEmail'
                            name='formEmail'
                            required
                            onChange={this.handleChange}
                            value={this.state.email}
                        />
                        <input type="hidden" name="honeypot" id="honeypot" />
                        <span className="error" id="emailError"></span>
                        <span className="icon is-small is-left">
                        </span>
                        <span className="icon is-small is-right" id="emailC">
                            <i className=""></i>
                        </span>
                    </div>
                </div>
                <div className="field">
                    <ReactFormLabel htmlFor='formMessage' title='Message:' />
                    <div className="control has-icons-left has-icons-right">
                        <textarea
                            className="textarea"
                            id="formMessage"
                            name="formMessage"
                            required
                            onChange={this.handleChange}
                        >
                        </textarea>
                        <span className="error" id="messageError"></span>
                        <span className="icon is-small is-right" id="messageC">
                        <i className=""></i>
                        </span>
                    </div>
                </div>
                <div className="field is-grouped">
                    <div className="control">
                        <input id='formButton' className='button is-link' type='submit' placeholder='Send' value="SEND" />
                    </div>
                </div>
            </form>
        )
    }
}
export default Contact;
