const express = require('express');
const db = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

router.post('/', isLoggedIn, async (req, res, next) => {
  try {
    //['년도','월','일']
    //['00','00'] 밤12시는 00시 낮12시는 12시
    let month = req.body.month+1;
    month = month.toString().length === 1 ? `0${month}` : `${month}`;

    const plansAll = await db.Plan.findAll({
      where: {
        UserId: req.body.userId,
        startDay: { [db.Sequelize.Op.like]: `${req.body.year}-${month}%` }
      },
      order: [['startDay', 'ASC'],['startTime','ASC']]
    });

    if (!plansAll) { return res.send('일정이 없습니다.'); }

    return res.json(plansAll);
  } catch (error) {
    console.error(error);
    next(error);
  }
});
module.exports = router;