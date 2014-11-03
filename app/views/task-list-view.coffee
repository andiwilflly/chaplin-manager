shuffle = require '/utils/shuffle'

View = require '/views/base/view'
TaskView = require '/views/task-view'

module.exports = class TaskListView extends View
	autoRender: false
	container: '#main-container'
	className: 'task-list-view'
	template: require './templates/task-list'

	initialize: () ->
#		@listenTo @collection, 'add', @renderTasksList

	rednerView: ->
		$(@container).html(@$el) # TODO: refactor this shit..
		@$el.html(@template())
		@renderTasksList()

	renderTasksList: ->
		_.map(@collection.models, (model) =>
			@createTaskView(model)
		)
		shuffle.initShuffle()

	createTaskView: (model) ->
		@view = new TaskView {
			parentView: @
			model: model
		}

