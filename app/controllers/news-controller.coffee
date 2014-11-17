baseController = require 'controllers/base-controller'

module.exports = class NewsController extends baseController

#	layaut: require 'views/layauts/main-layaut'
#
#	beforeAction: ->
#		# Site layaut declares “main” region.
#		@compose 'site', @layaut

	index: (params) ->
		console.log 'news index!'