const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const db = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

//투두 전체 가져오기
router.get('/:id', isLoggedIn, async (req, res, next) => {
  try {
    const todos = await db.Todo.findAll({
      where: { UserId: req.params.id },
      order: [['createdAt', 'DESC']],
    });
    return res.json(todos);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
