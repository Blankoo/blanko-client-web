import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Components
import Button from '../Button'
import Input from '../Input'

// Styles
import './FilterBar.scss'

function FilterBar(props) {
  const {
    isSticky,
    handleTaskSearch,
    handleTaskStatusFilter,
    filterStatus
  } = props

  const filterButtons = [
    {
      text: 'To do',
      value: 'TODO',
    },
    {
      text: 'Done',
      value: 'DONE',
    },
    {
      text: 'All',
      value: 'ALL',
    }
  ]

  return (
    <div className={`filter-bar ${isSticky ? 'sticky' : ''}`}>
      {/* {
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
      } */}

      { window.innerWidth > 400 && <Input placeholder="Search" icon="glass" onChange={handleTaskSearch} /> }
    </div>
  )
}

FilterBar.propTypes = {
  isSticky: PropTypes.bool,
  handleTaskSearch: PropTypes.func,
  handleTaskStatusFilter: PropTypes.func,
  filterStatus: PropTypes.string
}

export default FilterBar
