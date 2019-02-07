import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// Components
import Button from '../Button'

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

    return isShown && (
      <div className="add-project-modal">
        <div>
          <div onClick={toggleAddProjectModal}>X</div>
          <div>
            <label htmlFor="projectTitle">Project Title</label>
            <input id="projectTitle" onChange={this.onChange} />

            <label>Description</label>
            <input id="projectDescription" onChange={this.onChange} />

            <Button
              onClick={toggleAddProjectModal}
              variant="secondary"
              text="Cancel"
              size="md"
            />

            <Button
              onClick={() => addProject(this.state)}
              variant="secondary"
              text="Add project"
              size="md"
            />
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
