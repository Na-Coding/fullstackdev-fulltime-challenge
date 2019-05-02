import React, { Component } from 'react'
import { Col, Form, Button, FormGroup, Label, Input, Card, InputGroup, InputGroupAddon } from 'reactstrap';
import { post, get } from '../../server/connect';
import swal from 'sweetalert'

export default class Register extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: ''
        }
    }
    register = async () => {
        const object = {
            username: this.state.username,
            password: this.state.password
        }
        try {
            await post(object, "user/user_register").then(res => {
                if (res.success) {
                    swal({
                        title: "register success !",
                        icon: "success",
                        button: "OK",
                    }).then((button) => {
                        if (button) {
                            this.props.history.push('/login')
                        }
                    })
                } else {
                    swal("Please insert data again !", "", "warning")
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
                    Create account
                </div>
                <Col sm={12} md={{ size: 4, offset: 4 }} style={{ marginTop: 60 }}>
                    <Card body style={{ backgroundColor: "#ff63470d" }} >
                        <Col >
                            <Form>
                                <Label />
                                <FormGroup>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">@</InputGroupAddon>
                                        <Input type="text" placeholder="username"
                                            onChange={(e) => this.setState({ username: e.target.value })}
                                            value={username} />
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                                        <Input placeholder="password" type="password"
                                            onChange={(e) => this.setState({ password: e.target.value })}
                                            value={password} />
                                    </InputGroup>
                                </FormGroup>
                            </Form>
                        </Col>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                            <Button color="primary" style={{ textAlign: 'center' }} onClick={() => this.register()}>Confirm</Button>
                        </div>
                    </Card>
                </Col>
            </div >
        )
    }
}
