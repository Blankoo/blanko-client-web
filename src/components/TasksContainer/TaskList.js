import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import Task from '../Task'
import AddTask from '../AddTask'


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

    return (
      <DragDropContext>
        <Droppable droppableId="droppable">
        { 
          (provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {tasks !== undefined && (
                tasks
                  .filter(this.filterByQuery)
                  .map((task, idx) => (
                    <CSSTransition
                      key={task._id}
                      timeout={250}
                      classNames="fade"
                    >
                      <Draggable key={task._id} draggableId={task._id} index={idx}>
                      {(provided, snapshot) => (
                        <span
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Task task={task} />
                        </span>
                      )}
                      </Draggable>
                    </CSSTransition>
                  ))
              )}
            </div>
          )
        }
        </Droppable>
      <AddTask/>
      </DragDropContext>
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
