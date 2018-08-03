import React, { Component } from 'react';
import TextField from '../common/TextField';
import PropTypes from 'prop-types';
import loginValidator from '../../validator/Login';
import { withRouter, NavLink } from 'react-router-dom';

class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            errors: {},
            isLoading: false
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    isValid = () => {
        const { errors, isValid } = loginValidator(this.state);

        if (!isValid) {
            this.setState({ errors: errors })
        }

        return isValid;
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (this.isValid()) {
            this.setState({ errors: {}, isLoading: true });
            this.props.loginRequest(this.state);
        }
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.response && nextProps.isAuthenticated) {
            this.logInSuccess(nextProps.response);
        }
        if (nextProps.errors && nextProps.errors.data) {
            this.setState({
                errors: nextProps.errors.data,
                isLoading: false
            })
        }
    }

    logInSuccess = (res) => {
        this.props.history.push('/dashboard');
    }

    render() {
        const { username, password, errors, isLoading } = this.state;
        return (
            <React.Fragment>
                <form onSubmit={this.onSubmit}>
                    {errors.form && <div className="alert alert-danger">{errors.form}</div>}
                    <TextField
                        label="Username / Email"
                        value={username}
                        onChange={this.onChange}
                        name="username"
                        error={errors.username}
                    />
                    <TextField
                        label="Password"
                        value={password}
                        onChange={this.onChange}
                        name="password"
                        error={errors.password}
                        type="password"
                    />
                    <div className="form-group">
                        <button className="btn btn-primary btn-block" disabled={isLoading}>Login</button>
                    </div>
                    <small className="form-text text-center">
                        <NavLink to="/signup">Sign up</NavLink> if you don't have an account<br />
                        <NavLink to="/forgotpassword">Forgot Password?</NavLink>
                    </small>
                </form>
            </React.Fragment>
        )
    }
}

LoginForm.propTypes = {
    loginRequest: PropTypes.func.isRequired,
}

export default withRouter(LoginForm);