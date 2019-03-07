import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// Components
import Button from '../Button'
import Input from '../Input'

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
    const { projectTitle, projectDescription } = this.state

    return isShown && (
      <div className="add-project-modal">
        <div className="modal-wrapper">
          <Input id="projectTitle" label="Project Title" onChange={this.onChange} />

          <Input id="projectDescription" label="Description" onChange={this.onChange} />

          <div className="modal-wrapper-buttons">
            <Button
              onClick={toggleAddProjectModal}
              variant="secondary"
              text="Cancel"
              size="md"
            />

            <Button
              onClick={() => addProject(this.state)}
              variant="primary"
              text="Save"
              isDisabled={projectTitle === ''}
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
