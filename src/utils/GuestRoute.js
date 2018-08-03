import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

const GuestRoute = ({ isAuthenticated, component: Component, ...rest }) => {
    return (
        <Route {...rest} render={props =>
            !isAuthenticated ? <Component {...props} /> : <Redirect to="/dashboard" />} />
    )
}

GuestRoute.propTypes = {
    component: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.login.isAuthenticated,
})

export default connect(mapStateToProps, null)(GuestRoute);