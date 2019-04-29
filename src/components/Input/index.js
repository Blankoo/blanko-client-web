import React from 'react'
import PropTypes from 'prop-types'

// Styles
import './Input.scss'

function Input(props){
  const {
    icon,
    placeholder,
    type,
    label,
    onChange,
    id,
    value
  } = props

  return (
    <div className="input">
      {
        label && <label htmlFor={id} className="label">{label}</label>
      }

      <div className="input-wrapper">
        {
          icon && (
            <span className="icon">
              <img src={require(`../../assets/icons/${icon}.svg`)} alt={icon} />
            </span>
          )
        }

        <input
          name={id}
          id={id}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
        />
      </div>
    </div>
  )
}

Input.defaultProps = {
  type: 'text'
}

Input.propTypes = {
  icon: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  id: PropTypes.string
}

export default Input
