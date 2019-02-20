import React from 'react'
import PropTypes from 'prop-types'

// Styles
import './Button.scss'

const Button = ({
  text,
  variant,
  size,
  isDisabled,
  isFullWidth,
  onClick
}) => (
  <button
    className={`button ${variant} ${size} ${isFullWidth ? 'full-width' : ''}`}
    disabled={isDisabled}
    onClick={onClick}
    type="button"
  >
    {text}
  </button>
)

Button.propTypes = {
  text: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  isDisabled: PropTypes.bool,
  isFullWidth: PropTypes.bool
}

Button.defaultProps = {
  variant: 'primary',
  size: 'md'
}



export default Button
