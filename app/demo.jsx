define(function(require, exports, module) {
    
    var React = require('react');
    
    var AppView = React.createClass({
        render: function() {
            return (<div>
                <p>Hello, React!</p>
            </div>);
        }
    });
    
    exports.init = function() {
        React.render(<AppView />, document.body);
    };
    
});