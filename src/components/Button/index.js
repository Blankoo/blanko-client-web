import React from 'react'
import PropTypes from 'prop-types'

// Styles
import './Button.scss'

const Button = ({
	text,
	variant,
	size,
	disabled,
	fullWidth,
	onClick
}) => (
		<button
			className={`button ${variant} ${size} ${fullWidth ? 'full-width' : ''}`}
			disabled={disabled}
			onClick={onClick}
		>
			{text}
		</button>
	)

Button.defaultProps = {
	text: 'Button',
	variant: 'primary',
	size: 'md'
}

Button.propTypes = {
	text: PropTypes.string.isRequired,
	variant: PropTypes.string.isRequired,
	size: PropTypes.string.isRequired,
	onClick: PropTypes.func
}

export default Button
