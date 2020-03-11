const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const db = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

//특정 해시태그가 달린 가져오기
router.get('/', async (req, res, next) => {
  try {
    let where = {
      UserId: parseInt(req.query.userId, 10)
    };
    if (parseInt(req.query.lastId, 10)) {
      where = {
        id: {
          [db.Sequelize.Op.lt]: parseInt(req.query.lastId, 10),
        },
        UserId: parseInt(req.query.userId, 10)
      }
    }
    const posts = await db.Post.findAll({
      where,
      include: [{
        model: db.Hashtag,
        where: { name: req.query.tag },
        // 동적으로 들어오는 부분에 한글이 들어올 수 있으니 디코드URI로 감싸주기
      }],
      order: [['createdAt', 'DESC']],
      limit: parseInt(req.query.limit, 10) || 9,
    });
    return res.json(posts);
  }
  catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
