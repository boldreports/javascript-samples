$(function () {
    $("#container").boldReportViewer({
        // Specifies the report Web API service URL. It is used to process the reports.
        reportServiceUrl: window.Globals.SERVICE_URL,
        // Specifies the path of the RDL report file
        reportPath: 'multi-language-report.rdl',
        toolbarSettings: {
            customGroups: window.Globals.TOOLBAR_OPTIONS.customGroups,
            toolbars: ej.ReportViewer.Toolbars.All & ~ej.ReportViewer.Toolbars.Vertical
        },
        toolBarItemClick: window.Globals.EDIT_REPORT,
        exportItemClick: window.Globals.EXPORT_ITEM_CLICK,
        parameterSettings: { hideParameterBlock: true }
    });
    const languagesList = [{ Name: "English", languageId: "en-US" }, { Name: "French", languageId: "fr-CA" }, { Name: "German", languageId: "de-DE" }, { Name: "Hindi", languageId: "hi-IN" }, { Name: "Spanish", languageId: "es-ES" }, { Name: "Dutch", languageId: "nl-NL" }, { Name: "Korean", languageId: "ko-KR" }, { Name: "Hebrew", languageId: "he-IL" }, { Name: "Russian", languageId: "ru-RU" }];
    ejs.popups.createSpinner({ target: document.getElementById("spinner-container") });
    ejs.popups.showSpinner(document.getElementById("spinner-container"));
    const languages = new ejs.dropdowns.DropDownList({
        dataSource: languagesList,
        fields: {
            text: "Name",
            value: "languageId",
        },
        index: 0,
        width: "180px",
        height: "10px",
        showClearButton: false
    });
    languages.appendTo('#languages');
    ejs.popups.hideSpinner(document.getElementById("spinner-container"));
    $("#r-w-property-title, .r-w-genearte").css("display", "block");
    $(".r-w-property").css("display", "inline-flex");
    $("#update").on("click", function () {
        const reportViewer = $("#container").boldReportViewer("instance");
        const selectedLanguageId = languages.value.toString();
        const selectedLanguage = languagesList.find(lang => lang.languageId === selectedLanguageId);
        const parameters = [{ name: 'Language', labels: [selectedLanguage.Name], values: [selectedLanguage.Name] }];
        reportViewer.model.parameters = parameters;
        reportViewer.reload();
        reportViewer.setModel({'locale': selectedLanguageId});
    });
});