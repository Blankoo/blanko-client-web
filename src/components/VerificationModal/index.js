import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import { toggleModal, dispatchAction } from '../../actions'

// Components
import Button from '../Button'

function VerificationModal(props) {
  const { isShown, toggleModal, title, modalAction, dispatchAction } = props

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
              if (modalAction === 'DELETE_PROJECT') {
                  props.history.push('/home')
              }
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

const mapStateToProps = ({ projectReducer }) => ({
  isShown: projectReducer.isVerificationShown,
  modalAction: projectReducer.modalAction
})

export default withRouter(connect(mapStateToProps, { toggleModal, dispatchAction })(VerificationModal))
