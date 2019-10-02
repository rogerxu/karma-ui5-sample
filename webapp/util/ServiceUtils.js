sap.ui.define([
  "jquery.sap.global",
  "sap/base/strings/formatMessage"
], function(jQuery, formatMessage) {
  "use strict";

  var ServiceUtils = {};

  var component;

  ServiceUtils.init = function(options) {
    component = options.component;
  };

  ServiceUtils.getDataSource = function(name) {
    var dataSource = component.getManifestEntry(formatMessage("/sap.app/dataSources/{0}", name));

    return dataSource;
  };

  ServiceUtils.getUrl = function(path) {
    var manifestObject = component.getManifestObject();
    var componentName = manifestObject.getComponentName();
    var url = sap.ui.require.toUrl([componentName.replace(/\./g, "/"), path].join("/"));
    return url;
  };

  ServiceUtils.getJSON = function(url) {
    return jQuery.getJSON(url);
  };

  return ServiceUtils;
});
