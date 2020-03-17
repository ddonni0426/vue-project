const express = require('express');
const path = require('path');//node에서 기본 제공
const db = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();
router.get('/', isLoggedIn, async (req, res, next) => { 
  try {
    
  } catch (error) {
    console.error(error);
   next(error);
  }
});

module.exports = router;
