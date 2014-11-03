View = require '/views/base/view'

module.exports = class TaskShowView extends View
	autoRender: false
	container: '#main-container'
	className: 'task-show-view'
	template: require './templates/task-show'

	initialize: ({ @id }) ->
		@model = @collection.get(@id)
		@render()

	render: ->
		$(@container).html(@$el) # TODO: refactor this shit..
		@$el.html(@template(@model.attributes))