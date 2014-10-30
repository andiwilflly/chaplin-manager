User = require 'models/user'
RandomUsersView = require 'views/random-users-view'
UserView = require 'views/user-view'
SiteView = require 'views/site-view'

fixture = [
	{login: 'paulmillr'},
	{login: 'molily'},
	{login: 'paulirish'},
	{login: 'addyosmani'},
	{login: 'sindresorhus'},
	{login: 'dhh'},
	{login: 'mehcode'}
	{login: 'asd'}
]

ohoh = [
	{login: 'asd'},
	{login: 'asqwd'},
	{login: 'sd'},
	{login: 'qweqw'},
	{login: 'sindrqweqweesorhus'},
	{login: 'dhqweqweh'},
	{login: 'mehasdasdcode'}
]

# Main application controller.
# Controllers manage memory and initialize models with views,
# storing them on current controller instance.
# When URL is changed, controller disposes itself and all
# instance properties (models, views etc).
module.exports = class UsersController extends Chaplin.Controller
	# Would be executed before each action.
	# We do `composing` for views and things that should persist
	# within many controllers — all non-composed views are deleted.
	beforeAction: ->
		# Site view declares “main” region.
		@compose 'site', SiteView

	# Index action. Will just display a list of users.
	index: (params) ->
		# Create simple collection with random GitHub users.
		@collection = new Chaplin.Collection ohoh;
		# Render the collection to view.
		@view = new RandomUsersView {
			autoRender: true,
			@collection,
			region: 'main'
		}

	show: (params) ->
		# Initialize new User with login from URL params.
		@model = new User login: params.login
		@view = new UserView {@model, region: 'main'}
		console.log @model, @view
		@model.fetch().then(@view.render)
