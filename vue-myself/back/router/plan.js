const express = require('express');
const path = require('path');//node에서 기본 제공
const db = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();
router.get('/', isLoggedIn, async (req, res, next) => {
  try {
    let month = req.body.month + 1;
    month = month.toString().length === 1 ? `0${month}` : `${month}`;
    const plan = await db.Plan.findOne({
      where: {
        id: req.body.planId,
        UserId: req.body.userId,
        startDay: { [db.Sequelize.Op.like]: `${req.body.year}-${month}%`}
      }
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/add', isLoggedIn, async (req, res, next) => {
  try {
    const newPlan = await db.Plan.create({
      UserId: req.body.userId,
      startDay: req.body.startD,
      startTime: req.body.stratT,
      endDay: req.body.endD,
      endTime: req.body.endT,
      plan: req.body.plan
    });
    return res.json(newPlan);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete('/', isLoggedIn, async (req, res, next) => {
  try {
    await db.Plan.delete({
      where: {
        UserId: req.query.userId,
        id: req.query.planId
      }
    });
    return res.send('일정이 삭제되었습니다.');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
