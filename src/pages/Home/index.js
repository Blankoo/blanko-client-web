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
    } = this.props

    return (
      <div className="home">
        <Sidebar />

        {/* home routes for view */}
        <Route path="/home/p/:projectId" render={props => <TasksContainer urlParams={props.match.params} />}/>
        <Route exact path="/home/settings" render={props => <Settings />} />
        <Route exact path="/home" render={props => (
          <div className="home-container sadface-container">
            <SadFace/>
          </div>
        )} />

        <TaskDetail />
        <AddProjectModal/>

        { activeProject !== undefined && <VerificationModal title="Are you sure?" handler={() => deleteProject(activeProject._id)}/> }
      </div>
    )
  }
}

Home.propTypes = {
  fetchProjects: PropTypes.func,
  toggleAddProjectModal: PropTypes.func,
  addProject: PropTypes.func
}

const mapStateToProps = ({ projectReducer }) => ({
  activeProject: projectReducer.activeProject,
  activeTask: projectReducer.activeTask
})

export default withRouter(connect(mapStateToProps, actions)(Home))
