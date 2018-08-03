import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addMessage } from '../../actions/Chat';

class AddMessage extends React.Component {
    state = {
        message: ''
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.props.addMessage(this.state.message, 'Me', this.props.user.username);
            this.setState({ message: '' });
        }
    }

    render() {
        const { message } = this.state;
        return (
            <section className="newMessage">
                <input
                    type="text"
                    name="message"
                    value={message}
                    onChange={this.onChange}
                    onKeyPress={this.handleKeyPress}
                />
            </section>
        )
    }
}

AddMessage.propTypes = {
    addMessage: PropTypes.func.isRequired,
    message: PropTypes.string,
    user: PropTypes.object
}

const mapStateToProps = (state) => ({
    user: state.login.user
})

const mapDispatchToProps = {
    addMessage
}

export default connect(mapStateToProps, mapDispatchToProps)(AddMessage);