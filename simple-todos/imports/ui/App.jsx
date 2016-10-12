import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'

import Task from './Task.jsx'
import { Tasks } from '../api/tasks.js'
import AccountsUIWrapper from './AccountsUIWrapper.jsx'

class App extends Component {
  // state = {
  //   hideCompleted: false,
  // }
  constructor(props) {
    super(props)

    this.state = {
      hideCompleted: false,
    }
  }

  getTasks() {
    // return [
    //   { _id: 1, text: 'This is task 1' },
    //   { _id: 2, text: 'This is task 2' },
    //   { _id: 3, text: 'This is task 3' },
    // ]
    if (this.state.hideCompleted) {
      return this.props.tasks.filter(task=>!task.checked)
    } else {
      return this.props.tasks
    }
  }

  renderTasks() {
    return this.getTasks().map(task=>(
      <Task key={task._id} task={task}/>
    ))
  }

  renderAddTask() {
    if (this.props.currentUser) {
      return (
        <form className='new-task' onSubmit={this.handleSubmit.bind(this)}>
          <input 
            type='text'
            ref='textInput'
            placeholder='Add New Task'/>
        </form>
      )
    } else {
      return null
    }
  }

  handleSubmit(event) {
    event.preventDefault()

    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim()
    Tasks.insert({
      text,
      createdAt: new Date(),
      ower: Meteor.userId(),
      username: Meteor.user().username,
    })

    ReactDOM.findDOMNode(this.refs.textInput).value = ''
  }

  toggleHideCompleted() {
    this.setState({hideCompleted: !this.state.hideCompleted})
  }

  render() {
    return (
      <div className='container'>
        <header>
          <h1>Todo List ({this.props.inCompletedCount})</h1>
        </header>

        <AccountsUIWrapper/>

        <label className='hide-completed'>
          <input
            type='checkbox'
            readOnly
            checked={this.state.hideCompleted}
            onClick={this.toggleHideCompleted.bind(this)}/>
          Hide Completed Tasks
        </label>

        { this.renderAddTask() }

        <ul>
          { this.renderTasks() }
        </ul>
      </div>
    )
  }
}

App.propTypes = {
  tasks: PropTypes.array.isRequired,
  inCompletedCount: PropTypes.number.isRequired,
  currentUser: PropTypes.object,
}

// 这里的 createContainer 和 react-redux 库的 connect 功能极为相似
export default createContainer(()=>{
  return {
    tasks: Tasks.find({}, {sort: {createdAt: -1}}).fetch(),
    inCompletedCount: Tasks.find({ checked: { $ne: true }}).count(),
    currentUser: Meteor.user(),
  }
}, App)
