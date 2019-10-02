sap.ui.define(function() {
  "use strict";

  return {
    defaults: {
      coverage: {
        only: ["demo/app/sample"]
      },
      ui5: {
        libs: ["sap.m"]
      },
      loader: {
        paths: {
          "demo/app/sample": "/base/webapp"
        }
      }
    },

    tests: {
      "unitTests": {
        module: "./unit/unitTests.qunit",
        title: "QUnit Tests"
      }
      // "opaTests": {
      //   module: "./integration/opaTests.qunit",
      //   title: "OPA5 Tests"
      // },
    }
  };
});
