// const passport = require('passport');
// const { Strategy: KakaoStrategy } = require('passport-kakao');

// const { User } = require('../models');
// module.exports = () => {
//   passport.use(new KakaoStrategy({
//     clientID: process.env.KAKAO_ID,
//     callbackURL: '/oauth/kakao/callback',//인증 결과 받을 주소
//   }, async (accessToken, refreshToken, profile, done) => {
//     try {
//       const exUser = await User.find({ where: { snsId: profile.id, provider: 'kakao' } });
//       if (exUser) {
//         done(null, exUser);
//       } else {
//         const newUser = await User.create({
//           email: profile._json() && profile._json.kaccount_email,
//           nickname: profile.displayName,
//           snsId: profile.id,
//           provider: 'kakao',
//         });
//         done(null, newUser);
//       }
//     } catch (error) {
//       console.error(error);
//       done(error);
//     }
//   }));
// };