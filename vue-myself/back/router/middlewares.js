exports.isLoggedIn = async (req, res, next) => {
  try {
    const isLog = await req.isAuthenticated();
    if (isLog) {//현재 사용자가 로그인 된 사람이면
      console.log('로그인 된 사람');
      return next();//next는 인수를 넣으면 에러 처리.
    }
    return res.status(401).send('로그인이 필요합니다.');
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.isNotLoggedIn = async (req, res, next) => {
  try {
    const isLog = await req.isAuthenticated();

    if (!isLog) {//현재 사용자가 로그인이 안 된 사람이면
      console.log('로긴 안댐')
      return next();
    }
    return res.status(403).send('이미 가입된 회원입니다.');
  } catch (error) {
    console.error(error);
    next(error);
  }
};