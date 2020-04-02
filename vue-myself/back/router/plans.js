const express = require('express');
const db = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

//이번주 계획 가져오기
router.post('/weeks', isLoggedIn, async (req, res, next) => {
  try {
    let month = req.body.month;
    let first = req.body.first;
    month = month.toString().length === 1 ? `0${month}` : `${month}`;
    first = first.toString().length === 1 ? `0${first}` : `${first}`;
    const plansAll = await db.Plan.findAll({
      where: {
        UserId: req.body.userId,
        startDay: {
          [db.Sequelize.Op.or]: {
            [db.Sequelize.Op.lte]: `${req.body.year}-${month}-${first}`
          },
        },
        endDay: {
          [db.Sequelize.Op.and]: {
            [db.Sequelize.Op.gte]: `${req.body.year}-${month}-${first}`,
          }
        }
      },
      order: [['startDay', 'ASC'], ['startTime', 'ASC']]
    });
    if (!plansAll) { return res.send('일정이 없습니다.'); }
    return res.json(plansAll);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//오늘 계획만 가져오기
router.post('/today', isLoggedIn, async (req, res, next) => {
  try {
    let month = req.body.month + 1;
    let day = req.body.day;

    month = month.toString().length === 1 ? `0${month}` : `${month}`;
    day = day.toString().length === 1 ? `0${day}` : `${day}`;

    const todayPlan = await db.Plan.findAll({
      where: {
        UserId: req.body.userId,
        [db.Sequelize.Op.or]: {
          startDay: { [db.Sequelize.Op.eq]: `${req.body.year}-${month}-${day}` },
          [db.Sequelize.Op.and]: {
            startDay: { [db.Sequelize.Op.lte]: `${req.body.year}-${month}-${day}` },
            endDay: { [db.Sequelize.Op.gte]: `${req.body.year}-${month}-${day}` }
          }
        }
      },
      order: [['startTime', 'ASC']]
    });

    if (!todayPlan) {
      return res.send('일정이 없습니다.');
    }
    return res.json(todayPlan);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;