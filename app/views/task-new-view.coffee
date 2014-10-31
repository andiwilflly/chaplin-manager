Task = require '/models/task'
View = require '/views/base/view'

module.exports = class TaskNewView extends View
	autoRender: true
	className: 'tasktask-view'
	template: require './templates/task-new'

	initialize: ()->
		@delegate 'submit', '#new-user-form', @createModel

	createModel: (e) ->
		e.preventDefault()
		serializedFormparams = Chaplin.utils.queryParams.parse($(e.currentTarget).serialize())
		@model = new Task(serializedFormparams)
		@saveModel()

	saveModel: ->
		@collection.localStorage.create(@model)
#		TODO: make redirection to 'task#show'