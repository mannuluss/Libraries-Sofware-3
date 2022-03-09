export const environment = {
  production: true,
  storeUrl:
    window['env']['storeUrl'] || 'http://localhost:8082',
  reviewsUrl:
    window['env']['reviewsUrl'] || 'http://localhost:8082',
  catalogUrl:
    window['env']['catalogUrl'] || 'http://localhost:8082'
};
