const i18next = require('i18next');
const Backend = require('i18next-fs-backend');
const middleware = require('i18next-http-middleware');
const path = require('path');

i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: 'en',
    supportedLngs: ['en', 'ar'],
    backend: {
      loadPath: path.join(__dirname, '../locales/{{lng}}/translation.json')
    },
    detection: {
      order: ['querystring', 'cookie', 'header'],
      lookupQuerystring: 'lang',
      lookupCookie: 'i18next',
      lookupHeader: 'accept-language',
      caches: ['cookie']
    }
  });

module.exports = {
  i18nextMiddleware: middleware.handle(i18next)
}; 