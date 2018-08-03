import React from 'react';
import PropTypes from 'prop-types';

const Message = ({ message, name }) => {
    if (message === '') return null;
    return (
        <p>
            <i>{name}</i>: {message}
        </p>
    )
}

Message.proptypes = {
    message: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
}

export default Message;