import React, { Component } from 'react'
import { Col, Form, Button, FormGroup, Label, Input, Card } from 'reactstrap';
import { Link } from 'react-router-dom'
import { post, get } from '../../server/connect';
import swal from 'sweetalert'

export default class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: ''
        }
    }
    submit_user_login = async () => {
        const object = {
            username: this.state.username,
            password: this.state.password
        }
        try {
            await post(object, "user/user_login").then(res => {
                if (res.success) {
                    // window.localStorage.setItem('stage', true)
                    this.props.history.push('/')
                } else {
                    swal("please fill in the information correctly. !", "", "warning")
                }
            });
        } catch (error) {
            console.log(object);
        }
    }
    render() {
        const { username, password } = this.state
        return (
            <div>
                <div className="font-h" >
                    I GEAR GEEK: Coin Locker (コインロッカー)
                </div>
                <Col sm={12} md={{ size: 4, offset: 4 }} style={{ marginTop: 60 }}>
                    <Card body style={{ backgroundColor: "#ff63470d" }} >
                        <Col >
                            <Form>
                                <Label />
                                <FormGroup>
                                    <Input type="text" name="username" placeholder="Username"
                                        value={username}
                                        onChange={(e) => this.setState({ username: e.target.value })} />
                                </FormGroup>
                                <FormGroup>
                                    <Input type="password" name="password" placeholder="Password"
                                        value={password}
                                        onChange={(e) => this.setState({ password: e.target.value })} />
                                </FormGroup>
                                <FormGroup style={{ display: 'flex', justifyContent: 'space-around' }}>
                                    <Button color="primary" style={{ textAlign: 'center' }} onClick={username && password ? () => this.submit_user_login() : null}>LOG IN</Button>
                                    <a style={{ paddingTop: 5 }}>not a member ? <Link to="/register">sign up here</Link></a>
                                </FormGroup>
                            </Form>
                        </Col>
                    </Card>
                </Col>
            </div >
        )
    }
}
