const express = require('express');
const path = require('path');//node에서 기본 제공
const db = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();
//생성
router.post('/', isLoggedIn, async (req, res, next) => {
  try {
    //게시물 내에 해시태그가 존재하면 해시태그만 뽑아서 저장
    const hashtags = req.body.content.match(/#[^\s#]+/g);
    const newPost = await db.Post.create({
      content: req.body.content,
      UserId: req.user.id,
    });
    if (hashtags) {
      //존재하는 태그인지 검색하고 없으면 생성 있으면 인스턴스 반환
      const result = await Promise.all(hashtags.map(tag => db.Hashtag.findOrCreate({
        where: { name: tag.slice(1).toLowerCase() }
      })));
      await newPost.addHashtags(result.map(r => r[0]));
    }
    return res.json(newPost);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//수정
router.patch('/', isLoggedIn, async (req, res, next) => {
  try {
    const hashtags = req.body.content.match(/#[^\s#]+/g);

    await db.Post.update(
      { content: req.body.content },
      { where: { id: req.body.postId } },
    );
    const editPost = await db.Post.findOne({
      where: { id: req.body.postId },
    });
    if (hashtags) {
      const result = await Promise.all(hashtags.map(tag => db.Hashtag.findOrCreate({
        where: { name: tag.slice(1).toLowerCase() }
      })));
      await editPost.addHashtags(result.map(r => r[0]));
    }
    return res.json(editPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//삭제
router.delete('/delete', isLoggedIn, async (req, res, next) => {
  try {
    const post = await db.Post.findOne({
      where: { id: parseInt(req.query.postId, 10) }
    });
    if (!post) {
      return res.status(400).send('존재하지 않는 게시물 입니다.');
    }
    await db.Post.destroy({
      where: { id: parseInt(req.query.postId, 10) }
    });
    return res.status(202).send('게시물이 삭제되었습니다.');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//중요 게시물 표시 (별버튼 클릭)
router.patch('/important', isLoggedIn, async (req, res, next) => {
  try {
    const old_star = req.body.important;
    if (old_star) {
      await db.Post.update(
        { important: false },
        { where: { id: req.body.postId } }
      );
    } else {
      await db.Post.update(
        { important: true },
        { where: { id: req.body.postId } }
      );
    }
    const result = await db.Post.findOne({
      where: { id: req.body.postId },
      attributes: ['id', 'important']
    });
    return res.json(result);

  } catch (error) {
    console.error(error)
    next(error);
  }
});

module.exports = router;