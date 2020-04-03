//전체 설정
export const state = () => ({

});

export const mutations = {


};

//nuxtServerInit 알아볼것

export const actions = {
  //nuxtServerInit는 ㅇㅖ약된 이름이라 꼭 지켜줘야 한다.
  //서버사이드 렌더링시 핵심 역할 
  //모든 페이지에서 화면이 그려지기 전에 실행되서 세션쿠키 확인해서
  //connect.sid값이 존재하면 미리 로딩 해 둔다.
  //모든 페이지에 공통적으로 페이지 그려지기 전에 실행되야 할
  //구문을 nuxtServerInit에 담으면 된다.
  async nuxtServerInit({ commit, dispatch, state }, { req }) {
    return dispatch('user/loadUser');
  },


};