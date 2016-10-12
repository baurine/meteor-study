import React, { Component, PropTypes } from 'react'
// import { Tasks } from '../api/tasks.js'
import { Meteor } from 'meteor/meteor'
import classnames from 'classnames'

export default class Task extends Component {
  deleteTask() {
    // Tasks.remove(this.props.task._id)
    // 相当于去调用一个 api，发送请求
    Meteor.call('tasks.remove', this.props.task._id)
  }

  toggleTask() {
    // Tasks.update(this.props.task._id, {
    //   $set: { checked: !this.props.task.checked }
    // })
    // 相当于去调用一个 api，发送请求
    Meteor.call('tasks.setChecked', this.props.task._id, !this.props.task.checked)
  }

  togglePrivate() {
    Meteor.call('tasks.setPrivate', this.props.task._id, !this.props.task.private)
  }

  render() {
    const taskClassName = classnames({
      checked: this.props.task.checked,
      private: this.props.task.private
    })

    return (
      <li className={taskClassName}>
        <button className='delete' onClick={this.deleteTask.bind(this)}>
          &times;
        </button>
        <input 
          type='checkbox'
          readOnly
          checked={this.props.task.checked}
          onClick={this.toggleTask.bind(this)}/>
        {
          this.props.showPrivateBtn 
          ?
          (
            <button className='toggle-private' onClick={this.togglePrivate.bind(this)}>
              { this.props.task.private ? 'Private' : 'Public'}
            </button>
          ) 
          : 
          ''
        }
        <span className='text'>
          <strong>{this.props.task.username}</strong>
          : {this.props.task.text}
        </span>
      </li>
    )
  }
}

Task.propTypes = {
  task: PropTypes.object.isRequired,
  showPrivateBtn: PropTypes.bool
}
