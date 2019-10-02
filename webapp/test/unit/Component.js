sap.ui.define([
  "sap/ui/thirdparty/sinon",
  "demo/app/sample/Component"
], function(sinon, Component) {
  "use strict";

  var sandbox = sinon.sandbox.create();

  QUnit.module("Component", {
    beforeEach: function() {

    },
    afterEach: function() {
      sandbox.restore();
    }
  });

  QUnit.test("Test case", function(assert) {
    // Arrange
    sandbox.stub(Component.prototype, "createContent");

    // Act
    var COMPONENT_NAME = "demo.app.sample";
    var component = new Component();
    var componentName = component.getComponentName();

    // Assert
    assert.strictEqual(componentName, COMPONENT_NAME, "component name is correct");
  });

});
