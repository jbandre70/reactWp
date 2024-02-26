import React , {Component} from 'react';
import './lameImageFullWidth.css';
import {RingLoader} from "react-spinners";
import VideoImages from './../../VideoImages';
import {isMobile} from "react-device-detect";
import Cta from "../Cta";

class lameImageFullWidth extends Component {
    constructor(){
        super();
        this.state = {
        }
    }
    gen4() {
        return Math.random().toString(16).slice(-4)
    }
    render() {
        return;
    }
}
export default lameImageFullWidth;
