import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import { reorderTasks } from '../../actions'

import Task from '../Task'
import AddTask from '../AddTask'

class TaskList extends React.Component {
  filterByQuery = (task) => {
    const { title, subTitle, status } = task
    const { searchQuery } = this.props

    return (
      title.toLowerCase().includes(searchQuery) || subTitle.toLowerCase().includes(searchQuery)
    )
  }

  reOrderOnDragEnd = (draggingResources) => {
    const { source, destination, reason, draggableId } = draggingResources

    if(!draggingResources.destination) {
      return
    } else if(reason === 'DROP') {
      this.props.reorderTasks(this.props.deleted, this.props.tasks, source, destination, draggableId, this.props.projectId)
    }
  }

  sortTasksByOrder = (a, b) => a.order - b.order

  render() {
    const {
      projectId,
      deleted,
      label,
      tasks,
      archivedTasks
    } = this.props

    const taskList = deleted ? archivedTasks : tasks

    console.log({ deleted, taskList})

    return (
      <div className="task-list-container">
        <DragDropContext onDragEnd={this.reOrderOnDragEnd}>
          <div className="label">{ label }</div>
          <Droppable droppableId="droppable-1">
          {
            (provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {
                  taskList
                    .filter(task => deleted ? task.status === 'DONE' : task.status !== 'DONE')
                    .filter(this.filterByQuery)
                    .sort(this.sortTasksByOrder)
                    .map((task, idx) => (
                        <Draggable key={task._id} draggableId={task._id} index={idx} isDragDisabled={projectId === 'all'}>
                        {(provided, { isDragging }) => (
                          <Task
                            isDragging={isDragging}
                            task={task}
                            provided={provided}
                            archived={deleted}
                          />
                        )}
                        </Draggable>
                    ))
                }
                {provided.placeholder}
              </div>
            )
          }
          </Droppable>

        { !deleted && <AddTask/>}
        </DragDropContext>
      </div>
    )
  }
}

TaskList.defaultProps = {
  tasks: [],
  archivedTasks: [],
  deleted: false
}

TaskList.propTypes = {
  tasks: PropTypes.instanceOf(Array),
  searchQuery: PropTypes.string,
  filterStatus: PropTypes.string
}


const mapStateToProps = ({ projectReducer }) => ({
  tasks: projectReducer.tasks,
  archivedTasks: projectReducer.archivedTasks,
  projectId: projectReducer.activeProjectId
})

export default connect(mapStateToProps, { reorderTasks })(TaskList)
