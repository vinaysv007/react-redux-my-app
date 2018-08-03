import React, { Component } from 'react';
import Proptypes from 'prop-types';
import classnames from 'classnames';

class FlashMessage extends Component {

    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    onClick = () => {
        this.props.deleteFlashMessage(this.props.message.id);
    }

    componentWillUnmount() {
        console.log('i am in unmounting..........');
        this.props = null;
    }

    render() {
        const { type, message } = this.props.message;

        if (message === '') {
            return null
        }
        return (
            <div className={classnames('alert', {
                'alert-success': type === 'success',
                'alert-danger': type === 'error'
            })}>
                <button type="button" className="close" aria-label="Close" onClick={this.onClick}>
                    <span aria-hidden="true">&times;</span>
                </button>
                {message}
            </div>
        );
    }
}

FlashMessage.propTypes = {
    message: Proptypes.object.isRequired,
    deleteFlashMessage: Proptypes.func.isRequired
}

export default FlashMessage;