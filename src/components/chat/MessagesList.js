import React from 'react'
import Message from './Message';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const MessagesList = ({ messages }) => {
    return (
        <section className="listMessage">
            <ul>
                {messages.map(message => (
                    <Message key={message.id}
                        {...message}
                    />
                ))}
            </ul>
        </section>
    )
}

const mapStateToProps = (state) => ({
    messages: state.chatMessages
})

const mapDispatchToProps = {

}

MessagesList.proptypes = {
    messages: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            message: PropTypes.string.isRequired,
            id: PropTypes.number.isRequired
        }).isRequired
    ).isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesList);