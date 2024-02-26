import React  from 'react';
import './ReactFormLabel.css';

class ReactFormLabel extends React.Component {

    render() {
        return(
            <label htmlFor={this.props.htmlFor}>{this.props.title}</label>
        )
    }
}
export default ReactFormLabel;
