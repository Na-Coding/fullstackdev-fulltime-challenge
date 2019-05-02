import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import '../App.css'
import Home from '../component/Homepage/Home'
import Login from '../component/Login/Login'
import Register from '../component/Register/Register'

export default class RouterChild extends Component {
    render() {
        return (
            <div>
                <Route exact path='/' component={Home} />
                <Route path='/login' component={Login} />
                <Route path='/register' component={Register} />
            </div>
        )
    }
}
