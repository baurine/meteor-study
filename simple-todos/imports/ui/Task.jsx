import React, { Component, PropTypes } from 'react'
import { Tasks } from '../api/tasks.js'

export default class Task extends Component {
  deleteTask() {
    Tasks.remove(this.props.task._id)
  }

  toggleTask() {
    Tasks.update(this.props.task._id, {
      $set: { checked: !this.props.task.checked }
    })
  }

  render() {
    const className = this.props.task.checked ? 'checked' : ''

    return (
      <li className={className}>
        <button className='delete' onClick={this.deleteTask.bind(this)}>
          &times;
        </button>
        <input 
          type='checkbox'
          readOnly
          checked={this.props.task.checked}
          onClick={this.toggleTask.bind(this)}/>
        <span className='text'>
          <strong>{this.props.task.username}</strong>
          : {this.props.task.text}
        </span>
      </li>
    )
  }
}

Task.propTypes = {
  task: PropTypes.object.isRequired
}
