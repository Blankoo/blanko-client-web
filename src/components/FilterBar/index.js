import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Components
import Button from '../Button'
import Input from '../Input'

// Styles
import './FilterBar.scss'

class FilterBar extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    const { isSticky } = this.props

    return (
      <div className={`filter-bar ${isSticky ? 'sticky' : ''}`}>
        <span className="add-project-button">
          <img src={require('../../assets/icons/plus.svg')} alt="Add task" />
        </span>

        <Button
          text="All"
          size="md"
          variant="primary"
        />

        <Button
          text="To do"
          size="md"
          variant="secondary"
        />

        <Button
          text="Done"
          size="md"
          variant="secondary"
        />

        <div className="search" style={{ marginRight: 8 }}>
          <Input placeholder="Zoeken" icon="glass" />
        </div>

        <Input label="Label here" placeholder="Zoeken" />
      </div>
    )
  }
}

FilterBar.propTypes = {
  isSticky: PropTypes.bool
}

export default FilterBar
