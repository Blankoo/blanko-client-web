import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group'

import Task from '../Task'

class TaskList extends React.Component {
  filterByQuery = (task) => {
    const { title, subTitle, status } = task
    const { searchQuery, filterStatus } = this.props
    const showAllTasks = filterStatus === 'ALL'

    if(showAllTasks) {
      return (title.toLowerCase().includes(searchQuery) || subTitle.toLowerCase().includes(searchQuery))
    } else {
      return status === filterStatus && (title.toLowerCase().includes(searchQuery) || subTitle.toLowerCase().includes(searchQuery))
    }
  }

  render() {
    const { tasks, isFilterBarSticky } = this.props
    // return (
    //   <TransitionGroup className={`tasks-list ${isFilterBarSticky ? 'sticky' : ''}`}>
    //   {
    //     tasks !== undefined && (
    //       tasks
    //         .filter(this.filterByQuery)
    //         .map(task => (
    //           <CSSTransition
    //             key={task._id}
    //             timeout={250}
    //             classNames="fade"
    //           >
    //             <Task task={task} />
    //           </CSSTransition>
    //         ))
    //     )
    //   }
    //   </TransitionGroup>
    // )

    return (
      <>
       {
        tasks !== undefined && (
          tasks
            .filter(this.filterByQuery)
            .map(task => (
              <CSSTransition
                key={task._id}
                timeout={250}
                classNames="fade"
              >
                <Task task={task} />
              </CSSTransition>
            ))
        )
      }
      </>
    )
  }
}

TaskList.defaultProps = {
  tasks: []
}

TaskList.propTypes = {
  tasks: PropTypes.instanceOf(Array),
  searchQuery: PropTypes.string,
  filterStatus: PropTypes.string
}


const mapStateToProps = ({ projectReducer }) => ({
  tasks: projectReducer.tasks,
})

export default connect(mapStateToProps)(TaskList)
