taskCollection = require 'collections/task-collection'

TaskShowView = require 'views/task-show-view'
TaskEditView = require  'views/task-edit-view'
TaskListView = require 'views/task-list-view'
TaskNewView = require  'views/task-new-view'

module.exports = class TaskController extends Chaplin.Controller

	layaut: require 'views/layauts/main-layaut'

	beforeAction: ->
		# Site layaut declares “main” region.
		@compose 'site', @layaut
		@taskCollection = new taskCollection
		@taskCollection.fetch()
		@TaskListView = new TaskListView {
			collection: @taskCollection,
			region: 'main'
		}

	index: (params) ->
		@TaskListView.rednerView()

	show: (params) ->
		new TaskShowView {
			collection: @taskCollection,
			region: 'main'
			id: params.id
		}

	new: (params) ->
		@view = new TaskNewView {
			collection: @taskCollection,
			region: 'main'
			redirectView: @TaskListView
		}

	edit: (params) ->
		new TaskEditView {
			collection: @taskCollection,
			region: 'main'
			id: params.id
		}

	destroy: (id) ->
		@taskCollection.localStorage.destroy(id)
		@taskCollection.remove(id)
#		TODO: need redirection
		@TaskListView.rednerView()

#	Drop localStorage
	drop: ->
		@taskCollection.clearStorage()
#		TODO: need redirection
		@TaskListView.rednerView()