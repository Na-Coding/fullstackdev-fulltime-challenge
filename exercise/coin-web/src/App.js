import React, { Component } from 'react'
import { BrowserRouter as Router, Link, Route, withRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import RouterChild from './routes/RouterChild'

class App extends Component {

  componentDidMount() {
    this.check_token()
  }
  check_token = async () => {
    try {
      if (window.location.pathname !== '/login') {
        const stage = window.localStorage.getItem('stage')
        if (!stage) {
          this.props.history.push('/login')
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}
export default withRouter(App);