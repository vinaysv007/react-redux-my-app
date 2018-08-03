import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { confirmUserSignUp } from '../../actions/User';

class ConfirmPage extends Component {
    state = {
        isConfirmed: false,
        isLoading: true
    }

    componentDidMount() {
        this.props.confirmUserSignUp(this.props.match.params.token);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.confirmError) {
            this.setState({ isConfirmed: false, isLoading: false });
        }

        if (nextProps.confirmData) {
            this.setState({ isConfirmed: true, isLoading: false });
        }
    }

    render() {
        const { isConfirmed, isLoading } = this.state;
        return (
            <div className="container-fluid">
                {!isConfirmed && isLoading && (
                    <div className="alert alert-info" style={{ textAlign: 'center' }}>Validating account....</div>
                )}
                {isConfirmed && !isLoading && (
                    <div className="alert alert-success">Thank you!! Your account is verified successfully.. <a href="/dashboard">Goto Dashboard</a></div>
                )}
                {!isConfirmed && !isLoading && (
                    <div className="alert alert-danger" style={{ textAlign: 'center' }}>Invalid Token</div>
                )}
            </div>
        )
    }
}

ConfirmPage.propTypes = {
    confirmUserSignUp: PropTypes.func.isRequired,
    match: PropTypes.shape({
        params: PropTypes.shape({
            token: PropTypes.string.isRequired
        }).isRequired
    }).isRequired,
    confirmData: PropTypes.object,
    confirmError: PropTypes.object
}

const mapStateToProps = (state) => ({
    confirmData: state.signUp.confirmData,
    confirmError: state.signUp.confirmError
})

const mapDispatchToProps = {
    confirmUserSignUp
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmPage);