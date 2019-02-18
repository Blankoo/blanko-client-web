import React from 'react'
import {
  secondsToHourMinuteSecond,
  totalInSeconds
} from './actions'

const SingleMeasurment = (meas) => {
  return (
    <div>
      { secondsToHourMinuteSecond(meas.total / 1000) }
    </div>
  )
}


export default SingleMeasurment

// start = 1550511484781
// end = 1550511526983
// 1550511526983 - 1550511484781

