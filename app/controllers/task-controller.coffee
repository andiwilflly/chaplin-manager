taskCollection = require 'collections/task-collection'
Task = require 'models/task'

# Main application controller.
# Controllers manage memory and initialize models with views,
# storing them on current controller instance.
# When URL is changed, controller disposes itself and all
# instance properties (models, views etc).
module.exports = class TaskController extends Chaplin.Controller

	layaut: require 'layauts/main-layaut'
	# Would be executed before each action.
	# We do `composing` for views and things that should persist
	# within many controllers — all non-composed views are deleted.
	beforeAction: ->
		# Site view declares “main” region.
		@compose 'site', @layaut
		@taskCollection = new taskCollection

	# Index action. Will just display a list of users.
	index: (params) ->
		console.log 'index action'

	show: (params) ->

	new: (params) ->

	edit: (params) ->

	destroy: (params) ->
