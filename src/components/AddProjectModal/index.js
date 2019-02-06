import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// Styles
import './AddProjectModal.scss'

class AddProjectModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      projectTitle: '',
      projectDescription: ''
    }
  }

  onChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  render() {
    const { toggleAddProjectModal, isShown, addProject } = this.props

    /* TODO: Replace button with Button component */

    return isShown && (
      <div className="add-project-modal">
        <div>
          <div onClick={toggleAddProjectModal}>X</div>
          <div>
            <label htmlFor="projectTitle">Project Title</label>
            <input id="projectTitle" onChange={this.onChange} />

            <label>Description</label>
            <input id="projectDescription" onChange={this.onChange} />

            <button onClick={toggleAddProjectModal}>Cancel</button>
            <button onClick={() => addProject(this.state)}>Add project</button>
          </div>
        </div>
      </div>
    )
  }
}

AddProjectModal.propTypes = {
  toggleAddProjectModal: PropTypes.func,
  isShown: PropTypes.bool,
  addProject: PropTypes.func
}

const mapStateToProps = ({ projectReducer }) => ({
  isShown: projectReducer.isAddProjectShown
})

export default connect(mapStateToProps)(AddProjectModal)
