import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { time } from '../../utils'
import { fetchTasks } from '../../actions'

// Components
import Input from '../Input'

// Styles
import './FilterBar.scss'

const { getFormattedDate } = time

function FilterBar(props) {
    const {
        isSticky,
        handleTaskSearch,
        project,
        fetchTasks
    } = props

    const [startDate, setStartDate] = useState(getFormattedDate(new Date(project.createdAt)))
    const [endDate, setEndDate] = useState(undefined)

    useEffect(() => {
        const filter = {
            startDate: new Date(startDate).getTime(),
            endDate: new Date(endDate).getTime()
        }

        if (endDate !== undefined) {
            fetchTasks(project._id, filter)
        }
    }, [startDate, endDate, project])

    function getDate(e) {
        if (e.target.id === 'startDate') {
            setStartDate(e.target.value)
        } else if (e.target.id === 'endDate') {
            setEndDate(e.target.value)
        }
    }

    return (
        <div className={`filter-bar ${isSticky ? 'sticky' : ''}`}>
            {
                ['startDate', 'endDate'].map((inputType) => (
                    <Input
                        label={inputType}
                        key={inputType}
                        id={inputType}
                        type="date"
                        onChange={getDate}
                        defaultValue={
                            inputType === 'startDate' ? getFormattedDate(new Date(project.createdAt)) : ''
                        }
                    />
                ))
            }

            {window.innerWidth > 400 && <Input label="Search" icon="glass" onChange={handleTaskSearch} />}
        </div>
    )
}

FilterBar.propTypes = {
    isSticky: PropTypes.bool,
    handleTaskSearch: PropTypes.func,
    handleTaskStatusFilter: PropTypes.func,
    filterStatus: PropTypes.string
}

function mapStateToProps({ projectReducer }) {
    return {
        project: projectReducer.activeProject
    }
}

export default connect(mapStateToProps, { fetchTasks })(FilterBar)
