import React from 'react'
import { secondsToHourMinuteSecond } from './measurementActions'

const SingleMeasurment = ({ total }) => (
  <div className="single-measurement">
    <span>Measurement:</span>
    <span className="mono">{ secondsToHourMinuteSecond(total / 1000) }</span>
  </div>
)


export default SingleMeasurment
