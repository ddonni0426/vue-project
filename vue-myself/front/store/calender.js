export const state = () => ({
  events: [
    {
      start: '2020-03-19 10:35',
      end: '2020-03-22 11:30',
      title: '약속은약속 '
    }
  ]
});
//뮤테이션 시작
export const mutations = {


};
//액션 시작
export const actions = {
  //달력 구성하기

  //달력 로드하기 
  loadCal() { },
  //다음 달 달력보기
  nextMonth() { },
  //달력에 일정 추가하기
  setSchedule() {
    return commit();
  },
  //달력에서 일정 삭제하기
  delSchedule() { }
};