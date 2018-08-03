import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../../actions/Auth';

class Logout extends Component {
    componentWillMount() {
        this.props.logout();
    }

    componentWillReceiveProps(newProps) {
        if (!newProps.isAuthenticated) {
            this.props.history.push('/');
        }
    }

    render() {
        return null
    }
}

Logout.propTypes = {
    logout: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.login.isAuthenticated
})

const mapDispatchToProps = {
    logout
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout)
