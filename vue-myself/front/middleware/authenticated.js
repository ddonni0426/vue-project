// 로그인 했는지
export default function ({ store , redirect} ) {
    if (!store.state.user.me) { //null 이면 true 로그인 했으면 false가 됨
    console.log('authenticated실행');
        redirect('/signup');//로그인 하지 않은 사람 회원가입 페이지로 돌려보내기
    }
}