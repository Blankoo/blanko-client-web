import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter, Route } from 'react-router-dom'
import * as actions from '../../actions'

// Components
import Sidebar from '../../components/Sidebar'
import TasksContainer from '../../components/TasksContainer'
import AddProjectModal from '../../components/AddProjectModal'
import TaskDetail from '../../components/TaskDetail'
import VerificationModal from '../../components/VerificationModal'
import Settings from '../../components/Settings'
import AddProject from '../../components/AddProject'
import SadFace from '../../assets/sad-face'

// Styles
import './Home.scss'

class Home extends Component {
    componentDidMount() {
        const { fetchProjects } = this.props
        fetchProjects()
    }

    render() {
        const {
            activeProject,
            deleteProject,
            showSidebar
        } = this.props

        return (
            <div className="home">
                <Sidebar />

                {
                    window.innerWidth < 400 &&
                    <div onClick={showSidebar} className="hamburger-icon-sidebar">
                        <img src={require('../../assets/icons/hamburger-icon.svg')} alt="icon to show sidebar" />
                    </div>
                }

                <Route exact path="/settings" render={() => <Settings />} />
                <Route exact path="/project" render={() => <AddProject />} />
                <Route exact path="/project/:projectId/" render={(props) => <TasksContainer urlParams={props.match.params} />} />
                <Route exact path="/" render={() => {
                    showSidebar()
                    return (
                        <div className="home-container sadface-container">
                            <SadFace />
                        </div>
                    )
                }}
                />

                <TaskDetail />
                <AddProjectModal />

                {activeProject !== undefined && <VerificationModal title="Are you sure?" handler={() => deleteProject(activeProject._id)} />}
            </div>
        )
    }
}

Home.propTypes = {
    fetchProjects: PropTypes.func
}

const mapStateToProps = ({ projectReducer }) => ({
    activeProject: projectReducer.activeProject,
    activeTask: projectReducer.activeTask
})

export default withRouter(connect(mapStateToProps, actions)(Home))
