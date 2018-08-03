import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class NavigationBar extends React.Component {
    render() {
        const { isAuthenticated } = this.props;

        const userLinks = (
            <ul className="nav navbar-nav ml-auto">
                <li className="nav-item">
                    <NavLink to="/logout" className="nav-link">Logout</NavLink>
                </li>
            </ul>
        )

        const guestLinks = (
            <ul className="nav navbar-nav ml-auto">
                <li className="nav-item">
                    <NavLink to="/signup" className="nav-link">Sign Up</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/login" className="nav-link">Login</NavLink>
                </li>
            </ul>
        );

        const userMenu = (
            <ul className="navbar-nav">
                <li className="nav-item active">
                    <NavLink to="/dashboard" className="nav-link">Dashboard</NavLink>
                </li>
            </ul>
        )

        return (
            <React.Fragment>
                <nav className="navbar navbar-expand-md navbar-light bg-light stick-top">
                    <div className="container-fluid">
                        <h1 className="navbar-brand mb-0">VeviStudio</h1>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarResponsive">
                            <ul className="navbar-nav">
                                <li className="nav-item active">
                                    <NavLink to="/" className="nav-link">Home</NavLink>
                                </li>
                                {isAuthenticated ? userMenu : null}
                            </ul>
                            {isAuthenticated ? userLinks : guestLinks}
                        </div>
                    </div>
                </nav>
            </React.Fragment>
        )
    }
}

NavigationBar.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    user: PropTypes.object
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.login.isAuthenticated,
    user: state.login.user
})

export default connect(mapStateToProps, null)(NavigationBar);
