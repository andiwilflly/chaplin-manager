routes = require './routes'
extendHandlebars = require '/utils/hbs' # Extend Handlebars template object with custom methods

# Execute handler on document ready event.
jQuery ->
  # Initialise new Chaplin application.
  # Specify controller suffix for clarity.
  new Chaplin.Application
    controllerSuffix: '-controller', pushState: false, routes: routes
