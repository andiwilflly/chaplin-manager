baseController = require 'controllers/base-controller'

taskCollection = require 'collections/task-collection'

TaskShowView = require 'views/task-show-view'
TaskEditView = require 'views/task-edit-view'
TaskListView = require 'views/task-list-view'
TaskNewView = require  'views/task-new-view'

module.exports = class TaskController extends baseController

#	layaut: require 'views/layauts/main-layaut'

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
		@TaskListView.rednerView()

#	Drop localStorage
	drop: ->
		@taskCollection.clearStorage()
		@TaskListView.rednerView()

#	Manage tasks
	done: (params) ->
		@taskCollection.updateModel(params.id, {status: "done"})
		@TaskListView.rednerView()

	start: (params) ->
		@taskCollection.updateModel(params.id, {status: "inProgress"})
		@TaskListView.rednerView()

	tonew: (params) ->
		@taskCollection.updateModel(params.id, {status: "new"})
		@TaskListView.rednerView()

	resume: (params) ->
		@taskCollection.updateModel(params.id, {status: "inProgress"})
		@TaskListView.rednerView()