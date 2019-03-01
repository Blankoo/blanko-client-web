import React from 'react'
import { secondsToHourMinuteSecond } from './actions'

const SingleMeasurment = ({ total }) => (
  <div className="single-measurement">
    <span>Measurement:</span>
    <span>{ secondsToHourMinuteSecond(total / 1000) }</span>
  </div>
)


export default SingleMeasurment

// start = 1550511484781
// end = 1550511526983
// 1550511526983 - 1550511484781
