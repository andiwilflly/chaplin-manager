Shuffle.options =
#	group: ALL_ITEMS, # Initial filter group.
	speed: 250, # Transition/animation speed (milliseconds).
	easing: 'ease-out', # CSS easing function to use.
	itemSelector: '', # e.g. '.picture-item'.
	sizer: null, # Sizer element. Use an element to determine the size of columns and gutters.
	gutterWidth: 0, # A static number or function that tells the plugin how wide the gutters between columns are (in pixels).
	columnWidth: 0, # A static number or function that returns a number which tells the plugin how wide the columns are (in pixels).
	delimeter: null, # If your group is not json, and is comma delimeted, you could set delimeter to ','.
	buffer: 0, # Useful for percentage based heights when they might not always be exactly the same (in pixels).
	initialSort: by: ($el) ->
					$el.data "status" , # Shuffle can be initialized with a sort object. It is the same object given to the sort method.
#	throttle: throttle, # By default, shuffle will throttle resize events. This can be changed or removed.
	throttleTime: 300, # How often shuffle can be called on resize (in milliseconds).
	sequentialFadeDelay: 150, # Delay between each item that fades in when adding items.
#	supported: CAN_TRANSITION_TRANSFORMS # Whether to use transforms or absolute positioning.

module.exports = initShuffle: ->
		$grid = $(".task-list-view ul")
		$grid.shuffle
			itemSelector: ".task"

		$(".sort-options").on "change", ->
			sort = @value
			opts = {}

			# We're given the element wrapped in jQuery
			if sort is "name"
				opts = by: ($el) ->
					$el.data "name"
			else if sort is "status"
				opts = by: ($el) ->
					$el.data("status")

			# Filter elements
			$grid.shuffle "sort", opts

