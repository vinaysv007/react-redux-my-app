import React, { Component } from 'react';

class Dashboard extends Component {
    render() {
        return (
            <div>
                <a href="/chat" className="btn btn-primary btn-lg active" role="button" aria-pressed="true">Chat App</a>
            </div>
        )
    }
}
export default Dashboard;