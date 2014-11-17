module.exports = class BaseController extends Chaplin.Controller

	layaut: require 'views/layauts/main-layaut'

	beforeAction: ->
		# Site layaut declares “main” region.
		@compose 'site', @layaut

	start: (params) ->
		console.log 'base start!'