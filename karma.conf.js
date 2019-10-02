module.exports = (config) => {
  const version = '1.69.0';
  const shortVersion = version.slice(0, version.lastIndexOf('.')); // '1.65.9' => '1.65'

  const ui5Urls = {
    public: `https://sapui5.hana.ondemand.com/${version}`,
  };

  const ui5Url = process.env.UI5_URL || ui5Urls.public;
  console.log(ui5Url);

  config.set({

    frameworks: ['ui5'],

    ui5: {
      url: ui5Url,
      testpage: '/base/test-resources/testsuite.qunit.html',
    },

    proxies: {
      '/base/resources': '/base/webapp/resources',
      '/base/test-resources': '/base/webapp/test',
    },

    browsers: ['Chrome'],

    browserDisconnectTimeout: 60000,

    browserNoActivityTimeout: 120000,

    logLevel: config.LOG_INFO
  });
};
