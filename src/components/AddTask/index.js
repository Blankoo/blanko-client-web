import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addTask } from '../../actions'

// Components
// import Button from '../Button'
import Input from '../Input'

// Styles
import './AddTask.scss'

class AddTask extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      title: '',
      subTitle: '',
    }
  }

  setInputState = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  addLocalTask = () => {
    const { title } = this.state
    const { activeProjectId, addTask, tasksLength } = this.props

    const newTask = {
      ...this.state,
      order: tasksLength
    }

    if (title.length > 1) {
      addTask(newTask, activeProjectId)
      this.setState({
        title: '',
        subTitle: ''
      })
    }
  }

  render() {
    const { title, subTitle } = this.state

    return (
      <div className="task-small add-task" onKeyUp={e => e.key === 'Enter' && this.addLocalTask()}>
        <Input
          type="text"
          id="title"
          value={title}
          onChange={this.setInputState}
        />
      </div>
    )
  }
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
