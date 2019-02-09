import React from 'react'
import { connect } from 'react-redux'

class TimeMeasuring extends React.Component {
	state = {
		isMeasuring: false,
		currenTime: null,
		startTime: null,
		endTime: null,
	}

	currenTime = () => new Date().getTime()

	startMeasurement = () => {
		this.setState({
			isMeasuring: true,
			startTime: this.currenTime()
		}, () => {
			this.setSpendedTimeValue()
			const inititalMeasurement = {
				startTime: this.currenTime(),
				isFinished: false
			}
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
    console.log('this interval: ', this.interval)
	}

	stopMeasurement = () => {
		this.setState({
			isMeasuring: false,
		}, () => {
			const inititalMeasurement = {
				endTime: this.currenTime(),
				isFinished: true
			}

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

		return (
			<div>
				time measuring
				<div>
					<button onClick={this.startMeasurement}>Start</button>
          <button onClick={this.stopMeasurement}>Stop</button>
					<br/><br/>
					<span className="numbers">
					{
						this.secondsToHourMinuteSecond(
							totalInSeconds(this.state.currenTime, this.state.startTime)
						)
					}
					</span>
				</div>
			</div>
		)
	}
}

export default TimeMeasuring
