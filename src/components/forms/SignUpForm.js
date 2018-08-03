import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import timezone from '../../data/Timezone';
import map from 'lodash/map';
import propTypes from 'prop-types';
import signUpValidator from '../../validator/SignUp';
import TextField from '../common/TextField';
import classnames from 'classnames';

class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            passwordConfirmation: '',
            timezone: '',
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
        const { errors, isValid } = signUpValidator(this.state);

        if (!isValid) {
            this.setState({ errors: errors });
        }
        return isValid;
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (this.isValid()) {
            this.setState({ errors: {}, isLoading: true });
            this.props.userSignUpRequest(this.state);
        }
    }

    checkUserExists = (e) => {
        let val = e.target.value;
        if (val !== '') {
            this.props.checkUserExists(val);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors && nextProps.errors.data) {
            this.setState({ errors: nextProps.errors.data, isLoading: false })
        }
        if (nextProps.response) {
            this.props.addFlashMessage({
                type: 'success',
                message: 'Log in successfull. Welcome!!'
            });
            console.log('re routing')
            this.props.history.push('/dashboard');
        }
        if (nextProps.userExistResponse) {
            this.setState({ errors: nextProps.userExistResponse.errors, isLoading: false })
        }
    }

    render() {
        const { errors } = this.state;
        const options = map(timezone, (val, key) =>
            <option key={val} value={val}>{key}</option>
        );
        return (
            <form onSubmit={this.onSubmit}>
                <TextField
                    label="User Name"
                    value={this.state.username}
                    onChange={this.onChange}
                    name="username"
                    error={errors.username}
                    checkUserExists={this.checkUserExists}
                />

                <TextField
                    label="Email"
                    value={this.state.email}
                    onChange={this.onChange}
                    name="email"
                    error={errors.email}
                    checkUserExists={this.checkUserExists}
                />

                <TextField
                    label="Password"
                    value={this.state.password}
                    onChange={this.onChange}
                    name="password"
                    error={errors.password}
                    type="password"
                />

                <TextField
                    label="Confirm Password"
                    value={this.state.passwordConfirmation}
                    onChange={this.onChange}
                    name="passwordConfirmation"
                    error={errors.passwordConfirmation}
                    type="password"
                />

                <div className="form-group">
                    <label className="form-control-label">Timezone</label>
                    <select
                        value={this.state.timezone}
                        onChange={this.onChange}
                        name="timezone"
                        className={classnames("form-control", { "is-invalid": errors.timezone })}
                    >
                        <option value="" disabled>Choose Your Timezone</option>
                        {options}
                    </select>
                    {errors.timezone && <span className="invalid-feedback">{errors.timezone}</span>}
                </div>

                <div className="form-group">
                    <button disabled={this.state.isLoading} className="btn btn-primary btn-block">Sign Up</button>
                </div>

                <small className="form-text text-center">
                    or <NavLink to="/login">LOGIN</NavLink> if you have an account
                </small>
            </form>
        )
    }
}

SignUpForm.propTypes = {
    userSignUpRequest: propTypes.func.isRequired,
    addFlashMessage: propTypes.func.isRequired
}

export default withRouter(SignUpForm);