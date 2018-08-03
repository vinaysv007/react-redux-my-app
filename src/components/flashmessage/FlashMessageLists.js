import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FlashMessage from './FlashMessage';
import { deleteFlashMessage } from '../../actions/FlashMessage'
import { bindActionCreators } from 'redux';

class FlashMessageLists extends Component {
    render() {
        const { deleteFlashMessage } = this.props;
        const messages = this.props.messages.map(message =>
            <FlashMessage key={message.id} message={message} deleteFlashMessage={deleteFlashMessage} />
        );
        return (
            <div>
                {messages}
            </div>
        )
    }
}

FlashMessageLists.propTypes = {
    messages: PropTypes.array.isRequired,
    deleteFlashMessage: PropTypes.func.isRequired
}
const mapStateToProps = state => {
    return {
        messages: state.flashMessages
    }
}

const mapDispatchToProps = dispatch =>
    bindActionCreators({ deleteFlashMessage }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(FlashMessageLists)
