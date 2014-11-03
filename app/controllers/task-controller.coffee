taskCollection = require 'collections/task-collection'

TaskListView = require 'views/task-list-view'
TaskNewView = require 'views/task-new-view'

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

	new: (params) ->
		@view = new TaskNewView {
			collection: @taskCollection,
			region: 'main'
		}

	edit: (params) ->

	destroy: (id) ->
		@taskCollection.localStorage.destroy(id)
		@taskCollection.remove(id)
		@TaskListView.rednerView()
