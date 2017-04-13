define('app',['exports', 'aurelia-framework', 'aurelia-event-aggregator'], function (exports, _aureliaFramework, _aureliaEventAggregator) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.App = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var App = exports.App = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator), _dec(_class = function App(eventAggregator) {
        _classCallCheck(this, App);

        this.eventAggregator = eventAggregator;

        this.selectedChannel = null;
    }) || _class);
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('main',['exports', './environment'], function (exports, _environment) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.configure = configure;

    var _environment2 = _interopRequireDefault(_environment);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function configure(aurelia) {
        aurelia.use.standardConfiguration().plugin('aurelia-ui-virtualization').feature('resources');

        if (_environment2.default.debug) {
            aurelia.use.developmentLogging();
        }

        if (_environment2.default.testing) {
            aurelia.use.plugin('aurelia-testing');
        }

        aurelia.start().then(function () {
            return aurelia.setRoot();
        });
    }
});
define('channel-list/channel-list',['exports', 'aurelia-framework', 'aurelia-event-aggregator'], function (exports, _aureliaFramework, _aureliaEventAggregator) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ChannelList = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var ChannelList = exports.ChannelList = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator), _dec(_class = function ChannelList() {
    _classCallCheck(this, ChannelList);
  }) || _class);
});
define('channel-viewer/channel-viewer',['exports', 'aurelia-framework', 'aurelia-event-aggregator'], function (exports, _aureliaFramework, _aureliaEventAggregator) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.ChannelViewer = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var ChannelViewer = exports.ChannelViewer = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator), _dec(_class = function () {
        function ChannelViewer() {
            _classCallCheck(this, ChannelViewer);
        }

        ChannelViewer.prototype.activate = function activate(channel) {
            console.log(channel);
        };

        return ChannelViewer;
    }()) || _class);
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <header>Nav</header>\n  <aside>\n    <compose view-model=\"./channel-list/channel-list\"></compose>\n  </aside>\n  <article>\n    <compose view-model=\"./channel-viewer/channel-viewer\" model.bind=\"selectedChannel\"></compose>\n  </article>\n</template>\n"; });
define('text!channel-list/channel-list.css', ['module'], function(module) { module.exports = ""; });
define('text!channel-list/channel-list.html', ['module'], function(module) { module.exports = "<template>\n    <require from=\"./channel-list.css\"></require>\n    <h1>Hello channel list!</h1>\n    <nav>\n      <ul>\n        <li>Nav item</li>\n      </ul>\n    </nav>\n</template>"; });
define('text!channel-viewer/channel-viewer.css', ['module'], function(module) { module.exports = ""; });
define('text!channel-viewer/channel-viewer.html', ['module'], function(module) { module.exports = "<template>\n    <require from=\"./channel-viewer.css\"></require>\n    <h1>Hello channel viewer!</h1>\n    <h1>Channel title</h1>\n    <ul>\n      <li>Channel entry</li>\n    </ul>\n</template>"; });
//# sourceMappingURL=app-bundle.js.map