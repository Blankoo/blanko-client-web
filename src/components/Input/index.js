import React, { useState } from 'react'
import PropTypes from 'prop-types'

// Styles
import './Input.scss'

function useInput(props = {}) {
    const {
        icon,
        placeholder,
        type,
        label,
        id,
        defaultValue
    } = props
    const [value, setValue] = useState(defaultValue)

    const inputField = <div className="input">
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
                value={value}
                name={id}
                id={id}
                type={type}
                placeholder={placeholder}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    </div>

    return [value, inputField, setValue]
}

useInput.defaultProps = {
    type: 'text'
}

useInput.propTypes = {
    icon: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func,
    id: PropTypes.string
}

export default useInput
