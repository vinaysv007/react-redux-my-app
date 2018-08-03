import React, { Component } from 'react';
import TextField from '../common/TextField';
import PropTypes from 'prop-types';
import pwdRecoverValidator from '../../validator/RecoverPwd';

class ForgotPasswordForm extends Component {
    state = {
        errors: {},
        email: '',
        isLoading: false
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (this.isValid()) {
            this.setState({ errors: {}, isLoading: true });
            this.props.submit(this.state);
        }
    }

    isValid = () => {
        const { errors, isValid } = pwdRecoverValidator(this.state);

        if (!isValid) {
            this.setState({ errors: errors });
        }
        return isValid;
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.errors && nextProps.errors.data) {
            this.setState({ errors: nextProps.errors.data.errors, isLoading: false })
        }
    }

    render() {
        const { errors, email, isLoading } = this.state;
        return (
            <React.Fragment>
                <form onSubmit={this.onSubmit}>
                    {errors.global && <div className="alert alert-danger">{errors.global}</div>}
                    <TextField
                        label="Enter your registerd Email"
                        value={email}
                        onChange={this.onChange.bind(this)}
                        name="email"
                        error={errors.email}
                        type="email"
                    />
                    <div className="form-group">
                        <button className="btn btn-primary btn-block" disabled={isLoading}>Submit</button>
                    </div>
                </form>
            </React.Fragment>
        )
    }
}

ForgotPasswordForm.propTypes = {
    submit: PropTypes.func.isRequired
}

export default ForgotPasswordForm;