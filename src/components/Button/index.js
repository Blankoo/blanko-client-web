import React from 'react'
import PropTypes from 'prop-types'

// Styles
import './Button.scss'

const Button = (props) => {
    const {
        text,
        variant,
        size,
        value,
        isDisabled,
        isFullWidth,
        onClick
    } = props

    return (
        <button
            className={`button ${variant} ${size} ${isFullWidth ? 'full-width' : ''}`}
            disabled={isDisabled}
            onClick={onClick}
            type="button"
            value={value}
        >{text}</button>
    )
}

Button.propTypes = {
    text: PropTypes.string,
    variant: PropTypes.string,
    size: PropTypes.string,
    value: PropTypes.string,
    onClick: PropTypes.func,
    isDisabled: PropTypes.bool,
    isFullWidth: PropTypes.bool,
    isLoading: PropTypes.bool
}

Button.defaultProps = {
    variant: 'primary',
    size: 'md'
}

export default Button
