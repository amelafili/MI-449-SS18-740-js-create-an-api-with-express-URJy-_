var todos = require('./todos.js')
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.json())
var port = process.env.PORT || 8080

app.get('/', function (request, response) {
  response.json({
    welcome: 'Hello 🐢'
  })
})

app.get('/todos', function (request, response) {
  response.json(todos)
})

app.post('/todos', function (request, response) {
  var slug = request.body.name.trim().toLowerCase().split(' ').join('-')
  todos[slug] = {
    detail: request.body.detail.trim(),
    done: request.body.done.trim()
  }
  response.redirect('/todos/' + slug)
})

app.get('/todos/:slug', function (request, response) {
  if (!todos[request.params.slug]) {
    response.status(404).end('sorry, no such todo: ' + request.params.slug)
    return
  }
  response.json(todos[request.params.slug])
})

app.delete('/todos/:slug', function (request, response) {
  delete todos[request.params.slug]
  response.redirect('/todos')
})

app.put('/todos/:slug', function (request, response) {
  var todo = todos[request.params.slug]
  if (request.body.detail !== undefined) {
    todo.name = request.body.detail.trim()
  }
  if (request.body.done !== undefined) {
    todo.price = '$' + parseFloat(request.body.done).toFixed(2)
  }
  response.redirect('/todos/' + request.params.slug)
})

app.use(function (request, response, next) {
  response.status(404).end(request.url + ' not found')
})

app.listen(port)
