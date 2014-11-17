(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var require = function(name, loaderPath) {
    var path = expand(name, '.');
    if (loaderPath == null) loaderPath = '/';

    if (has(cache, path)) return cache[path].exports;
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex].exports;
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '" from '+ '"' + loaderPath + '"');
  };

  var define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  var list = function() {
    var result = [];
    for (var item in modules) {
      if (has(modules, item)) {
        result.push(item);
      }
    }
    return result;
  };

  globals.require = require;
  globals.require.define = define;
  globals.require.register = define;
  globals.require.list = list;
  globals.require.brunch = true;
})();
require.register("collections/news-collection", function(exports, require, module) {
var NewsCollection, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

module.exports = NewsCollection = (function(_super) {
  __extends(NewsCollection, _super);

  function NewsCollection() {
    _ref = NewsCollection.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  return NewsCollection;

})(Backbone.Collection);
});

;require.register("collections/task-collection", function(exports, require, module) {
var Task, TaskCollection, _ref,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Task = require('models/task');

module.exports = TaskCollection = (function(_super) {
  __extends(TaskCollection, _super);

  function TaskCollection() {
    this.fetch = __bind(this.fetch, this);
    _ref = TaskCollection.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  TaskCollection.prototype.model = Task;

  TaskCollection.prototype.localStorage = new Backbone.LocalStorage("taskCollection");

  TaskCollection.prototype.comparator = 'page';

  TaskCollection.prototype.initialize = function() {};

  TaskCollection.prototype.fetch = function() {
    var modelsList,
      _this = this;
    modelsList = _.sortBy(this.localStorage.findAll(), function(el) {
      return el.name;
    });
    return _.map(modelsList, function(model) {
      return _this.push(model);
    });
  };

  TaskCollection.prototype.clearStorage = function() {
    this.localStorage._clear();
    return this.models = [];
  };

  TaskCollection.prototype.updateModel = function(id, params) {
    var model;
    model = this.get(id).set(params).set({
      modified: (new Date).toGMTString()
    });
    return this.localStorage.update(model);
  };

  TaskCollection.prototype._filter = function(modelsList, params) {
    return _.where(modelsList, params);
  };

  TaskCollection.prototype._groupBy = function(modelsList, attr) {
    return _.groupBy(modelsList, function(el) {
      return el[attr];
    });
  };

  return TaskCollection;

})(Backbone.Collection);
});

;require.register("controllers/base-controller", function(exports, require, module) {
var BaseController, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

module.exports = BaseController = (function(_super) {
  __extends(BaseController, _super);

  function BaseController() {
    _ref = BaseController.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  BaseController.prototype.layaut = require('views/layauts/main-layaut');

  BaseController.prototype.beforeAction = function() {
    return this.compose('site', this.layaut);
  };

  BaseController.prototype.start = function(params) {
    return console.log('base start!');
  };

  return BaseController;

})(Chaplin.Controller);
});

;require.register("controllers/news-controller", function(exports, require, module) {
var NewsController, baseController, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

baseController = require('controllers/base-controller');

module.exports = NewsController = (function(_super) {
  __extends(NewsController, _super);

  function NewsController() {
    _ref = NewsController.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  NewsController.prototype.index = function(params) {
    return console.log('news index!');
  };

  return NewsController;

})(baseController);
});

;require.register("controllers/task-controller", function(exports, require, module) {
var TaskController, TaskEditView, TaskListView, TaskNewView, TaskShowView, baseController, taskCollection, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

baseController = require('controllers/base-controller');

taskCollection = require('collections/task-collection');

TaskShowView = require('views/task-show-view');

TaskEditView = require('views/task-edit-view');

TaskListView = require('views/task-list-view');

TaskNewView = require('views/task-new-view');

module.exports = TaskController = (function(_super) {
  __extends(TaskController, _super);

  function TaskController() {
    _ref = TaskController.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  TaskController.prototype.beforeAction = function() {
    this.compose('site', this.layaut);
    this.taskCollection = new taskCollection;
    this.taskCollection.fetch();
    return this.TaskListView = new TaskListView({
      collection: this.taskCollection,
      region: 'main'
    });
  };

  TaskController.prototype.index = function(params) {
    return this.TaskListView.rednerView();
  };

  TaskController.prototype.show = function(params) {
    return new TaskShowView({
      collection: this.taskCollection,
      region: 'main',
      id: params.id
    });
  };

  TaskController.prototype["new"] = function(params) {
    return this.view = new TaskNewView({
      collection: this.taskCollection,
      region: 'main',
      redirectView: this.TaskListView
    });
  };

  TaskController.prototype.edit = function(params) {
    return new TaskEditView({
      collection: this.taskCollection,
      region: 'main',
      id: params.id
    });
  };

  TaskController.prototype.destroy = function(id) {
    this.taskCollection.localStorage.destroy(id);
    this.taskCollection.remove(id);
    return this.TaskListView.rednerView();
  };

  TaskController.prototype.drop = function() {
    this.taskCollection.clearStorage();
    return this.TaskListView.rednerView();
  };

  TaskController.prototype.done = function(params) {
    this.taskCollection.updateModel(params.id, {
      status: "done"
    });
    return this.TaskListView.rednerView();
  };

  TaskController.prototype.start = function(params) {
    this.taskCollection.updateModel(params.id, {
      status: "inProgress"
    });
    return this.TaskListView.rednerView();
  };

  TaskController.prototype.tonew = function(params) {
    this.taskCollection.updateModel(params.id, {
      status: "new"
    });
    return this.TaskListView.rednerView();
  };

  TaskController.prototype.resume = function(params) {
    this.taskCollection.updateModel(params.id, {
      status: "inProgress"
    });
    return this.TaskListView.rednerView();
  };

  return TaskController;

})(baseController);
});

;require.register("initialize", function(exports, require, module) {
var extendHandlebars, routes;

routes = require('./routes');

extendHandlebars = require('/utils/hbs');

jQuery(function() {
  return new Chaplin.Application({
    controllerSuffix: '-controller',
    pushState: false,
    routes: routes
  });
});
});

;require.register("models/task", function(exports, require, module) {
var Task, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

module.exports = Task = (function(_super) {
  __extends(Task, _super);

  function Task() {
    _ref = Task.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  Task.prototype.defaults = {
    "name": "task default title",
    "description": "task default description",
    "status": "new",
    "created": (new Date).toGMTString(),
    "modified": "not modified"
  };

  return Task;

})(Chaplin.Model);
});

;require.register("routes", function(exports, require, module) {
module.exports = function(match) {
  match('', 'base#start');
  match('task', 'task#index');
  match('task/show/:id', 'task#show');
  match('task/new', 'task#new');
  match('task/edit/:id', 'task#edit');
  match('task/destroy/:id', 'task#destroy');
  match('task/drop', 'task#drop');
  match('task/done/:id', 'task#done');
  match('task/start/:id', 'task#start');
  match('task/tonew/:id', 'task#tonew');
  match('task/resume/:id', 'task#resume');
  return match('news', 'news#index');
};
});

;require.register("utils/drag", function(exports, require, module) {
module.exports = {
  initDrag: function(TaskListView) {
    window.allowDrop = function(ev) {
      return ev.preventDefault();
    };
    window.drag = function(e) {
      return e.dataTransfer.setData("text", e.target.id);
    };
    window.drop = function(ev) {
      var data;
      ev.preventDefault();
      $(ev.target).addClass('drag');
      data = ev.dataTransfer.getData("text");
      if (typeof $(ev.target).attr('ondrop') === "string") {
        TaskListView.collection.updateModel(data, {
          status: $(ev.target).attr('id')
        });
        ev.target.appendChild(document.getElementById(data));
        return TaskListView.rednerView();
      }
    };
    return window.removeTask = function(e) {
      var model;
      e.preventDefault();
      model = TaskListView.collection.get(e.dataTransfer.getData("text"));
      return Chaplin.helpers.redirectTo('task#destroy', {
        id: model.id
      });
    };
  }
};
});

;require.register("utils/hbs", function(exports, require, module) {
Handlebars.registerHelper("equal", function(lvalue, rvalue, options) {
  if (arguments.length < 3) {
    throw new Error("Handlebars Helper equal needs 2 parameters");
  }
  if (lvalue !== rvalue) {
    return options.inverse(this);
  } else {
    return options.fn(this);
  }
});
});

;require.register("utils/shuffle", function(exports, require, module) {

});

;require.register("views/base/view", function(exports, require, module) {
var View, _ref,
  __slice = [].slice,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Handlebars.registerHelper('url', function() {
  var options, params, routeName, _i;
  routeName = arguments[0], params = 3 <= arguments.length ? __slice.call(arguments, 1, _i = arguments.length - 1) : (_i = 1, []), options = arguments[_i++];
  return Chaplin.helpers.reverse(routeName, params);
});

module.exports = View = (function(_super) {
  __extends(View, _super);

  function View() {
    _ref = View.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  View.prototype.getTemplateFunction = function() {
    return this.template;
  };

  return View;

})(Chaplin.View);
});

;require.register("views/layauts/main-layaut", function(exports, require, module) {
var MainLayaut, View, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require('/views/base/view');

module.exports = MainLayaut = (function(_super) {
  __extends(MainLayaut, _super);

  function MainLayaut() {
    _ref = MainLayaut.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  MainLayaut.prototype.container = 'body';

  MainLayaut.prototype.id = 'main-layaut';

  MainLayaut.prototype.regions = {
    main: '#main-container'
  };

  MainLayaut.prototype.template = require('views/templates/main-layaut');

  return MainLayaut;

})(View);
});

;require.register("views/site-view", function(exports, require, module) {
var SiteView, View, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require('/views/base/view');

module.exports = SiteView = (function(_super) {
  __extends(SiteView, _super);

  function SiteView() {
    _ref = SiteView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  SiteView.prototype.container = 'body';

  SiteView.prototype.id = 'site-container';

  SiteView.prototype.regions = {
    main: '#main-container'
  };

  SiteView.prototype.template = require('./templates/site');

  return SiteView;

})(View);
});

;require.register("views/task-edit-view", function(exports, require, module) {
var TaskShowView, View, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require('/views/base/view');

module.exports = TaskShowView = (function(_super) {
  __extends(TaskShowView, _super);

  function TaskShowView() {
    _ref = TaskShowView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  TaskShowView.prototype.autoRender = true;

  TaskShowView.prototype.container = '#main-container';

  TaskShowView.prototype.className = 'task-edit-view';

  TaskShowView.prototype.template = require('./templates/task-edit');

  TaskShowView.prototype.initialize = function(_arg) {
    this.id = _arg.id;
    return this.delegate('submit', '#task-update-form', this.updateModel);
  };

  TaskShowView.prototype.render = function() {
    $(this.container).html(this.$el);
    this.model = this.collection.get(this.id);
    return this.$el.html(this.template(this.model.attributes));
  };

  TaskShowView.prototype.updateModel = function(e) {
    var serializedFormparams;
    e.preventDefault();
    serializedFormparams = Chaplin.utils.queryParams.parse($(e.currentTarget).serialize());
    this.model.set(serializedFormparams);
    this.model.set({
      modified: (new Date).toGMTString()
    });
    this.collection.localStorage.update(this.model);
    return Chaplin.helpers.redirectTo('task#show', {
      id: this.model.id
    });
  };

  return TaskShowView;

})(View);
});

;require.register("views/task-list-view", function(exports, require, module) {
var TaskListView, TaskView, View, drag, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

drag = require('utils/drag');

View = require('/views/base/view');

TaskView = require('/views/task-view');

module.exports = TaskListView = (function(_super) {
  __extends(TaskListView, _super);

  function TaskListView() {
    _ref = TaskListView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  TaskListView.prototype.autoRender = false;

  TaskListView.prototype.container = '#main-container';

  TaskListView.prototype.className = 'task-list-view';

  TaskListView.prototype.template = require('./templates/task-list');

  TaskListView.prototype.initialize = function() {
    return drag.initDrag(this);
  };

  TaskListView.prototype.rednerView = function() {
    $(this.container).html(this.$el);
    this.$el.html(this.template());
    return this.renderTasksList();
  };

  TaskListView.prototype.renderTasksList = function() {
    var _this = this;
    return _.map(this.collection.models, function(model) {
      return _this.createTaskView(model);
    });
  };

  TaskListView.prototype.createTaskView = function(model) {
    return this.view = new TaskView({
      parentView: this,
      model: model
    });
  };

  return TaskListView;

})(View);
});

;require.register("views/task-new-view", function(exports, require, module) {
var Task, TaskNewView, View, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Task = require('/models/task');

View = require('/views/base/view');

module.exports = TaskNewView = (function(_super) {
  __extends(TaskNewView, _super);

  function TaskNewView() {
    _ref = TaskNewView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  TaskNewView.prototype.autoRender = true;

  TaskNewView.prototype.className = 'task-new-view';

  TaskNewView.prototype.template = require('./templates/task-new');

  TaskNewView.prototype.initialize = function() {
    return this.delegate('submit', '#task-new-form', this.createModel);
  };

  TaskNewView.prototype.createModel = function(e) {
    var serializedFormparams;
    e.preventDefault();
    serializedFormparams = Chaplin.utils.queryParams.parse($(e.currentTarget).serialize());
    this.model = new Task(serializedFormparams);
    return this.saveModel();
  };

  TaskNewView.prototype.saveModel = function() {
    this.collection.localStorage.create(this.model);
    this.collection.add(this.model);
    return Chaplin.helpers.redirectTo('task#show', {
      id: this.model.id
    });
  };

  return TaskNewView;

})(View);
});

;require.register("views/task-show-view", function(exports, require, module) {
var TaskShowView, View, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require('/views/base/view');

module.exports = TaskShowView = (function(_super) {
  __extends(TaskShowView, _super);

  function TaskShowView() {
    _ref = TaskShowView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  TaskShowView.prototype.autoRender = false;

  TaskShowView.prototype.container = '#main-container';

  TaskShowView.prototype.className = 'task-show-view';

  TaskShowView.prototype.template = require('./templates/task-show');

  TaskShowView.prototype.initialize = function(_arg) {
    this.id = _arg.id;
    this.model = this.collection.get(this.id);
    return this.render();
  };

  TaskShowView.prototype.render = function() {
    $(this.container).html(this.$el);
    return this.$el.html(this.template(this.model.attributes));
  };

  return TaskShowView;

})(View);
});

;require.register("views/task-view", function(exports, require, module) {
var TaskView, View, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require('/views/base/view');

module.exports = TaskView = (function(_super) {
  __extends(TaskView, _super);

  function TaskView() {
    _ref = TaskView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  TaskView.prototype.autoRender = true;

  TaskView.prototype.className = 'new-task-form';

  TaskView.prototype.template = require('./templates/task');

  TaskView.prototype.initialize = function(_arg) {
    this.parentView = _arg.parentView;
  };

  TaskView.prototype.render = function() {
    return this.parentView.$el.find('#' + this.model.get('status')).append(this.template(this.model.attributes));
  };

  return TaskView;

})(View);
});

;require.register("views/templates/main-layaut", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  buffer += "<h3><a href=\""
    + escapeExpression((helper = helpers.url || (depth0 && depth0.url),options={hash:{},data:data},helper ? helper.call(depth0, "task#index", options) : helperMissing.call(depth0, "url", "task#index", options)))
    + "\">Task manager</a></h3>\r\n<button><a href=\""
    + escapeExpression((helper = helpers.url || (depth0 && depth0.url),options={hash:{},data:data},helper ? helper.call(depth0, "task#drop", options) : helperMissing.call(depth0, "url", "task#drop", options)))
    + "\">Clear storage</a></button>\r\n<div class=\"main-container\" id=\"main-container\"></div>\r\n\r\n<div id=\"delete-task-area\" ondrop=\"removeTask(event)\" ondragover=\"allowDrop(event)\">Destroy task</div>\r\n\r\n";
  return buffer;
  });
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/templates/task-edit", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function";


  buffer += "<h3><a href=\""
    + escapeExpression((helper = helpers.url || (depth0 && depth0.url),options={hash:{},data:data},helper ? helper.call(depth0, "task#index", (depth0 && depth0.id), options) : helperMissing.call(depth0, "url", "task#index", (depth0 && depth0.id), options)))
    + "\">Task list</a></h3>\n<form id=\"task-update-form\" class=\"task ";
  if (helper = helpers.status) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.status); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\n	<label for=\"task-name\">Task name</label>\n	<br />\n	<input id=\"task-name\" type=\"text\" name=\"name\" value=\"";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" />\n	<br />\n	<br />\n	<label for=\"task-desc\">Task name</label>\n	<br />\n	<textarea name=\"description\" id=\"task-desc\" cols=\"30\" rows=\"10\">";
  if (helper = helpers.description) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.description); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</textarea>\n	<br />\n	<br />\n	<label for=\"task-status\">Task status</label>\n	<br />\n	<select name=\"status\" id=\"task-status\">\n		<option value=\"new\">new</option>\n		<option value=\"done\">done</option>\n		<option value=\"inProgress\">in progress</option>\n	</select>\n	<br />\n	<br />\n	<input class=\"btn\" type=\"submit\" value=\"Update\"/>\n</form>";
  return buffer;
  });
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/templates/task-list", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  buffer += "<a class=\"btn add-new-btn\" href=\""
    + escapeExpression((helper = helpers.url || (depth0 && depth0.url),options={hash:{},data:data},helper ? helper.call(depth0, "task#new", options) : helperMissing.call(depth0, "url", "task#new", options)))
    + "\">Add new task</a>\r\n\r\n<div class=\"task-lists\">\r\n	<ul id=\"inProgress\" ondrop=\"drop(event)\" ondragover=\"allowDrop(event)\">InProgress\r\n	</ul>\r\n	<ul id=\"new\" ondrop=\"drop(event)\" ondragover=\"allowDrop(event)\">New\r\n	</ul>\r\n	<ul id=\"done\" ondrop=\"drop(event)\" ondragover=\"allowDrop(event)\">Done\r\n	</ul>\r\n</div>";
  return buffer;
  });
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/templates/task-new", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  buffer += "<h3><a href=\""
    + escapeExpression((helper = helpers.url || (depth0 && depth0.url),options={hash:{},data:data},helper ? helper.call(depth0, "task#index", (depth0 && depth0.id), options) : helperMissing.call(depth0, "url", "task#index", (depth0 && depth0.id), options)))
    + "\">Task list</a></h3>\r\n<form id=\"task-new-form\" method=\"POST\">\r\n	<label for=\"task-name\">Task name</label>\r\n	<br />\r\n	<input id=\"task-name\" type=\"text\" name=\"name\" />\r\n	<br />\r\n	<br />\r\n	<label for=\"task-desc\">Task name</label>\r\n	<br />\r\n	<textarea name=\"description\" id=\"task-desc\" cols=\"30\" rows=\"10\"></textarea>\r\n	<br />\r\n	<br />\r\n	<label for=\"task-status\">Task status</label>\r\n	<br />\r\n	<select name=\"status\" id=\"task-status\">\r\n		<option value=\"new\">new</option>\r\n		<option value=\"done\">done</option>\r\n		<option value=\"inProgress\">in progress</option>\r\n	</select>\r\n	<br />\r\n	<br />\r\n	<input class=\"btn\" type=\"submit\" value=\"Create\"/>\r\n</form>";
  return buffer;
  });
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/templates/task-show", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function";


  buffer += "<h3><a href=\""
    + escapeExpression((helper = helpers.url || (depth0 && depth0.url),options={hash:{},data:data},helper ? helper.call(depth0, "task#index", (depth0 && depth0.id), options) : helperMissing.call(depth0, "url", "task#index", (depth0 && depth0.id), options)))
    + "\">Task list</a></h3>\n<div class=\"task ";
  if (helper = helpers.status) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.status); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\n	<h2>";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h2>\n	<i>[";
  if (helper = helpers.status) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.status); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "]</i>\n	<br />\n	<br />\n	<p><i>description:</i> ";
  if (helper = helpers.description) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.description); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</p>\n\n	<br />\n	<br />\n	<a class=\"btn\" href=\""
    + escapeExpression((helper = helpers.url || (depth0 && depth0.url),options={hash:{},data:data},helper ? helper.call(depth0, "task#edit", (depth0 && depth0.id), options) : helperMissing.call(depth0, "url", "task#edit", (depth0 && depth0.id), options)))
    + "\">Edit</a>\n	<a class=\"btn\" href=\""
    + escapeExpression((helper = helpers.url || (depth0 && depth0.url),options={hash:{},data:data},helper ? helper.call(depth0, "task#destroy", (depth0 && depth0.id), options) : helperMissing.call(depth0, "url", "task#destroy", (depth0 && depth0.id), options)))
    + "\">Destroy</a>\n	<hr />\n	<i class=\"modified\">created: ";
  if (helper = helpers.created) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.created); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</i>\n	<i class=\"modified\">modified: ";
  if (helper = helpers.modified) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.modified); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</i>\n</div>";
  return buffer;
  });
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/templates/task", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "", helper, options;
  buffer += "\r\n			<a class=\"btn\" href=\""
    + escapeExpression((helper = helpers.url || (depth0 && depth0.url),options={hash:{},data:data},helper ? helper.call(depth0, "task#done", (depth0 && depth0.id), options) : helperMissing.call(depth0, "url", "task#done", (depth0 && depth0.id), options)))
    + "\">Done</a>\r\n			<a class=\"btn\" href=\""
    + escapeExpression((helper = helpers.url || (depth0 && depth0.url),options={hash:{},data:data},helper ? helper.call(depth0, "task#start", (depth0 && depth0.id), options) : helperMissing.call(depth0, "url", "task#start", (depth0 && depth0.id), options)))
    + "\">Start</a>\r\n		";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", helper, options;
  buffer += "\r\n			<a class=\"btn\" href=\""
    + escapeExpression((helper = helpers.url || (depth0 && depth0.url),options={hash:{},data:data},helper ? helper.call(depth0, "task#done", (depth0 && depth0.id), options) : helperMissing.call(depth0, "url", "task#done", (depth0 && depth0.id), options)))
    + "\">Done</a>\r\n			<a class=\"btn\" href=\""
    + escapeExpression((helper = helpers.url || (depth0 && depth0.url),options={hash:{},data:data},helper ? helper.call(depth0, "task#tonew", (depth0 && depth0.id), options) : helperMissing.call(depth0, "url", "task#tonew", (depth0 && depth0.id), options)))
    + "\">Reset to new</a>\r\n		";
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = "", helper, options;
  buffer += "\r\n			<a class=\"btn\" href=\""
    + escapeExpression((helper = helpers.url || (depth0 && depth0.url),options={hash:{},data:data},helper ? helper.call(depth0, "task#tonew", (depth0 && depth0.id), options) : helperMissing.call(depth0, "url", "task#tonew", (depth0 && depth0.id), options)))
    + "\">Reset to new</a>\r\n			<a class=\"btn\" href=\""
    + escapeExpression((helper = helpers.url || (depth0 && depth0.url),options={hash:{},data:data},helper ? helper.call(depth0, "task#resume", (depth0 && depth0.id), options) : helperMissing.call(depth0, "url", "task#resume", (depth0 && depth0.id), options)))
    + "\">Resume</a>\r\n		";
  return buffer;
  }

  buffer += "<li id=\"";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" class=\"task ";
  if (helper = helpers.status) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.status); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"   draggable=\"true\" ondragstart=\"drag(event)\">\r\n	<b>";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</b>\r\n	<p><i>[";
  if (helper = helpers.status) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.status); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "]</i></p>\r\n	<div class=\"status-opt\">\r\n		";
  stack1 = (helper = helpers.equal || (depth0 && depth0.equal),options={hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.status), "new", options) : helperMissing.call(depth0, "equal", (depth0 && depth0.status), "new", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n		";
  stack1 = (helper = helpers.equal || (depth0 && depth0.equal),options={hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.status), "inProgress", options) : helperMissing.call(depth0, "equal", (depth0 && depth0.status), "inProgress", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n		";
  stack1 = (helper = helpers.equal || (depth0 && depth0.equal),options={hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.status), "done", options) : helperMissing.call(depth0, "equal", (depth0 && depth0.status), "done", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n	</div>\r\n	<a class=\"btn\" href=\""
    + escapeExpression((helper = helpers.url || (depth0 && depth0.url),options={hash:{},data:data},helper ? helper.call(depth0, "task#show", (depth0 && depth0.id), options) : helperMissing.call(depth0, "url", "task#show", (depth0 && depth0.id), options)))
    + "\">Show</a>\r\n	<a class=\"btn\" href=\""
    + escapeExpression((helper = helpers.url || (depth0 && depth0.url),options={hash:{},data:data},helper ? helper.call(depth0, "task#edit", (depth0 && depth0.id), options) : helperMissing.call(depth0, "url", "task#edit", (depth0 && depth0.id), options)))
    + "\">Edit</a>\r\n	<a class=\"btn\" href=\""
    + escapeExpression((helper = helpers.url || (depth0 && depth0.url),options={hash:{},data:data},helper ? helper.call(depth0, "task#destroy", (depth0 && depth0.id), options) : helperMissing.call(depth0, "url", "task#destroy", (depth0 && depth0.id), options)))
    + "\">Destroy</a>\r\n	<i class=\"modified\">";
  if (helper = helpers.modified) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.modified); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</i>\r\n</li>\r\n";
  return buffer;
  });
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;
//# sourceMappingURL=app.js.map