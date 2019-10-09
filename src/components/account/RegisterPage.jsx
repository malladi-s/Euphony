import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

export default class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.compileFormData = this.compileFormData.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);

        this.state = {
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            username: '',
        };
    }

    // Put everything together and send it up to the register function
    compileFormData() {
        const { registerFunction } = this.props;
        const formData = this.state;
        registerFunction(formData);
    }

    handleInputChange(e) {
        this.setState({ [e.currentTarget.id]: e.target.value });
    }

    handleKeyPress(target) {
        if (target.charCode === 13) {
            target.preventDefault();
            this.compileFormData();
        }
    }

    render() {
        return (
            <div className="row justify-content-center">
                <div className="col-10 col-sm-7 col-md-5 col-lg-4">
                    <p>
                        Want to get started saving your favorite music to Euphony?
                        Create an account!
                    </p>
                    <Form>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                onChange={this.handleInputChange}
                                onKeyPress={this.handleKeyPress}
                                placeholder="user@domain.com"
                                type="email"
                                value={this.state.email}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input
                                id="password"
                                name="password"
                                onChange={this.handleInputChange}
                                onKeyPress={this.handleKeyPress}
                                placeholder="password"
                                type="password"
                                value={this.state.password}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="username">Username</Label>
                            <Input
                                id="username"
                                name="username"
                                onChange={this.handleInputChange}
                                onKeyPress={this.handleKeyPress}
                                placeholder="user name"
                                type="text"
                                value={this.state.username}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="firstName">First Name</Label>
                            <Input
                                id="firstName"
                                name="firstName"
                                onChange={this.handleInputChange}
                                onKeyPress={this.handleKeyPress}
                                placeholder="first name"
                                type="text"
                                value={this.state.firstName}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="lastName">Last Name</Label>
                            <Input
                                id="lastName"
                                name="lastName"
                                onChange={this.handleInputChange}
                                onKeyPress={this.handleKeyPress}
                                placeholder="last name"
                                type="text"
                                value={this.state.lastName}
                            />
                        </FormGroup>

                        <Button color="primary" onClick={this.compileFormData}>Register</Button>
                    </Form>
                </div>
            </div>
        );
    }
}