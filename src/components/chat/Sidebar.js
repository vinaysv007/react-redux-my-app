import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Sidebar = ({ users }) => {
    return (
        <aside className="sidebar">
            <ul>
                {users && users.map(user => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
        </aside>
    )
}
const mapStateToProps = (state) => ({
    users: state.chatUsers
});

const mapDispatchToProps = {

}

Sidebar.proptypes = {
    users: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            id: PropTypes.number.isRequired
        }).isRequired
    ).isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);