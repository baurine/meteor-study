// var postsData = [
//   {
//     title: 'Introducing Telescope',
//     url: 'http://sachagreif.com/introducing-telescope/'
//   }, 
//   {
//     title: 'Meteor',
//     url: 'http://meteor.com'
//   }, 
//   {
//     title: 'The Meteor Book',
//     url: 'http://themeteorbook.com'
//   }
// ]

Template.postsList.helpers({
  // posts: postsData
  posts: function() {
    // 并不需要显式地 .fetch()
    return Posts.find()
  }
})
