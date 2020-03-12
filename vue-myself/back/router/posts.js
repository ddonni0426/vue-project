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
    return res.json(posts);
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
      attributes: ['id', 'content','important','createdAt']
    });
    //이거 기억해두자 ㅠㅠ 
    const parsed_posts = JSON.stringify(posts); //posts를 문자열로 변환
    const ofinal_posts = JSON.parse(parsed_posts);//그걸 배열 형태로 변환
    let search_rs = []; //검색결과 담을 빈 배열
    let val; //search_rs에 담길 객체 값

    ofinal_posts.findIndex((v) => {
      if (v.content.match(`${keyword}`)) {
        val = { id: v.id, content: v.content,important:v.important ,createdAt: v.createdAt }
        search_rs.push(val);
      }
    });
    if (!search_rs) {
      return res.status(400).send('검색 결과가 존재하지 않습니다.');
    }
   return res.json(search_rs);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//별표시 할 경우, 상위에 정렬


module.exports = router;
