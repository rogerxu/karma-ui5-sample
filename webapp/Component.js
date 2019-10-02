sap.ui.define([
  "sap/ui/core/UIComponent",
  "./util/ServiceUtils"
], function (UIComponent, ServiceUtils) {
  "use strict";

  return UIComponent.extend("demo.app.sample.Component", {

    metadata: {
      "manifest": "json"
    },

    /**
     * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
     * @public
     * @override
     */
    init: function () {
      // call the base component's init function
      UIComponent.prototype.init.apply(this, arguments);

      // enable routing
      this.getRouter().initialize();

      // initialize
      ServiceUtils.init({
        component: this
      });
    },

    getComponentName: function () {
      return this.getManifestObject().getComponentName();
    }
  });
});
