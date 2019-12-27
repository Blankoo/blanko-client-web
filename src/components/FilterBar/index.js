import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { time } from '../../utils'
import { fetchTasks } from '../../actions'

// Components
import useInput from '../Input'

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

    const [startDate, startDateField, setStartDateValue] = useInput({ type: 'date', label: 'Start date' })
    const [endDate, endDateField, setEndDateValue] = useInput({ type: 'date', label: 'End date' })
    const [searchInput, searchInputField] = useInput({ label: 'Search'})

    useEffect(() => {
        handleTaskSearch(searchInput)
    }, [searchInput])

    useEffect(() => {
        const initStartDateValue = getFormattedDate(new Date(project.createdAt))
        const initEndDatevalue = getFormattedDate(new Date())
        setStartDateValue(initStartDateValue)
        setEndDateValue(initEndDatevalue)
    }, [project])

    useEffect(() => {
        const filter = {
            startDate: new Date(startDate).getTime(),
            endDate: new Date(endDate).getTime()
        }
        fetchTasks(project._id, filter)
    }, [project, startDate, endDate])

    return (
        <div className={`filter-bar ${isSticky ? 'sticky' : ''}`}>
            {startDateField}
            {endDateField}
            {window.innerWidth > 400 && searchInputField}
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
