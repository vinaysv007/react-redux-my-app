import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const TextField = ({ label, type, value, onChange, name, error, checkUserExists }) => {
    return (
        <div className="form-group" >
            <label className="form-control-label" htmlFor={label}>{label}</label>
            <input type={type}
                value={value}
                onChange={onChange}
                onBlur={checkUserExists}
                name={name}
                className={classnames("form-control", { "is-invalid": error })} />
            {error && <span className="invalid-feedback">{error}</span>}
        </div>
    )
}

TextField.prototype = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    error: PropTypes.string
}

TextField.defaultProps = {
    type: 'text'
}

export default TextField;
