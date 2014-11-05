module.exports = initDrag: (TaskListView) ->

	window.allowDrop = (ev) ->
		ev.preventDefault()

	window.drag = (e) ->
		e.dataTransfer.setData "text", e.target.id

	window.drop = (ev) ->
		ev.preventDefault()
		$(ev.target).addClass('drag')
		data = ev.dataTransfer.getData("text")
		if(typeof $(ev.target).attr('ondrop') == "string")
			TaskListView.collection.updateModel(data, {status: $(ev.target).attr('id')})
			ev.target.appendChild document.getElementById(data)
			TaskListView.rednerView()

	window.removeTask = (e) ->
		e.preventDefault()
		model = TaskListView.collection.get(e.dataTransfer.getData("text"))
		Chaplin.helpers.redirectTo('task#destroy', {id: model.id})