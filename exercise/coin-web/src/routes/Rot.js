import React, { Component } from 'react'
import RouterChild from './RouterChild'
import { BrowserRouter as Router } from 'react-router-dom'
import App from '../App';
export default class Rot extends Component {
    render() {
        return (
            <div >
                <Router>
                    <App>
                        <RouterChild />
                    </App>
                </Router>
            </div>
        );
    }
}