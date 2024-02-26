import React, {Component} from 'react';
import './Tag.css';
import {ADDRESS_TAGS} from '../../constants';

class Tag extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: [],
        }
    }

    componentDidMount() {
        fetch(ADDRESS_TAGS)
        .then(response => response.json())
        .then(response => {
            this.setState({
                tags: response
            })
        });
    }

    handleClick = (e) => {
        this.props.onClick(e.target.value)
    }

    render() {
        const {tags} = this.state;
        let lst;
        if (tags !== false) {
            lst = tags.map((lien, index) => {
                return (
                    <li
                        key={index}
                        onClick={this.handleClick}
                        value={lien.id}
                    > {lien.name} </li>
                )
            });
        }

        return (
            <div className="tagsWrapper">
                <h3>You loaded more than 70 dioramas, but some work in series, you may try those links below</h3>
                <ul className="tags">
                    <li
                        onClick={this.handleClick}
                        value={'all'}
                        className="all"
                    >All</li>
                    {lst}
                </ul>
            </div>
        )
    }
}

export default Tag;
