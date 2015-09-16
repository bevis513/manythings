define(function(require) {
    var React = require('react');
    var Router = require('react-router');
    var routes = require('jsx!./routers');
    
    Router.run(routes, function(Handler) {
        React.render(<Handler/>, document.body);
    });
});