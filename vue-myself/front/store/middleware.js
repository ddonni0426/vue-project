const months = [
  { id: 0, name: 'January', lastDay: 31 },
  { id: 1, name: 'Feburary', lastDay: 28 },
  { id: 2, name: 'March', lastDay: 31 },
  { id: 3, name: 'April', lastDay: 30 },
  { id: 4, name: 'May', lastDay: 31 },
  { id: 5, name: 'June', lastDay: 30 },
  { id: 6, name: 'July', lastDay: 31 },
  { id: 7, name: 'August', lastDay: 31 },
  { id: 8, name: 'September', lastDay: 30 },
  { id: 9, name: 'October', lastDay: 31 },
  { id: 10, name: 'November', lastDay: 30 },
  { id: 11, name: 'December', lastDay: 31 },
];
//reduce 다시 연습하기!!! id를 키값으로 한 객체로 변환
export const monthsTable = months.reduce((prev, val) => (
  { ...prev, [val.id]: val }
), {});

//today = new Date();
//new Date(2020,03,14).getDay() 하면 6반환 -> 토요일
export class InitCalendar {
  constructor(today) {
    this.year = today.getFullYear();
    this.monId = today.getMonth();
    this.first = new Date(this.year, this.monId, 1).getDay();
    InitCalendar.Page;
  }
  static nextMonth() {
    let next = new Date();
    next.setDate(1);
    next.setMonth(++InitCalendar.Page);
    return {
      year: next.getFullYear(),
      monId: next.getMonth(),
      first: next.getDay(),
    };
  }
  static prevMonth() {
    let prev = new Date();
    prev.setDate(1);
    prev.setMonth(--InitCalendar.Page);
    return {
      year: prev.getFullYear(),
      monId: prev.getMonth(),
      first: prev.getDay(),
    };
  }
};

//InitCalendar끝
export function MakeCalendar(monId, first, monthsTable) {
  this.monId = monId;
  this.first = first;
  this.cnt = monthsTable[this.monId].lastDay;
};

//달력 데이터 만들기 
MakeCalendar.prototype.setFrame = function () {
  let frame = new Array(this.cnt).fill(0).map(v => this.cnt--).sort((a, b) => a - b);
  if (this.first !== 0) {
    let offset = '';
    for (let i = 0; i < this.first; i++) {
      frame.unshift(offset);
    }
  }
  return frame;
};

//2차원 배열담은 객체로 변경
MakeCalendar.prototype.matrix = function (frame) {
  const matrix = frame.reduce((week, number, index) => {
    const criteria = 7; //7개씩 끊어서 배열화
    const weekIndex = Math.floor(index / criteria);
    // let counter = 0;
    if (!week[weekIndex]) { //더이상 값이 없을 때
      week[weekIndex] = [];
    }
    week[weekIndex] = [...week[weekIndex], number];
    return week;
  }, []);
  //2차원 배열담은 객체에 주차 표시 
  const calendar = matrix.reduce((prev, val, i) => (
    { ...prev, [`${i + 1}주차`]: val }
  ), []);
  return calendar;
}
//오늘이 몇 주차인지 구하기
export const getWeekth = (today, calendar) => {
  const todayIs = today.getDate();
  let length = Object.keys(calendar).length;
  let weekNum = null;
  while (length) {
    weekNum = calendar[`${length}주차`].find(v => v === todayIs);
    if (weekNum === todayIs) {
      return length;
    } else {
      length--;
    }
  }
  return weekNum;
}
// export const setWeekly = (today) =>({
// });

export function transform(before) {
  const after = before.toString().length === 1 ? `0${before}` : `${before}`;
  return after;
}