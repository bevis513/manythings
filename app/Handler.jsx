define(function(require, exports, module) {

    var React = require('react'),
        dp = require('app/dataprovider'),
        $ = require('jquery'),
        jqUI = require('jqueryui'),
        primitives = require('primitives');
    
    module.exports = React.createClass({
        /*getInitialState: function() {
            
        },
        componentWillMount: function() {
            
        },*/
        componentDidMount: function() {
            var self = this;
            var promise = dp.get();
            promise.then(function(items) {
                var options = new primitives.orgdiagram.Config();
                items = items.map(function(item, idx) {
                    if (0 === idx) {
                        item.templateName = 'contactTemplate';
                    }
                    return new primitives.orgdiagram.ItemConfig(item);
                });
                options.items = items;
                options.cursorItem = 0;
                options.templates = [getContactTemplate(), getDefaultTemplate()];
                options.onItemRender = onTemplateRender;
                
                var buttons = [];
                buttons.push(new primitives.orgdiagram.ButtonConfig("delete", "ui-icon-close", null));
                buttons.push(new primitives.orgdiagram.ButtonConfig("properties", "ui-icon-gear", "Info"));
                buttons.push(new primitives.orgdiagram.ButtonConfig("add", "ui-icon-person", "Add"));
                
                options.hasButtons = primitives.common.Enabled.Auto;
                options.hasSelectorCheckbox = primitives.common.Enabled.False;
                options.buttons = buttons;
                options.pageFitMode = 3; // Fit to page
                options.defaultTemplateName = "defaultTemplate";
                
                options.onButtonClick = onButtonClick;

                options.onCursorChanging = onCursorChanging;
                /*options.onCursorChanged = onCursorChanged;
                options.onHighlightChanging = onHighlightChanging;
                options.onHighlightChanged = onHighlightChanged;
                options.onSelectionChanged = onSelectionChanged;*/
                
                $(React.findDOMNode(self)).orgDiagram(options);
            });
            
            function onTemplateRender(event, data) {
                switch (data.renderingMode) {
                    case primitives.common.RenderingMode.Create:
                        data.element.find("[name=email]").click(function (e) {
                            /* Block mouse click propogation in order to avoid layout updates before server postback*/
                            primitives.common.stopPropagation(e);
                        });
                        /* Initialize widgets here */
                        break;
                    case primitives.common.RenderingMode.Update:
                        /* Update widgets here */
                        break;
                }

                var itemConfig = data.context,
                    itemTitleColor = itemConfig.itemTitleColor != null ? itemConfig.itemTitleColor : primitives.common.Colors.RoyalBlue;

                if (data.templateName == "contactTemplate") {
                    data.element.find("[name=photo]").attr({ "src": itemConfig.image });
                    data.element.find("[name=titleBackground]").css({ "background": itemTitleColor });
                    data.element.find("[name=email]").attr({ "href": ("mailto:" + itemConfig.email + "?Subject=Hello%20world") });

                    var fields = ["title", "description", "phone", "email"];
                    for (var index = 0; index < fields.length; index += 1) {
                        var field = fields[index];

                        var element = data.element.find("[name=" + field + "]");
                        if (element.text() != itemConfig[field]) {
                            element.text(itemConfig[field]);
                        }
                    }
                }
            }
            
            function getDefaultTemplate() {
                var result = new primitives.orgdiagram.TemplateConfig();
                result.name = "defaultTemplate";

                // If we don;t change anything in template all its properties assigned to default values
                // So we change only default dot size and corner radius
                result.minimizedItemSize = new primitives.common.Size(3, 3);
                result.minimizedItemCornerRadius = null;
                result.highlightPadding = new primitives.common.Thickness(2, 2, 2, 2);

                return result;
            }

            function getContactTemplate() {
                var result = new primitives.orgdiagram.TemplateConfig();
                result.name = "contactTemplate";

                result.itemSize = new primitives.common.Size(220, 120);
                result.minimizedItemSize = new primitives.common.Size(3, 3);
                result.minimizedItemCornerRadius = null;
                result.highlightPadding = new primitives.common.Thickness(2, 2, 2, 2);


                var itemTemplate = jQuery(
                  '<div class="bp-item bp-corner-all bt-item-frame">'
                    + '<div name="titleBackground" class="bp-item bp-corner-all bp-title-frame" style="top: 2px; left: 2px; width: 216px; height: 20px;">'
                        + '<div name="title" class="bp-item bp-title" style="top: 3px; left: 6px; width: 208px; height: 18px;">'
                        + '</div>'
                    + '</div>'
                    + '<div class="bp-item bp-photo-frame" style="top: 26px; left: 2px; width: 50px; height: 60px;">'
                        + '<img name="photo" style="height: 60px; width:50px;" />'
                    + '</div>'
                    + '<div name="phone" class="bp-item" style="top: 26px; left: 56px; width: 162px; height: 18px; font-size: 12px;"></div>'
                    + '<div class="bp-item" style="top: 44px; left: 56px; width: 162px; height: 18px; font-size: 12px;"><a name="email" href="" target="_top"></a></div>'
                    + '<div name="description" class="bp-item" style="top: 62px; left: 56px; width: 162px; height: 36px; font-size: 10px;"></div>'
                + '</div>'
                ).css({
                    width: result.itemSize.width + "px",
                    height: result.itemSize.height + "px"
                }).addClass("bp-item bp-corner-all bt-item-frame");
                result.itemTemplate = itemTemplate.wrap('<div>').parent().html();

                return result;
            }
            
            function onButtonClick(e, data) {
                var message = "User clicked <b>'" + data.name + "'</b> button for item <b>'" + data.context.title + "'</b>.";
                message += (data.parentItem != null ? " Parent item <b>'" + data.parentItem.title + "'" : "");
                
                $('<div>' + message + '</div>').dialog({
                    modal: true,
                    resizable: false,
                    closeOnEscape: true,
                    close: function() {
                        $(this).dialog('destroy');
                    },
                    buttons: {
                        Ok: function() {
                            $(this).dialog('destroy');
                        }
                    }
                });
            }
            
            function onCursorChanging(e, data) {
                data.oldContext.templateName = null;
                data.context.templateName = "contactTemplate";
            }

        },
        render: function() {
            var styles = {
                position: 'absolute',
                left: '0',
                right: '0',
                top: '0',
                bottom: '0'
            };
            return (<div style={styles}></div>);
        }
    });

});