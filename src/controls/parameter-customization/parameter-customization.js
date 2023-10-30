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
                var name = args.parameterModel.Name;
                var $targetTag = $('#' + args.containerId);
                var $dateTime = ej.buildTag("input", "", "", { 'id': args.parameterModel.ControlId, 'name': 'EndDate', 'type': 'text', 'style': 'width: 100%' });
                $targetTag.append($dateTime);
                var datetimepicker = new ejs.calendars.DateTimePicker({
                    value: args.parameterModel._dateValue,
                    open: function (args) {
                        var btn = ej.buildTag("div.e-dt-button e-btn e-dt-button e-btn e-select e-flate-flat mr-1", "NULL", "", { id: "null-btn-v2" });
                        if (args.popup.element.className.includes('null')) {
                            args.popup.element.firstChild.lastChild.prepend(btn[0]);
                        }
                        btn[0].addEventListener('click', function () {
                            datetimepicker.value = null;
                            datetimepicker.placeholder = 'Null';
                        });
                    },
                    change: function (args) {
                        var data = datetimepicker.value;
                        var updateParam = {
                            name: name,
                            labels: [data],
                            values: [data]
                        };
                        $('#container').data('boldReportViewer').updateParameter(updateParam);
                    }
                });
                datetimepicker.appendTo($dateTime[0])
                var endDateInst = document.querySelector('[name="EndDate"]').ej2_instances[0];
                var switchBaseTag = ej.buildTag("input", null, null, { 'id': endDateInst.element.id + '_parameter_disable_switch', 'type': 'checkbox', 'name': 'chkDateTime', 'value': this._id, 'style': 'margin-top:8px' });
                if (document.querySelectorAll("#" + endDateInst.element.id + '_parameter_disable_switch').length == 0) {
                    $("#" + endDateInst.element.id + "_div").append(switchBaseTag);
                    var switchObj = new ejs.buttons.Switch({ checked: false, cssClass: "switchstyle" });
                    switchObj.appendTo($('#' + endDateInst.element.id + '_parameter_disable_switch')[0]);
                    switchObj.addEventListener('change', function (args) {
                        endDateInst.enabled = !switchObj.checked;
                    })
                }
                args.handled = true;
            }
        },
        toolbarSettings: window.Globals.TOOLBAR_OPTIONS,
        toolBarItemClick: window.Globals.EDIT_REPORT,
        exportItemClick: window.Globals.EXPORT_ITEM_CLICK,
    });
});