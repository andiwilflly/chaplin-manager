# All application routes that will be matched against URLs.
module.exports = (match) ->
	match '', 			      'task#index'
	match 'task/show/:id', 	  'task#show'
	match 'task/new', 	      'task#new'
	match 'task/edit/:id',    'task#edit'
	match 'task/destroy/:id', 'task#destroy'

	#   Clear localStorage
	match 'task/drop', 		  'task#drop'

	#	Manage tasks
	match 'task/done/:id',    'task#done'
	match 'task/start/:id',   'task#start'
	match 'task/tonew/:id',   'task#tonew'
	match 'task/resume/:id',  'task#resume'
