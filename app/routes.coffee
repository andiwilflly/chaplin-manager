# All application routes that will be matched against URLs.
module.exports = (match) ->
	match '', 'task#index'
	match 'show/:id', 	 'task#show'
	match 'new', 	     'task#new'
	match 'edit/:id',    'task#edit'
	match 'destroy/:id', 'task#destroy'
	match 'drop', 		 'task#drop'

	#	Manage tasks
	match 'done/:id',    'task#done'
	match 'start/:id',   'task#start'
	match 'tonew/:id',   'task#tonew'
	match 'resume/:id',  'task#resume'
	match 'finish/:id',  'task#finish'