// 注意，这里并没有使用 var/let/const 修饰 Posts
// 所以它是全局变量，在其它文件中不需要用 import 导入
// 并不推荐这样做
// Mongo 也是全局变量?? 怎么都不需要显式地导入呢?
Posts = new Mongo.Collection('posts')
