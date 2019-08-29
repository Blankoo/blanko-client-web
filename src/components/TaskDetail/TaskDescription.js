import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { updateTask } from '../../actions'

import Button from '../Button'
import { ReadStream } from 'tty';

const INIT_ROW_HEIGHT = 5
const autoExpandTextarea = areaNode => areaNode.current.value.split('\n').length + (INIT_ROW_HEIGHT - 1)

function TaskDescription(props) {
  const { updateTask, currentDescription } = props
  const [ description, setDescription ] = useState('')
  const [ textAreaRowAmount, setTextAreaRowAmount] = useState(INIT_ROW_HEIGHT)
  const areaRef = useRef()

  useEffect(() => {
    setDescription(currentDescription)
    setTimeout(() => {
      setTextAreaRowAmount(
        autoExpandTextarea(areaRef)
      )
    }, 10)
  }, [currentDescription])

  return (
    <>
      <div className="task-description">
        <span className="label">Description:</span>
        <textarea
          value={description}
          rows={textAreaRowAmount}
          ref={areaRef}
          onChange={e => {
            setDescription(e.target.value)
            setTextAreaRowAmount(autoExpandTextarea(areaRef))
          }}
        />

      { currentDescription !== description &&
        <Button
          text="Save"
          onClick={() => {
            updateTask({ subTitle: description })
          }}
        />
      }
      </div>
    </>
  )
}

export default connect(null, { updateTask })(TaskDescription)
