define(function(require, exports, module) {
    var React = require('react'),
        ReactBootstrap = require('react-bootstrap'),
        Button = ReactBootstrap.Button,
        Modal = ReactBootstrap.Modal;
    
    module.exports = React.createClass({
        getInitialState: function() {
            return {
                showModal: false
            };
        },
        showModalDialog: function() {
            var state = this.state;
            state.showModal = true;
            this.setState(state);
        },
        closeModal: function() {
            var state = this.state;
            state.showModal = false;
            this.setState(state);
        },
        render: function() {
            return (<div>
                <p>View2</p>
                <Button bsStyle="primary" onClick={this.showModalDialog}>Show Modal Dialog</Button>
                
                <Modal show={this.state.showModal} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Modal Body....</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.closeModal}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>);
        }
    });
});