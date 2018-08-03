import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { validateTokenRequest, resetPasswordRequest } from '../../actions/Auth';
import ResetPasswordForm from '../forms/ResetPasswordForm';

class ResetPasswordPage extends Component {
    state = {
        loading: true,
        success: false,
    }
    componentDidMount() {
        this.props.validateTokenRequest(this.props.match.params.token);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.tokenError) {
            this.setState({ loading: false, success: false });
        }

        if (nextProps.tokenValid) {
            this.setState({ loading: false, success: true });
        }

        if (nextProps.response) {
            this.props.history.push('/login');
        }
    }

    submit = (data) => {
        let newData = {};
        newData.password = data.password;
        newData.passwordConfirmation = data.passwordConfirmation;
        newData.token = data.token;

        this.props.resetPasswordRequest(newData);
    }

    render() {
        const { loading, success } = this.state;
        const token = this.props.match.params.token;
        return (
            <React.Fragment>
                {loading && <p>Loading....</p>}
                {!loading && success && (
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-xs-12 col-sm-8 col-lg-6">
                                <div className="card">
                                    <div className="card-body">
                                        <ResetPasswordForm submit={this.submit} token={token} errors={this.props.errors} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {!loading && !success && (
                    <div className="alert alert-danger">
                        Invalid Token. Try to{" "}
                        <NavLink to="/forgotpassword">recover password</NavLink>{" "}
                        again.
                    </div>
                )}
            </React.Fragment>
        )
    }
}

ResetPasswordPage.propTypes = {
    validateTokenRequest: PropTypes.func.isRequired,
    resetPasswordRequest: PropTypes.func.isRequired,
    match: PropTypes.shape({
        params: PropTypes.shape({
            token: PropTypes.string.isRequired
        }).isRequired
    }).isRequired,
    tokenError: PropTypes.object,
    tokenValid: PropTypes.object,
    response: PropTypes.object,
    errors: PropTypes.object,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
}

const mapStateToProps = (state) => ({
    tokenError: state.forgotPwd.tokenError,
    tokenValid: state.forgotPwd.tokenValid,
    response: state.resetPwd.response,
    errors: state.resetPwd.errors
})

const mapDispatchToProps = {
    validateTokenRequest,
    resetPasswordRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordPage);
