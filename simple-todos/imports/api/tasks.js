import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { check } from 'meteor/check'

export const Tasks = new Mongo.Collection('tasks')

// 我想这部分代码应该是运行在服务器上的，而不是客户端
// 这部分代码相当于在定义提供给客户端使用的 api，方法名和参数是 api，
// 里面的代码是实际操作，运行在服务器上
Meteor.methods({
  'tasks.insert'(text) {
    check(text, String)

    if (!this.userId) {
      throw new Meteor.Error('not-authorized')
    }

    Tasks.insert({
      text,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username
    })
  },

  'tasks.remove'(taskId) {
    check(taskId, String)

    Tasks.remove(taskId)
  },

  'tasks.setChecked'(taskId, setChecked) {
    check(taskId, String)
    check(setChecked, Boolean)

    Tasks.update(taskId, { $set: { checked: setChecked }})
  }
})
