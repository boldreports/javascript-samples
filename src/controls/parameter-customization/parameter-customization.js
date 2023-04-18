/**
 * Parameter Customization - This sample demonstrates the parameter customization for product sales details information based on category and sub category of products report parameters.
 */

$(function () {
    $("#container").boldReportViewer({
        // Specifies the report Web API service URL. It is used to process the reports.
        reportServiceUrl: window.Globals.SERVICE_URL,
        // Specifies the path of the RDL report file
        reportPath: 'product-line-sales.rdl',
        beforeParameterAdd: function (args) {
            args.parameterSettings.dateTimePickerType = "DateTime";
            args.parameterSettings.dateTimeFormat = "MM/dd/yyyy hh:mm tt";
            args.parameterSettings.timeDisplayFormat = "HH:mm";
            args.parameterSettings.timeInterval = 60;
            if (args.parameterModel.Name === "EndDate") {
                var $targetTag = $('#' + args.containerId);
                var $dateTime = ej.buildTag("input", "", "", { 'id': args.parameterModel.ControlId, 'type': 'text', 'style': 'width: 100%' });
                $targetTag.append($dateTime);
                var name = args.parameterModel.Name;
                $dateTime.ejDateTimePicker({
                    timePopupWidth: 150,
                    value: args.parameterModel._dateTimeValue,
                    open: function (args) {
                        var picker = this;
                        var container = $('#' + this._id + '_popup');
                        if ($(container).find('#null-btn').length == 0) {
                            var btn = ej.buildTag("div.e-dt-button e-btn e-dt-button e-btn e-select e-flate-flat", "NULL", "", { id: "null-btn", style: "margin-left:4px;margin-right:4px;display:inline" });
                            btn.click(function (args) {
                                picker._doneClick();
                                picker.setModel({ 'value': null, 'watermarkText': 'Null' });
                            });
                            $(container).find('.e-button-container').append(btn);
                        }
                    },
                    change: function (args) {
                        var data = this.getValue();
                        var updateParam = {
                            name: name,
                            labels: [data],
                            values: [data]
                        };
                        $('#container').data('boldReportViewer').updateParameter(updateParam);
                    }
                });
                var parameterNull = ej.buildTag("input", null, null, { 'id': args.parameterModel.ControlId + '_chk', 'type': 'checkbox', 'name': 'chkDateTime', 'value': this._id, 'style': 'margin-top:8px' });
                $targetTag.append(parameterNull);
                // Initialize EJ2 Switch
                var switchObj = new ejs.buttons.Switch({ onLabel: 'ON', offLabel: 'OFF', checked: false, cssClass: "switchstyle" });
                switchObj.appendTo($('#' + args.parameterModel.ControlId + '_chk')[0]);
                switchObj.addEventListener('change', function (args) {
                    var id = this.element.id.replace("_chk", "");
                    if (this.element.name === "chkDateTime") {
                        var dateTime = $('#' + id).data("ejDateTimePicker");
                    } else {
                        dateTime = $('#' + id).data("ejDatePicker");
                    }
                    dateTime.option("enabled", !this.checked);
                });
                args.handled = true;
            }
        },
        toolbarSettings: window.Globals.TOOLBAR_OPTIONS,
        toolBarItemClick: window.Globals.EDIT_REPORT,
        exportItemClick: window.Globals.EXPORT_ITEM_CLICK,
    });
});
