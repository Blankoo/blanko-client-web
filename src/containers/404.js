import React, { Component } from 'react'
import SadFace from '../assets/sad-face'

class Error extends Component {
  render() {
    return (
			<>
				<h1>404 not found</h1>
				<SadFace/>
			</>
    )
  }
}

export default Error
