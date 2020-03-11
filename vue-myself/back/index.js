const express = require('express');
const cors = require('cors');
// const bcrypt = require('bcrypt');
const passport = require('passport');
const session = require('express-session');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const db = require('./models');
const passportConfig = require('./passport');
const userRouter = require('./router/user.js');
const postRouter = require('./router/post.js');
const postsRouter = require('./router/posts.js');
const todosRouter = require('./router/todos.js');
const todoRouter = require('./router/todo.js');
const hashtagRouter = require('./router/hashtag.js');
// const oauthRouter = require('/router/oauth.js');
const index = express();

db.sequelize.sync({ force: false });
passportConfig();

index.use(morgan("dev"));

index.use(cors({
  origin: 'http://localhost:3000',
  credentials: true, //서로간의 쿠키를 주고 받을 수 있다.
}));

index.use(express.json());
index.use(express.urlencoded({ extended: false }));

index.use(cookie('doeun cookie secret'));
index.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'doeun cookie secret',
  cookie: {
    httpOnly: true,
    secure: false //배포시엔 https로 바꾸고 secure값도 true로 해주기
  },
}));

index.use(passport.initialize());
index.use(passport.session());

index.get('/', (req, res) => {
    res.send('안녕 시퀄라이즈');
    //status(상태코드)가 생략되어있음. send()메소드 는 body에 메시지를 넣음
});

index.use('/user', userRouter);
index.use('/post', postRouter);
index.use('/posts', postsRouter);
index.use('/todo', todoRouter);
index.use('/todos', todosRouter);
index.use('/hashtag',hashtagRouter)
// index.use('/oauth', oauthRouter);

index.use(passport.initialize());
index.use(passport.session());

index.post('/user', async (req, res) => {
  if (req.isAuthenticated()) {
    console.log('백엔드 진입');
    }
});

index.listen(3085, () => {
  console.log(`백엔드 서버${3085}번 포트에서 작동중`);
});