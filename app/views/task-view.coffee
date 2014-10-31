View = require '/views/base/view'

module.exports = class TaskView extends View
	autoRender: true
	className: 'new-task-form'
	template: require './templates/task'

	initialize: ({ @parentView }) ->

	render: ->
		@parentView.$el.find('ul').append(@template(@model.attributes))