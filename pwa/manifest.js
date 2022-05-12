const path = require('path');

module.exports = {
  name: 'random youtube',
  short_name: 'random youtube',
  display: 'standalone',
  description: 'random youtube recomandation',
  start_url: '.',
  scope: '.',
  icons: [
    {
      src: path.resolve(__dirname, 'logos/512x512.png'),
      sizes: '512x512',
      type: 'image/png',
    }, {
      src: path.resolve(__dirname, 'logos/192x192.png'),
      sizes: '192x192',
      type: 'image/png',
    },
  ],
};
