module.exports = {
  head: {
    title: 'Vue Myself',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
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