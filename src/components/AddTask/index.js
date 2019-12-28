import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addTask } from '../../actions'

// Components
// import Button from '../Button'
// import Input from '../Input'
import useInput from '../Input'

// Styles
import './AddTask.scss'

function AddTask(props) {
    const { activeProjectId, addTask, tasksLength } = props
    const [title, titleField, setTitle] = useInput('')

    function addLocalTask() {
        const newTask = {
            title,
            order: tasksLength
        }

        if (title.length > 1) {
            addTask(newTask, activeProjectId)
                .then(() => {
                    console.log('task added')
                    setTitle('')
                })
        }
    }

    return (
        <div className="task-small add-task" onKeyUp={(e) => e.key === 'Enter' && addLocalTask()}>
            {titleField}
        </div>
    )
}

AddTask.propTypes = {
    activeProjectId: PropTypes.string,
    addTask: PropTypes.func
}

const mapStateToProps = ({ projectReducer }) => ({
    activeProjectId: projectReducer.activeProjectId,
    tasksLength: projectReducer.tasks.length
})

export default connect(mapStateToProps, { addTask })(AddTask)
