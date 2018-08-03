import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ForgotPasswordForm from '../forms/ForgotPasswordForm';
import { forgotPasswordRequest } from '../../actions/Auth';

export class ForgotPasswordPage extends Component {
    state = {
        success: false
    }

    submit = (data) => {
        this.props.forgotPasswordRequest(data);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.response) {
            this.setState({ success: true });
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xs-12 col-sm-8 col-lg-6">
                        <div className="card">
                            <h2 className="card-header">Recover Password</h2>
                            <div className="card-body">
                                {this.state.success ? (<div className="alert alert-info">Email has been sent to your mail id.</div>) :
                                    (<ForgotPasswordForm submit={this.submit.bind(this)} errors={this.props.errors} />)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    errors: state.forgotPwd.errors,
    response: state.forgotPwd.response
})

const mapDispatchToProps = {
    forgotPasswordRequest
}

ForgotPasswordPage.propTypes = {
    forgotPasswordRequest: PropTypes.func.isRequired,
    errors: PropTypes.object,
    response: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordPage)
