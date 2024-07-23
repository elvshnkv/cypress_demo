const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
      baseUrl: 'https://www.saucedemo.com',
  },
    // env: {
    //     USER_PASSWORD: 'secret_sauce'
    // }
});
