const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const db = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();
// router.post('/');
router.get('/', isLoggedIn, async (req, res, next) => {
  const user = req.user;
  return res.json(user);
});

//회원가입 요청 
router.post('/signup', isNotLoggedIn, async (req, res, next) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    const exUser = await db.User.findOne({
      where: { email: req.body.email },
    });
    if (exUser) { //이미 가입된 회원
      return res.status(403).send('이미 가입된 회원입니다.');
    }
    //데이터 베이스에 회원등록 해야함
    const newUser = await db.User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hash
    });
    passport.authenticate('local', (err, user, info) => { //로컬 스트레터지 실행
      if (err) { //에러
        console.error(err);
        return next(err);
      }
      if (info) { //실패
        return res.status(401).send(info.reason);//거절
      }
      return req.login(user, async (err) => { //세션에다 사용자 정보 저장 (HOW?? serializeUser)
        if (err) {
          console.error(err); return next(err);
        }
        const fullUser = await db.User.findOne({
          where: { id: user.id },
          attributes: ['id', 'email', 'nickname'],
        });
        return res.json(fullUser);
      });
    })(req, res, next);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//로그인 요청
router.post('/login', isNotLoggedIn, (req, res, next) => {
  //인수 -> 에러 성공 실패 순
  passport.authenticate('local', (err, user, info) => {
    if (err) {//에러
      console.error(err);
      return next(err);
    }
    if (info) {//실패
      return res.status(401).send(info.eason);
    }
    //성공이면 user정보와 함께 login 메소드 호출, 
    return req.login(user, async (err) => {
      if (err) {
        console.error(err);
        return next(err);
      }
      const fullUser = await db.User.findOne({
        where: { id: user.id },
        attributes: ['id', 'email', 'nickname']
      });
      return res.json(fullUser); //성공하면 사용자 정보 반환해줌
    });
  })(req, res, next);
});

//로그아웃 요청
router.post('/logout', isLoggedIn, (req, res) => {
  if (req.isAuthenticated) {
    req.logOut();
    req.session.destroy();
    return res.status(200).send('로그아웃 되었습니다.');
  }
});

// 회원 정보 변경
router.patch('/modify', isLoggedIn, async (req, res, next) => {
  try {
    const me = await db.User.findOne({
      where: { id: req.body.userId },
      attributes: ['id', 'password']
    });
    //bcrypt.compare함수는 boolean 값으로 반환해줌
    const verify = await bcrypt.compare(req.body.oldPass, me.password);
    if (!verify) {
      return res.json({ errCode: '1', errMsg: "패스워드가 일치하지 않습니다." });
    }
    const hashed = await bcrypt.hash(req.body.newPass, 10);
    const result = await me.update({
      nickname: req.body.newNick,
      password: hashed
    });
    let modifiedUser = JSON.stringify(result);
    modifiedUser = JSON.parse(modifiedUser);
    res.status(202).json(modifiedUser);
  } catch (error) {
    console.error(error);
    next(error);
  }
});
module.exports = router;