export default {
    fetchImage(state) {
        return state.images;
    },

    fetchCode(state) {
        return state.kakaoLogin.code.url;
    },

    fetchUser(state) {
        return state.kakaoLogin.user;
    },
}