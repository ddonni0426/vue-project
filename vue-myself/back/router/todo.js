const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const db = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();
//투두 생성
router.post('/', isLoggedIn, async (req, res, next) => {
  try {
    const todo = await db.Todo.create({
      content: req.body.content,
      UserId: req.body.userId
    });
    return res.json(todo);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.delete('/:id', isLoggedIn, async (req, res, next) => {
  try {
    const todo = await db.Todo.findOne({
      where: { id: req.params.id }
    });
    if (!todo) {
      return res.status(404).send('존재하지 않는 게시물 입니다.');
    }
    await db.Todo.destroy({
      where: { id: req.params.id }
    });
    return res.status(202).send('게시물이 삭제되었습니다.');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.patch('/', isLoggedIn, async (req, res, next) => {
  try {
    const todo = await db.Todo.findOne({
      where: { id: req.body.id }
    });
    if (!todo) {
      return res.status(404).send('존재하지 않는 게시물 입니다.');
    }
    await db.Todo.update(
      { finish: req.body.isFinish },
      {
        where: { id: req.body.id }
      });
    return res.status(202).send('게시물이 변경되었습니다.');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
