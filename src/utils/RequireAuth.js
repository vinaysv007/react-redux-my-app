import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addFlashMessage } from '../actions/FlashMessage';
import { withRouter } from 'react-router-dom';

export default (ComposedComponent) => {
    class RequireAuth extends Component {
        componentWillMount() {
            if (!this.props.isAuthenticated) {
                this.props.addFlashMessage({
                    type: 'error',
                    message: 'You must login.'
                });
                this.props.history.push('/login');
            }
        }

        render() {
            return (
                <ComposedComponent {...this.props} />
            )
        }
    }

    const mapStateToProps = (state) => ({
        isAuthenticated: state.login.isAuthenticated,
    })

    const mapDispatchToProps = {
        addFlashMessage
    }

    RequireAuth.propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
        addFlashMessage: PropTypes.func.isRequired
    }

    return withRouter(connect(mapStateToProps, mapDispatchToProps)(RequireAuth));
}
