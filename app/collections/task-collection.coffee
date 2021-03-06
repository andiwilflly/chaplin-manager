Task = require 'models/task'

module.exports = class TaskCollection extends Backbone.Collection

	model: Task

	localStorage: new Backbone.LocalStorage("taskCollection")

	comparator: 'page'

	initialize: ->

	fetch: () =>
		modelsList = _.sortBy @localStorage.findAll(), (el) -> el.name
		_.map modelsList, (model) =>
			@.push(model)

	clearStorage: () ->
		@localStorage._clear()
		@models = []

	updateModel: (id, params) ->
		model = @get(id)
					.set(params)
					.set({modified: (new Date).toGMTString()})
		@localStorage.update(model)

	# Collection helper methods
	# =============================================

	# [models] => filtered [models]
	_filter: (modelsList, params) ->
		_.where(modelsList, params)

	# [models] => {attr: [models], attr: [models]}
	_groupBy: (modelsList, attr) ->
		_.groupBy modelsList, (el) -> el[attr]