const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const db = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

router.patch('/awesome', isLoggedIn, async (req, res, next) => {
  try {
    let score = parseInt(req.body.score, 10);
    await db.Mood.update(
      { awesome: score + 1 },
      { where: { UserId: req.body.userId } });
    const result = await db.Mood.findOne({
      where: { UserId: req.body.userId },
      attributes: ['awesome', 'good', 'okay', 'depressed', 'terrible']
    })
    return res.json(result);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.patch('/good', isLoggedIn, async (req, res, next) => {
  try {
    let score = parseInt(req.body.score, 10);
    await db.Mood.update(
      { good: score + 1 },
      { where: { UserId: req.body.userId } });

    const result = await db.Mood.findOne({
      where: { UserId: req.body.userId },
      attributes: ['awesome', 'good', 'okay', 'depressed', 'terrible']
    })
    return res.json(result);
  } catch (error) {
    console.error(error);
    next(error);
  }
});


router.patch('/okay', isLoggedIn, async (req, res, next) => {
  try {
    let score = parseInt(req.body.score, 10);

    await db.Mood.update(
      { okay: score + 1 },
      { where: { UserId: req.body.userId } });

    const result = await db.Mood.findOne({
      where: { UserId: req.body.userId },
      attributes: ['awesome', 'good', 'okay', 'depressed', 'terrible']
    })
    return res.json(result);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.patch('/depressed', isLoggedIn, async (req, res, next) => {
  try {
    let score = parseInt(req.body.score, 10);

    await db.Mood.update(
      { depressed: score + 1 },
      { where: { UserId: req.body.userId } });

    const result = await db.Mood.findOne({
      where: { UserId: req.body.userId },
      attributes: ['awesome', 'good', 'okay', 'depressed', 'terrible']
    })
    return res.json(result);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.patch('/terrible', isLoggedIn, async (req, res, next) => {
  try {
    let score = parseInt(req.body.score, 10);

    await db.Mood.update(
      { terrible: score + 1 },
      { where: { UserId: req.body.userId } });

    const result = await db.Mood.findOne({
      where: { UserId: req.body.userId },
      attributes: ['awesome', 'good', 'okay', 'depressed', 'terrible']
    })
    return res.json(result);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete('/', async (req, res, next) => {
  try {
    await db.Mood.delete({
      where: {
        UserId: req.query.userId,
      }
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
