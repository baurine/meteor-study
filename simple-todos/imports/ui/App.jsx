import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { createContainer } from 'meteor/react-meteor-data'

import Task from './Task.jsx'
import { Tasks } from '../api/tasks.js'

class App extends Component {

  getTasks() {
    // return [
    //   { _id: 1, text: 'This is task 1' },
    //   { _id: 2, text: 'This is task 2' },
    //   { _id: 3, text: 'This is task 3' },
    // ]
    return this.props.tasks
  }

  renderTasks() {
    return this.getTasks().map(task=>(
      <Task key={task._id} task={task}/>
    ))
  }

  handleSubmit(event) {
    event.preventDefault()

    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim()
    Tasks.insert({
      text,
      createdAt: new Date(),
    })

    ReactDOM.findDOMNode(this.refs.textInput).value = ''
  }

  render() {
    return (
      <div className='container'>
        <header>
          <h1>Todo List</h1>
        </header>

        <form className='new-task' onSubmit={this.handleSubmit.bind(this)}>
          <input 
            type='text'
            ref='textInput'
            placeholder='Add New Task'/>
        </form>

        <ul>
          { this.renderTasks() }
        </ul>
      </div>
    )
  }
}

App.propTypes = {
  tasks: PropTypes.array.isRequired
}

// 这里的 createContainer 和 react-redux 库的 connect 功能极为相似
export default createContainer(()=>{
  return {
    tasks: Tasks.find({}, {sort: {createdAt: -1}}).fetch()
  }
}, App)
