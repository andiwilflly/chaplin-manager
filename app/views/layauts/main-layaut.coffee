View = require '/views/base/view'

# Site view is a top-level view which is bound to body.
module.exports = class MainLayaut extends View
	container: 'body'
	id: 'main-layaut'
	regions:
		main: '#main-container'
	template: require './layauts/main-layaut'
