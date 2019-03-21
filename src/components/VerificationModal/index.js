import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { toggleModal, dispatchAction } from '../../actions'

// Components
import Button from '../Button'

class VerificationModal extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { isShown, toggleModal, title, modalAction, dispatchAction } = this.props
    console.log({ modalAction })

    return isShown && (
      <div className="modal add-project">
        <div className="modal-wrapper">
          <h1>{ title }</h1>
          <div className="modal-wrapper-buttons">

            <Button
              onClick={() => toggleModal('isVerificationShown', false)}
              variant="secondary"
              text="Cancel"
              size="md"
            />

            <Button
              onClick={() => {
                toggleModal('isVerificationShown', false)
                dispatchAction(modalAction)
              }}
              variant="danger"
              text="I'm sure"
              size="md"
            />

          </div>
        </div>
      </div>
    )
  }
}

VerificationModal.propTypes = {
  toggleVerificationModal: PropTypes.func,
  isShown: PropTypes.bool,
  addProject: PropTypes.func
}

const mapStateToProps = ({ projectReducer }) => ({
  isShown: projectReducer.isVerificationShown,
  modalAction: projectReducer.modalAction
})

export default connect(mapStateToProps, { toggleModal, dispatchAction })(VerificationModal)
