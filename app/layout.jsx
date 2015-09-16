define(function(require, exports, module) {

    var React = require('react'),
        Router = require('react-router');

    var ReactBootstrap = require('react-bootstrap'),
        Navbar = ReactBootstrap.Navbar,
        Nav = ReactBootstrap.Nav;

    var ReactRouterBootstrap = require('react-router-bootstrap'),
        NavItemLink = ReactRouterBootstrap.NavItemLink;
    
    module.exports = React.createClass({
        render: function() {
            return (<div>
                <Navbar brand='Manythings' toggleNavKey={0}>
                    <Nav eventKey={0}>
                        <NavItemLink to="view1">View1</NavItemLink>
                        <NavItemLink to="view2">View2</NavItemLink>
                    </Nav>
                </Navbar>
                
                <div className="container">
                    <Router.RouteHandler />
                </div>
            </div>);
        }
    });

});