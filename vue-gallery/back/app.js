const express = require('express');
const db = require('./models');
const app = express();
db.sequelize.sync();
app.get('/', (req, res) => {
  res.send('안녕 시퀄라이즈');
  //status(상태코드)가 생략되어있음. send()메소드 는 body에 메시지를 넣음
});

app.listen(3085, () => {
  console.log(`백엔드 서버${3085}번 포트에서 작동중`);
});