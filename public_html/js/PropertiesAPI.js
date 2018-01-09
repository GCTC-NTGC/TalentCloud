var PropertiesAPI = {};

PropertiesAPI.populateHelpContent = function(data) {
    var debug = true;

    //debug?console.log(data):null;

    for (var h in data) {

        for (var i in data[h]) {
            var helpElement = document.getElementById(data[h][i].key);
            helpElement ? helpElement.setAttribute("title", data[h][i].value) : null;
        }
    }
};

PropertiesAPI.getHelpContent = function(langCode) {

    var propertiesFile_url = "/data/json/help_" + langCode + ".json";

    var jsonData = "";

    var xhr = new XMLHttpRequest();

    xhr.open('GET', propertiesFile_url, true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                jsonData = JSON.parse(xhr.responseText);
                PopulateHelpContent(jsonData);
            }
        }
    };

    xhr.send(null);

};