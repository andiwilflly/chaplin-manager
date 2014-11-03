Task = require '/models/task'
View = require '/views/base/view'

module.exports = class TaskNewView extends View
	autoRender: true
	className: 'task-new-view'
	template: require './templates/task-new'

	initialize: ()->
		@delegate 'submit', '#task-new-form', @createModel

	createModel: (e) ->
		e.preventDefault()
		serializedFormparams = Chaplin.utils.queryParams.parse($(e.currentTarget).serialize())
		@model = new Task(serializedFormparams)
		@saveModel()

	saveModel: ->
		@collection.localStorage.create(@model)
		Chaplin.helpers.redirectTo('task#show', {id: @model.id})