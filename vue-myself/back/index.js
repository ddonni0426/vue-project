const express = require('express');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const hpp = require('hpp');
const helmet = require('helmet');
const dotenv = require('dotenv');
const http = require('http');
const https = require('https');


const prod = process.env.NODE_ENV === 'production';
const db = require('./models');
const passportConfig = require('./passport');
const userRouter = require('./router/user.js');
const postRouter = require('./router/post.js');
const postsRouter = require('./router/posts.js');
const todosRouter = require('./router/todos.js');
const todoRouter = require('./router/todo.js');
const hashtagRouter = require('./router/hashtag.js');
const planRouter = require('./router/plan.js');
const plansRouter = require('./router/plans.js');
const feelingRouter = require('./router/feeling.js');
const feelingsRouter = require('./router/feelings.js');
const index = express();

dotenv.config();
db.sequelize.sync({ force: false });
passportConfig();

if (prod) {
  index.use(helmet());
  index.use(hpp());
  index.use(morgan("combined"));
  index.use(cors({
    origin: 'http://daycatcher.site',
    credentials: true,
  }));
} else {
  index.use(morgan("dev"));
  index.use(cors({
    origin: 'http://localhost:3000',
    credentials: true, 
  }));
}

index.use(express.json());
index.use(express.urlencoded({ extended: false }));

index.use(cookie(process.env.COOKIE_SECRET));
index.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: prod, //배포시엔 https로 바꾸고 secure값도 true로 해주기
    domain:prod && '.daycatcher.site',
  },
}));

index.use(passport.initialize());
index.use(passport.session());

index.get('/', (req, res) => { res.send('Hello');});

index.use('/user', userRouter);
index.use('/post', postRouter);
index.use('/posts', postsRouter);
index.use('/todo', todoRouter);
index.use('/todos', todosRouter);
index.use('/hashtag', hashtagRouter);
index.use('/plan', planRouter);
index.use('/plans', plansRouter);
index.use('/feeling', feelingRouter)
index.use('/feelings', feelingsRouter)

index.use(passport.initialize());
index.use(passport.session());

index.post('/user', async (req, res) => {
  if (req.isAuthenticated()) {
    console.log('백엔드 진입');
  }
});

if (prod) {
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
  https.createServer(lex.httpsOptions, lex.middleware(index)).listen(443);
  http.createServer(lex.middleware(require('redirect-https')())).listen(80);
} else {
  index.listen(prod ? process.env.PORT : 3085, () => {
    console.log(`server is running on ${process.env.PORT}`);
  });
}