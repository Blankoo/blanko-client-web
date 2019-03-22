import React from 'react'
import './ProjectKebabMenu.scss'

function ProjectKebabMenu(props) {
  const { toggleModal, updateProject, projectId, DELETE_PROJECT } = props

  return (
    <div className="project-kebab-menu">
      <div className="project-kebab-menu-trigger">
        <img src={require('../../assets/icons/kebab-menu.svg')} alt="Kebab menu trigger" />
      </div>

      <div className="project-kebab-menu-content">
        <span onClick={() => toggleModal('isVerificationShown', true, DELETE_PROJECT) }>DELETE</span>
        <span onClick={() => updateProject(projectId) }>FAV</span>
      </div>
    </div>
  )
}

export default ProjectKebabMenu
