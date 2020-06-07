export default {
    SET_GalleryImage(state, data) {
        state.images = [...state.images, ...data.map(image => image.urls.raw + "&w=300&h=300&fit=max")];
    },

    RequestCode(state, code) {
        state.kakaoLogin.code = Request.arguments.get(code).join('');
        console.log('code는요',state.kakaoLogin.code,'입니다.');
    }
}