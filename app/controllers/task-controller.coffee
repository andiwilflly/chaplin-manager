taskCollection = require 'collections/task-collection'

TaskListView = require 'views/task-list-view'
TaskNewView = require 'views/task-new-view'

module.exports = class TaskController extends Chaplin.Controller

	layaut: require 'views/layauts/main-layaut'

	beforeAction: ->
		# Site layaut declares “main” region.
		@compose 'site', @layaut
		@taskCollection = new taskCollection

	index: (params) ->
		@listView = new TaskListView {
			collection: @taskCollection,
			region: 'main'
		}

	show: (params) ->

	new: (params) ->
		@view = new TaskNewView {
			collection: @taskCollection,
			region: 'main'
		}

	edit: (params) ->

	destroy: (id) ->
#		TODO: refactor this, make render for listView
		@taskCollection.localStorage.destroy(id)
		@listView = new TaskListView {
			collection: @taskCollection,
			region: 'main'
		}
