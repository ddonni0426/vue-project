//로그인 안 했는지
export default function ({ store, redirect }) {
    if (store.state.user.me !== null) {
        console.log('anonymous 실행')
        redirect('/');//로그인 한 사람 메인 페이지로 돌려보내기
    }
}