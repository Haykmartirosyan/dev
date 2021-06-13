import React, {Component} from 'react';
import {withRouter} from "react-router-dom";

class NotFound extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: props.location,
        };
    }

    render() {
        return (
            <div className="content">
               404
            </div>
        )
    }
}

export default withRouter(NotFound)
