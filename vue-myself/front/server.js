const { Nuxt, Builder } = require('nuxt');

const app = require('express')();
const isProd = (process.env.NODE_ENV === 'production');
const port = process.env.PORT || 3000;

// We instantiate Nuxt.js with the options
const config = require('./nuxt.config.js');
config.dev = !isProd;
const nuxt = new Nuxt(config);

// Render every route with Nuxt.js
app.use(nuxt.render);

// Build only in dev mode with hot-reloading
if (config.dev) {
  new Builder(nuxt).build()
    .then(listen);
} else {
  listen();
}

function listen() {
  // Listen the server
  if (isProd) {
    const lex = require('greenlock-express').create({
      version: 'draft-11',
      configDir: '/etc/letsencrypt',
      server: 'https://acme-v02.api.letsencrypt.org/directory',
      email: 'doeun826@kakao.com',
      store: require('greenlock-store-fs'),
      approveDomains: (opts, certs, cb) => {
        if (certs) {
          opts.domains = ['api.daycatcher.site'];
        } else {
          opts.email = 'doeun826@kakao.com';
          opts.agreeTos = true;
        }
        cb(null, { options: opts, certs });
      },
      renewWithin: 81 * 24 * 60 * 60 * 1000,
      renewBy: 80 * 24 * 60 * 60 * 1000,
    });
    https.createServer(lex.httpsOptions, lex.middleware(app)).listen(443);
    http.createServer(lex.middleware(require('redirect-https')())).listen(80);
  } else {
    app.listen(port, () => {
      console.log(`server is running on ${port}`);
    });
  }
}
