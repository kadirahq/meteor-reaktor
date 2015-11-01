var FlowRouter = null;
if(Package['kadira:flow-router']) {
  FlowRouter = Package['kadira:flow-router'].FlowRouter;
} else if(Package['kadira:flow-router-ssr']) {
  FlowRouter = Package['kadira:flow-router-ssr'].FlowRouter
} else {
  throw new Error("Reaktor needs FlowRouter 2.0 or the SSR version");
}

Reaktor = {
  init: function(el) {
    if(Meteor.isClient) {
      // Here we just need to render it.
      // No need to display the output.
      var dom = $('<div></div>');
      ReactDOM.render(el, dom.get(0));
    } else {
      ReactDOMServer.renderToString(el);
    }
  }
};

Router = React.createClass({
  render() {
    return <div>
      {this.props.children}
    </div>;
  }
});

Route = React.createClass({
  componentWillMount() {
    var props = this.props;
    var layoutContent = {};
    var routeOptions = {};
    _.each(props, function(value, key) {
      if(value.prototype && value.prototype.render) {
        // this is React component
        layoutContent[key] = value;
      } else {
        // then it's should be routeOption
        routeOptions[key] = value;
      }
    });

    routeOptions.action = function() {
      var context = FlowRouter.current();
      var regions = {};
      _.each(layoutContent, function(value, key) {
        regions[key] = React.createElement(value, context);
      });

      ReactLayout.render(props.layout, regions);
    };

    ["triggersEnter", "triggersExit"].forEach((type) => {
      var triggers = props[type];
      if(triggers) {
        if(typeof triggers === "function") {
          triggers = [triggers];
        }
        routeOptions[type] = triggers;
      }
    });

    FlowRouter.route(props.path, routeOptions);
  },
  render() {
    return false;
  }
});
