import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import useInput from '../Input'
import Button from '../Button'
import { addNewTimeMeasurement } from '../../actions'

import { time } from './../../utils'
const { hoursToSeconds, minutesToSeconds } = time

function NewMeasurement(props) {
    const { addNewTimeMeasurement, toggleIsAddNewMeasurementShown } = props
    const container = useRef()

    const [hourInput, hourInputField] = useInput({ type: 'number', placeholder: 'hour' })
    const [minuteInput, minuteInputField] = useInput({ type: 'number', placeholder: 'minute' })

    const totalSeconds = (hoursToSeconds(hourInput > 0 ? hourInput : 0) + minutesToSeconds(minuteInput)) * 1000

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    })

    function handleClickOutside(e) {
        if (container && !container.current.contains(e.target)) {
            toggleIsAddNewMeasurementShown()
        }
    }

    function addMeasurement() {
        const { taskId, projectId } = props
        addNewTimeMeasurement(totalSeconds, taskId, projectId)
            .then(() => {
                toggleIsAddNewMeasurementShown()
            })
    }

    return (
        <div className="new-measurement-container" ref={container}>
            <div className="new-measurement-container-content">
                {hourInputField}
                <span className="colon">
                    <img src={require('../../assets/icons/colon.svg')} />
                </span>
                {minuteInputField}

                <Button text="Add" onClick={addMeasurement} />
            </div>
        </div>
    )
}

function mapStateToProps({ projectReducer }) {
    return {
        taskId: projectReducer.activeTask._id,
        projectId: projectReducer.activeTask.projectId,
    }
}

export default connect(mapStateToProps, { addNewTimeMeasurement })(NewMeasurement)
