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
    const {
      isSticky,
      handleTaskSearch,
      handleTaskStatusFilter,
      filterStatus
    } = this.props

    const filterButtons = [
      {
        text: 'All',
        value: 'ALL',
      },
      {
        text: 'To do',
        value: 'TODO',
      },
      {
        text: 'Done',
        value: 'DONE',
      }
    ]

    return (
      <div className={`filter-bar ${isSticky ? 'sticky' : ''}`}>
        <span className="add-project-button">
          <img src={require('../../assets/icons/plus.svg')} alt="Add task" />
        </span>

        {
          filterButtons.map(({ text, value }, idx) => (
            <Button
              text={text}
              size="md"
              value={value}
              variant={value === filterStatus ? 'primary' : 'secondary'}
              onClick={handleTaskStatusFilter}
              key={idx}
            />
          ))
        }

        <Input placeholder="Search" icon="glass" onChange={handleTaskSearch} />
      </div>
    )
  }
}

FilterBar.propTypes = {
  isSticky: PropTypes.bool,
  handleTaskSearch: PropTypes.func,
  handleTaskStatusFilter: PropTypes.func,
  filterStatus: PropTypes.string
}

export default FilterBar
