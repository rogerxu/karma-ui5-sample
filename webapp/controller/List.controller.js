sap.ui.define([
  "./BaseController",
  "sap/base/Log",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterOperator",
  "../util/ServiceUtils"
], function (BaseController, Log, Filter, FilterOperator, ServiceUtils) {
  "use strict";

  return BaseController.extend("demo.app.sample.controller.List", {

    onInit: function () {
    },

    onAfterRendering: function () {
      this.updateData();
    },

    updateData: function () {
      var dataSource = ServiceUtils.getDataSource("jsonService");
      var url = ServiceUtils.getUrl(dataSource.uri);
      ServiceUtils.getJSON(url)
        .then(function (data) {
          Log.info("data size:" + data.items.length);
        });
    },

    /**
     * Triggered by the table's 'updateFinished' event: after new table
     * data is available, this handler method updates the table counter.
     * This should only happen if the update was successful, which is
     * why this handler is attached to 'updateFinished' and not to the
     * table's list binding's 'dataReceived' method.
     * @param {sap.ui.base.Event} oEvent the update finished event
     * @public
     */
    onUpdateFinished: function (oEvent) {
      // update the worklist's object counter after the table update
      var sTitle,
        oTable = oEvent.getSource(),
        iTotalItems = oEvent.getParameter("total");

      // only update the counter if the length is final and
      // the table is not empty
      if (iTotalItems && oTable.getBinding("items").isLengthFinal()) {
        sTitle = this.getResourceBundle().getText("worklistTableTitleCount", [iTotalItems]);
      } else {
        sTitle = this.getResourceBundle().getText("worklistTableTitle");
      }
      this.getModel("worklistView").setProperty("/worklistTableTitle", sTitle);
    },

    onSearch: function (oEvent) {
      if (oEvent.getParameters().refreshButtonPressed) {
        // Search field's 'refresh' button has been pressed.
        // This is visible if you select any master list item.
        // In this case no new search is triggered, we only
        // refresh the list binding.
        this.onRefresh();
      } else {
        var aTableSearchState = [];
        var sQuery = oEvent.getParameter("query");

        if (sQuery && sQuery.length > 0) {
          aTableSearchState = [new Filter("deliveryId", FilterOperator.Contains, sQuery)];
        }
        this._applySearch(aTableSearchState);
      }
    },

    /**
     * Event handler for refresh event. Keeps filter, sort
     * and group settings and refreshes the list binding.
     * @public
     */
    onRefresh: function () {
      var oTable = this.byId("table");
      oTable.getBinding("items").refresh();
    },

    /* =========================================================== */
    /* internal methods                                            */
    /* =========================================================== */

    /**
     * Shows the selected item on the object page
     * On phones a additional history entry is created
     * @param {sap.m.ObjectListItem} oItem selected Item
     * @private
     */
    _showObject: function (oItem) {
      this.getRouter().navTo("object", {
        objectId: oItem.getBindingContext().getProperty("id")
      });
    },

    /**
     * Internal helper method to apply both filter and search state together on the list binding
     * @param {sap.ui.model.Filter[]} aTableSearchState An array of filters for the search
     * @private
     */
    _applySearch: function (aTableSearchState) {
      var oTable = this.byId("table"),
        oViewModel = this.getModel("worklistView");

      oTable.getBinding("items").filter(aTableSearchState, "Application");

      // changes the noDataText of the list in case there are no filter results
      if (aTableSearchState.length !== 0) {
        oViewModel.setProperty("/tableNoDataText", this.getResourceBundle().getText("worklistNoDataWithSearchText"));
      }
    }
  });
});
