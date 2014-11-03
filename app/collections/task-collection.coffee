Task = require 'models/task'

module.exports = class TaskCollection extends Backbone.Collection

	model: Task

	localStorage: new Backbone.LocalStorage("taskCollection")

	initialize: ->

	fetch: ->
		modelsList = @localStorage.findAll()
		_.map modelsList, (model) =>
			@.push(model)

	clearStorage: () ->
		@localStorage._clear()


