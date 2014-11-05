# User model. Main application model. Stores user data.
# Inherits from Chaplin model which inherits from Backbone model.
module.exports = class Task extends Chaplin.Model
	# Corresponds to stuff like https://api.github.com/users/paulmillr.
	# Used when model fetch and save are done.
	defaults:
		"name":  	 	   "task default title"
		"description":     "task default description"
		"status":     	   "new"
		"created":		   (new Date).toGMTString()
		"modified":		   "not modified"