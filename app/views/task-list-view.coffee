View = require '/views/base/view'
TaskView = require '/views/task-view'

module.exports = class TaskListView extends View
	autoRender: false
	className: 'task-list-view'
	template: require './templates/task-list'

	initialize: () ->
		@listenTo @collection, 'add', @createTaskView
		@redner();

	redner: ->
		$('#main-container').html(@$el) # TODO: remove this shit..
		@$el.html(@template())
		@collection.fetch()

	createTaskView: (model) ->
		@view = new TaskView {
			parentView: @
			model: model
		}