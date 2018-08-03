import React, { Component } from 'react';
import TextField from '../common/TextField';
import PropTypes from 'prop-types'

class EventForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            errors: {},
            isLoading: false
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.createEvent(this.state);
    }

    render() {
        const { title, errors, isLoading } = this.state;
        return (
            <React.Fragment>
                <form onSubmit={this.onSubmit}>
                    <h1>Create a new event</h1>
                    <TextField
                        label='Event Title'
                        value={title}
                        onChange={this.onChange}
                        name="title"
                        error={errors.title}
                    />
                    <div className="form-group">
                        <button className="btn btn-primary btn-lg" disabled={isLoading}>Create</button>
                    </div>
                </form>
            </React.Fragment>
        )
    }
}

EventForm.propTypes = {
    createEvent: PropTypes.func.isRequired
}

export default EventForm;