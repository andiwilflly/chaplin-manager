# All application routes that will be matched against URLs.
module.exports = (match) ->
  match '', 			'task#index'
  match 'show/:id', 	'task#show'
  match 'new',  		'task#new'
  match 'edit/:id',  	'task#edit'
  match 'destroy/:id',  'task#destroy'
  match 'drop', 		'task#drop'