import React from 'react'
import './loading.scss'

function Loading(props) {
    const { small } = props
    return (
        <div className={`loading ${small ? 'small' : ''}`}>
            <div className="circle"></div>
            <div className="circle two"></div>
            <div className="circle three"></div>
        </div>
    )
}

export default Loading
