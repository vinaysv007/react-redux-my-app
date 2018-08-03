import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

const UserRoute = ({ isAuthenticated, component: Component, ...rest }) => {
    return (
        <Route {...rest} render={props =>
            isAuthenticated ? <Component {...props} /> : <Redirect to="/" />} />
    )
}

UserRoute.propTypes = {
    component: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.login.isAuthenticated,
})

export default connect(mapStateToProps, null)(UserRoute);