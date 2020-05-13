const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const db = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

router.get('/', isLoggedIn, async (req, res, next) => {
  try {
    const feeling = await db.Mood.findOne({
      where: { UserId: parseInt(req.query.userId, 10) },
      attributes: ['awesome', 'good', 'okay', 'depressed', 'terrible']
    });
    if (!feeling) {
      return res.status(400).send('feeling 테이블 생성되지 않음');
    }
    return res.json(feeling);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//회원가입시 자동 실행(기분 표 생성)
router.post('/', async (req, res, next) => {
  try {
    const newFeel = await db.Mood.create({
      UserId: req.body.UserId
    });
    if (!newFeel) {
      return res.status(401).send('기분생성실패');
    }
    return res.status(200).send('기분생성성공');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
