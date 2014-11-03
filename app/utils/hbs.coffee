Handlebars.registerHelper "equal", (lvalue, rvalue, options) ->
	throw new Error("Handlebars Helper equal needs 2 parameters")  if arguments.length < 3
	unless lvalue is rvalue
		options.inverse this
	else
		options.fn this
