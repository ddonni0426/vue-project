const express = require('express');
const path = require('path');//node에서 기본 제공
const db = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const router = express.Router();

router.get('/', isLoggedIn, async (req, res, next) => {
  try {
    let where = {
      UserId: parseInt(req.query.userId, 10)
    };
    if (parseInt(req.query.lastId, 10)) { //라스트 아이디가 있으면
      where = {
        id: { [db.Sequelize.Op.lt]: parseInt(req.query.lastId, 10) },
        UserId: parseInt(req.query.userId, 10)
      }
    }
    const posts = await db.Post.findAll({
      where,
      order: [['createdAt', 'DESC']],
      limit: parseInt(req.query.limit, 10) || 9,
    });
    return res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//검색
router.post('/search', isLoggedIn, async (req, res, next) => {
  try {
    const keyword = decodeURIComponent(req.body.keyword);
    const posts = await db.Post.findAll({
      where: { UserId: req.body.userId },
      attributes: ['id', 'content', 'important', 'createdAt']
    });
    let parsed_posts = JSON.stringify(posts); //posts를 문자열로 변환
    parsed_posts = JSON.parse(parsed_posts);//그걸 배열 형태로 변환
    let search_rs = []; //검색결과 담을 빈 배열
    let val; //search_rs에 담길 객체 값

    parsed_posts.findIndex((v) => {
      if (v.content.match(keyword) !== null) {
        val = { id: v.id, content: v.content, important: v.important, createdAt: v.createdAt }
        search_rs.push(val);
      }
    });
  
    if (!search_rs) {
      return res.status(404).send('검색 결과가 존재하지 않습니다.');
    }
    return res.status(200).json(search_rs);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//별표시 게시물 모두 반환
router.get('/stars', isLoggedIn, async (req, res, next) => {
  try {
    let where = {
      UserId: parseInt(req.query.userId, 10),
      important: true
    }
    if (parseInt(req.query.lastId, 10)) { //라스트 아이디가 있으면
      where = {
        id: { [db.Sequelize.Op.lt]: parseInt(req.query.lastId, 10) },
        UserId: parseInt(req.query.userId, 10),
        important: true
      }
    }
    const stars = await db.Post.findAll({
      where,
      order: [['createdAt', 'DESC']],
      limit: parseInt(req.query.limit, 10) || 9,
    });
    if (!stars) {
      return res.status(404).send('중요 게시물 없음');
    }
    return res.status(200).json(stars);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
