import React, { Component } from 'react';
import SignUpForm from '../forms/SignUpForm';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userSignUpRequest, checkUserExists } from '../../actions/User';
import { addFlashMessage } from '../../actions/FlashMessage';

class SignUpPage extends Component {
    render() {
        const { errors, response, userSignUpRequest, addFlashMessage, checkUserExists, userExistResponse, errorExistResponse } = this.props;
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <h2 className="card-header">Join the Club!</h2>
                            <div className="card-body">
                                <SignUpForm
                                    checkUserExists={checkUserExists}
                                    userSignUpRequest={userSignUpRequest}
                                    addFlashMessage={addFlashMessage}
                                    response={response}
                                    errors={errors}
                                    userExistResponse={userExistResponse}
                                    errorExistResponse={errorExistResponse} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

SignUpPage.propTypes = {
    userSignUpRequest: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    errors: PropTypes.object,
    response: PropTypes.object,
    userExistResponse: PropTypes.object,
    errorExistResponse: PropTypes.object
}

const mapStateToProps = state => {
    return {
        response: state.signUp.responseData,
        errors: state.signUp.errorData,
        userExistResponse: state.signUp.existData,
        errorExistResponse: state.signUp.existError
    }
}

const mapDispatchToProps = dispatch =>
    bindActionCreators({ userSignUpRequest, addFlashMessage, checkUserExists }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);