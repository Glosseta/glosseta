const path = require("path");

module.exports = {
  i18n: {
    defaultLocale: "en",
    locales: ["de", "en", "es", "fr", "pt", "ru", "zh"],
    localePath: path.resolve("./public/locales"),
  },
};
