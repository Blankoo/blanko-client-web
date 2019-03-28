import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { updateTask } from '../../actions'

function TaskDescription(props) {
  const { updateTask, currentDescription } = props
  const [description, setDescription] = useState('')

  useEffect(() => {
    setDescription(currentDescription)
  }, [currentDescription])

  return (
    <div className="task-description">
      <span className="label">Description:</span>
      <textarea onChange={e => setDescription(e.target.value) } value={description}/>
      <button onClick={() => updateTask({
        subTitle: description
      }) }>Save</button>
    </div>
  )
}

export default connect(null, { updateTask })(TaskDescription)
