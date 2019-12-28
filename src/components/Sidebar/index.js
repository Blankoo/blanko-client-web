import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { showSidebar } from '../../actions'

// Components
import ProjectsList from '../ProjectsList'

// Stlyes
import './Sidebar.scss'

function SideBar(props) {
    const {
        isSidebarShown,
        showSidebar,
        userId
    } = props

    function logout() {
        window.localStorage.removeItem('USER_TOK')
        window.localStorage.removeItem('PROJ_ID')
        window.location.reload()
    }

    return (
        <div className={`sidebar ${isSidebarShown ? 'open' : 'closed'}`}>
            {
                window.innerWidth < 400 &&
                <span className="close-sidebar" onClick={showSidebar}>
                    <img src={require('../../assets/icons/cross.svg')} alt="Close task detail" />
                </span>
            }

            <div className="blanko">Blanko.</div>
            <div className="blanko-small">B.</div>

            <ProjectsList isFavorite className="favorite" label="favorites" />
            <ProjectsList label="projects" />

            <div className="bottom-bar">
                {/* eslint-disable */}
                <span className="icon logout-icon" onClick={logout}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7A848F" strokeWidth="3" strokeLinecap="square" strokeLinejoin="arcs"><path d="M10 3H6a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h4M16 17l5-5-5-5M19.8 12H9" /></svg>
                </span>
                <Link to={`/settings`}>
                    <span className="icon settings-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7A848F" strokeWidth="3" strokeLinecap="square" strokeLinejoin="arcs"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                    </span>
                </Link>
                {/* eslint-enable */}
            </div>
        </div>
    )
}

const mapStateToProps = ({ projectReducer }) => ({
    projects: projectReducer.projects,
    isSidebarShown: projectReducer.isSidebarShown,
    userId: projectReducer.userId
})

export default connect(mapStateToProps, { showSidebar })(SideBar)
