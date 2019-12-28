import React, { useState } from 'react'
import { time } from '../../utils'

const { secondsToHourMinuteSecond, getFormattedDate } = time

function SingleMeasurment(props) {
  const { total, endTime } = props
  const [isShown, setIsShown] = useState(false)

  return (
    <div className="single-measurement">
      <span
        className="date"
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
      >
        {
          isShown
            ? getFormattedDate(new Date(endTime))
            : 'Measurement'
        }
      </span>
      <span className="mono">{secondsToHourMinuteSecond(total / 1000)}</span>
    </div>
  )
}

export default SingleMeasurment
