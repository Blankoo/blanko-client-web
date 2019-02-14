import React from 'react'

const SingleMeasurment = (meas) => {
  console.log(meas)
  return (
    <div>
      {
        JSON.stringify(meas.total)
      }
    </div>
  )
}


export default SingleMeasurment
