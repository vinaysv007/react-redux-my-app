import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Sidebar from './Sidebar';
import AddMessage from './AddMessage';
import MessagesList from './MessagesList';
import { initSocketConnection, endSocketConnection } from '../../actions/Chat';

class ChatPage extends Component {
    componentDidMount() {
        this.props.initSocketConnection(this.props.user.username);
    }

    componentWillUnmount(){
        this.props.endSocketConnection();
    }
    render() {
        return (
            <div className="chatContainer">
                <Sidebar />
                <section id="main">
                    <AddMessage />
                    <MessagesList />
                </section>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.login.user
})

const mapDispatchToProps = {
    initSocketConnection,
    endSocketConnection
}

ChatPage.proptypes = {
    initSocketConnection: PropTypes.func.isRequired,
    endSocketConnection: PropTypes.func.isRequired,
    user: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);