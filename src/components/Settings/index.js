import React from 'react'
import './Settings.scss'

function Settings(props) {
  return (
    <div className="home-container ">
      <span onClick={() => window.history.back() }>Back</span> <br/>
        Settings page
    </div>
  )
}


export default Settings
