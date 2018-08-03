import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import LoginForm from '../forms/LoginForm';
import { loginRequest } from '../../actions/Auth';

class LoginPage extends Component {
    render() {
        const { loginRequest, response, errors, messages, isAuthenticated } = this.props;
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xs-12 col-sm-8 col-lg-6">
                        <div className="card">
                            <h2 className="card-header">Login Here</h2>
                            <div className="card-body">
                                <LoginForm
                                    loginRequest={loginRequest}
                                    response={response}
                                    errors={errors}
                                    messages={messages}
                                    isAuthenticated = {isAuthenticated}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

LoginPage.propTypes = {
    loginRequest: PropTypes.func.isRequired,
    response: PropTypes.object,
    error: PropTypes.object,
    isAuthenticated:PropTypes.bool
}

const mapStateToProps = (state) => ({
    response: state.login.response,
    errors: state.login.error,
    messages: state.flashMessages,
    isAuthenticated: state.login.isAuthenticated
})

const mapDispatchToProps = dispatch =>
    bindActionCreators({ loginRequest }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);