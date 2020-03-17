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

//reduce 다시 연습하기 id를 키값으로 한 객체로 변환
const monthsTable = months.reduce((prev, val) => (
  { ...prev, [val.id]: val }
), {});

//getDay()는 요일 반환, getDate() 날짜 반환
//today = new Date();
export const initCalendar = (today) => {
  const thisMonth = today.getMonth();
  const thisYear = today.getFullYear();
  //0:일요일 ~ 6:토요일 new Date(2020,03,14).getDay() 하면 6반환
  const day = new Date(thisYear, thisMonth, 1).getDay();
  return {
    modId: thisMonth,
    year: thisYear,
    first: day
  };
};

export const makeCalendar = (modId, first) => {
  let monId = modId;
  let cnt = monthsTable[monId].lastDay;
  let arr = new Array(cnt).fill(0);
  const res = arr.map(v => cnt--);
  res.sort((a, b) => a - b);//1-31 오름차순 정렬한 1차원 배열

  if (first === 0) { //일요일이면 그대로
    
  } else { //일요일이 아니면 그만큼 뒤로 밀어줌 
    let offset = '';
    for (let i = 0; i < first; i++) {
      res.unshift(offset);
    }
  }
  //2차원 배열로 변경
  const matrix = res.reduce((res, number, index) => {
    const criteria = 7; //7개씩 끊어서 배열화
    const resIndex = Math.floor(index / criteria);
    if (!res[resIndex]) {
      res[resIndex] = [];
    }
    res[resIndex] = [...res[resIndex], number];
    return res;
  }, []);
  return matrix;
}

//exports는 back-end에서 쓰임! requierd로 import해야함
//반면 