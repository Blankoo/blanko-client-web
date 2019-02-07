import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addTask } from '../../actions'

// Components
import Button from '../Button'

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
    const { activeProjectId, addTask } = this.props

    if (title.length > 1) {
      addTask(this.state, activeProjectId)
      this.setState({
        title: '',
        subTitle: ''
      })
    }
  }

  render() {
    const { title, subTitle } = this.state

    /* TODO: Replace button with Button component */

    return (
      <div>
        <input
          type="text"
          id="title"
          value={title}
          onChange={e => this.setInputState(e)}
        />

        <input
          type="text"
          id="subTitle"
          value={subTitle}
          onChange={e => this.setInputState(e)}
        />

        <Button
          onClick={this.addLocalTask}
          text="Add Task"
          variant="secondary"
          size="md"
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
  activeProjectId: projectReducer.activeProjectId
})

export default connect(mapStateToProps, { addTask })(AddTask)
