User = require 'models/user'
View = require '/views/base/view'

module.exports = class RandomUsersView extends View
	className: 'random-users cell'
	template: require './templates/random-users'

	initialize: ->

