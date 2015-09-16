define(function(require, exports, module) {
    
    var React = require('react'),
        Router = require('react-router');
        
    var Layout = require('jsx!./layout'),
        View1 = require('jsx!./view1'),
        View2 = require('jsx!./view2');
    
    return (<Router.Route name="index" path="/" handler={Layout}>
        <Router.DefaultRoute name="view1" path="/view1" handler={View1}/>
        <Router.Route name="view2" path="/view2" handler={View2}/>
    </Router.Route>);

});