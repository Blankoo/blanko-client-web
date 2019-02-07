import React, { Component } from 'react'

// Components
import Button from '../Button'

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
      </div>
    )
  }
}

export default FilterBar
