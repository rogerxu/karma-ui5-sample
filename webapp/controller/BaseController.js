sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/core/UIComponent"
], function(Controller, UIComponent) {
  "use strict";

  return Controller.extend("demo.app.sample.controller.BaseController", {
    /**
     * Get startup parameters of component
     *
     * @returns {Object} The startup parameters
     */
    getStartupParameters: function() {
      var startupParameters = {};
      var component = this.getOwnerComponent();
      var componentData = component.getComponentData();

      if (componentData) {
        startupParameters = componentData.startupParameters;
      }

      return startupParameters;
    },

    /**
     * Convenience method for accessing the router.
     * @public
     * @returns {sap.ui.core.routing.Router} the router for this component
     */
    getRouter: function() {
      return UIComponent.getRouterFor(this);
    },

    /**
     * Convenience method for getting the view model by name.
     * @public
     * @param {string} [name] the model name
     * @returns {sap.ui.model.Model} the model instance
     */
    getModel: function(name) {
      return this.getView().getModel(name);
    },

    /**
     * Convenience method for setting the view model.
     * @public
     * @param {sap.ui.model.Model} model the model instance
     * @param {string} name the model name
     * @returns {sap.ui.mvc.View} the view instance
     */
    setModel: function(model, name) {
      return this.getView().setModel(model, name);
    },

    /**
     * Getter for the resource bundle.
     * @public
     * @returns {sap.ui.model.resource.ResourceModel} the resourceModel of the component
     */
    getResourceBundle: function() {
      return this.getOwnerComponent().getModel("i18n").getResourceBundle();
    },

    /**
     * Get component config
     * @returns {Object} The component config object
     */
    getComponentConfig: function() {
      var component = this.getOwnerComponent();
      return component.getManifestEntry("/sap.ui5/config");
    }
  });
});
