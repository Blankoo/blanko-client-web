import React from 'react'
import { connect } from 'react-redux'

import {
  startTimeMeasurement,
  stopTimeMeasurement
} from '../../actions'

import SingleMeasurement from './SingleMeasurement'

class TimeMeasuring extends React.Component {
	state = {
		isMeasuring: false,
		currenTime: null,
		startTime: null,
		endTime: null,
	}

	currenTime = () => new Date().getTime()

	startMeasurement = taskId => {
		this.setState({
			isMeasuring: true,
			startTime: this.currenTime()
		}, () => {
			this.setSpendedTimeValue()
			const inititalMeasurement = {
				startTime: this.state.startTime,
      }
      this.props.startTimeMeasurement(taskId, inititalMeasurement)
		})
	}

	setSpendedTimeValue = () => {
		this.setState({
			currenTime: this.currenTime()
		})
		this.interval = setInterval(() => {
			this.setState({
				currenTime: this.currenTime()
			})
    }, 500)
	}

	stopMeasurement = taskId => {
		this.setState({
      isMeasuring: false,
      startTime: this.currenTime(),
      currenTime: this.currenTime()
		}, () => {
			const putMeasurement = {
				endTime: this.currenTime(),
				isFinished: true
			}
      this.props.stopTimeMeasurement(taskId, this.props.activeMeasurementId , putMeasurement)
			clearInterval(this.interval)
		})
	}

	secondsToHourMinuteSecond = totalSeconds => {
		const hour = Math.floor(totalSeconds / 3600)
		const minute = Math.floor(totalSeconds % 3600 / 60)
		const seconds = Math.floor(totalSeconds % 3600 % 60)

		return `${('0' + hour).slice(-2)}:${('0' + minute).slice(-2)}:${('0' + seconds).slice(-2)}`
	}

	render() {
		const totalInMiliSeconds = (endTime, startTime) => Math.floor(endTime - startTime)
		const totalInSeconds = (endTime, startTime) => Math.floor(totalInMiliSeconds(endTime, startTime) / 1000)
    // const totalMeasuredTime = this.props.measurements.reduce((zero, { total }) => zero + total, 0)
    const { activeTaskId, measurements } = this.props
    const { startTime, currenTime } = this.state

		return (
			<div>
				<div>
					<button onClick={() => this.startMeasurement(activeTaskId)}>Start</button>
          <button onClick={() => this.stopMeasurement(activeTaskId)}>Stop</button>
					<span className="numbers">
					{
						this.secondsToHourMinuteSecond(
							totalInSeconds(currenTime, startTime)
						)
					}
					</span>
				</div>

        <div>
          {
            measurements
              .filter(m => m.isFinished)
              .map((measurement, idx) => <SingleMeasurement {...measurement} key={idx}/>)
          }
        </div>
			</div>
		)
	}
}

function mapStateToProps({ projectReducer }) {
  return {
    activeTaskId: projectReducer.activeTask._id,
    measurements: projectReducer.measurements,
    activeMeasurementId: projectReducer.activeMeasurementId
  }
}

export default connect(mapStateToProps, { startTimeMeasurement, stopTimeMeasurement })(TimeMeasuring)
