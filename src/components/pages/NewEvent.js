import React, { Component } from 'react';
import EventForm from '../forms/EventForm';
import { connect } from 'react-redux';
import { createEvent } from '../../actions';
import PropTypes from 'prop-types'

class NewEvent extends Component {
    render() {
        const { createEvent } = this.props;
        return (
            <React.Fragment>
                <EventForm createEvent={createEvent} />
            </React.Fragment>
        )
    }
}

NewEvent.propTypes = {
    createEvent: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {
    createEvent
}

export default connect(mapStateToProps, mapDispatchToProps)(NewEvent);