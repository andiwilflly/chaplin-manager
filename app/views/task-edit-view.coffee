View = require '/views/base/view'

module.exports = class TaskShowView extends View
	autoRender: true
	container: '#main-container'
	className: 'task-edit-view'
	template: require './templates/task-edit'

	initialize: ({ @id }) ->
		@delegate 'submit', '#task-update-form', @updateModel

	render: ->
		$(@container).html(@$el) # TODO: refactor this shit..
		@model = @collection.get(@id)
		@$el.html(@template(@model.attributes))

	updateModel: (e) ->
		e.preventDefault()
		serializedFormparams = Chaplin.utils.queryParams.parse($(e.currentTarget).serialize())
		@model.set(serializedFormparams)
		@model.set({modified: (new Date).toGMTString()})
		@collection.localStorage.update(@model)
		Chaplin.helpers.redirectTo('task#show', {id: @model.id})