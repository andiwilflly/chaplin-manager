drag = require 'utils/drag' # Add drag HTML5 events

View = require '/views/base/view'
TaskView = require '/views/task-view'

module.exports = class TaskListView extends View
	autoRender: false
	container: '#main-container'
	className: 'task-list-view'
	template: require './templates/task-list'

	initialize: () ->
		drag.initDrag(@)
#		@listenTo @collection, 'update', @op

	rednerView: ->
		$(@container).html(@$el) # TODO: refactor this shit..
		@$el.html(@template())
		@renderTasksList()

	renderTasksList: ->
		_.map(@collection.models, (model) =>
			@createTaskView(model)
		)

	createTaskView: (model) ->
		@view = new TaskView {
			parentView: @
			model: model
		}