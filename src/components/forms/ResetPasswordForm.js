import React, { Component } from 'react';
import TextField from '../common/TextField';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

class ResetPasswordForm extends Component {
    state = {
        errors: {},
        token: this.props.token,
        password: '',
        passwordConfirmation: '',
        isLoading: false
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        const { errors, isValid } = this.valid(this.state);
        if (!isValid) {
            this.setState({ errors: errors, isLoading: false });
        } else {
            this.setState({ errors: {}, isLoading: true });
            this.props.submit(this.state);
        }
    }

    valid = (data) => {
        const errors = {};
        if (!data.password) errors.password = "Password can't be blank!";
        if (data.password !== data.passwordConfirmation) errors.password = "Password should match."
        return {
            errors,
            isValid: isEmpty(errors)
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors && nextProps.errors.data) {
            this.setState({errors: nextProps.errors.data.errors, isLoading: false});
        }
    }

    render() {
        const { errors, password, passwordConfirmation, isLoading } = this.state;
        return (
            <React.Fragment>
                <form onSubmit={this.onSubmit.bind(this)}>
                    {errors.global && <div className="alert alert-danger">{errors.global}</div>}
                    <TextField
                        label="Enter your new password"
                        value={password}
                        onChange={this.onChange.bind(this)}
                        name="password"
                        error={errors.password}
                        type="password"
                    />
                    <TextField
                        label="Confirm your new password"
                        value={passwordConfirmation}
                        onChange={this.onChange.bind(this)}
                        name="passwordConfirmation"
                        error={errors.passwordConfirmation}
                        type="password"
                    />
                    <div className="form-group">
                        <button className="btn btn-primary btn-block" disabled={isLoading}>Reset</button>
                    </div>
                </form>
            </React.Fragment>
        )
    }
}

ResetPasswordForm.propTypes = {
    submit: PropTypes.func.isRequired
}

export default ResetPasswordForm;
