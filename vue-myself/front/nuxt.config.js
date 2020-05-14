module.exports = {
  head: {
    title: '데이캐쳐 - 나의 기록',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no,viewport-fit=cover' },
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
      { name: 'description', content: 'daycatcher' },
      { name: 'og:title', content: 'daycatcher' },
      { name: 'description', content: 'daycatcher' },
      { property: 'og:type', content: 'website' },
      // {property:'og:image', content:'daycatcher'},
      // { property: 'og:url', content: 'https://daycatcher.site' },
    ],
    // link:[{rel: 'shortcut icon', href:""}] 파비콘
  },
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/moment',
    "nuxt-mq",
    'nuxt-clipboard2',
  ],
  moment: {
    locales: ['ko']
  },
  build: {
    analyze: false,
    extend(config, { isClient, isServer, isDev }) {
      if (isServer && !isDev) {
        config.devtool = 'hidden-source-map';
      }
      console.log('webpack', config, isServer, isClient);
    },
    extractCSS: true
  },
  vue: {
    config: {
      productionTip: false,
      devtools: true
    }
  },
  mq: {
    defaultBreakpoint: "test",
    breakpoints: {
      mobile: 550,
      tablet: 890,
      labtop: 1290,
      pc: Infinity
    }
  },
  server: {
    port: process.env.PORT || 3000,
  },
  axios: {
    browserBaseURL: 'http://localhost:3085', //클라이언트에서 axios보낼 때
    baseURL: 'http://localhost:3085', //서버에서 axios보낼 때
    //baseURL 설정 하면 store에 axios요청 보내는 부분에 자동으로 위 기본URL 대입됨.
    https: false,
  },
  css: [
    '~/css/reset.css'
  ],
  plugins: [
    "@/plugins/fontawesome.js"
  ],
};