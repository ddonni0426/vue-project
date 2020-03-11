import { galleryImage, searchImage } from '../api/unsplash.js.js';
import { getCode } from '../api/kakao.js.js';

export default {
    // 갤러리 랜덤 이미지 요청
    SET_GalleryImage({ commit }) {
        galleryImage()
            .then(({ data }) => {
                commit('SET_GalleryImage', data);
            })
            .catch((err) => { console.log(err); });
    },
    //검색한 사진 가져오기
    Set_searchImage({ commit }, keyword) {
        searchImage(keyword)
            .then(({ data }) => {
                commit('')
            })
            .catch((err) => { console.log(err); })
    },
    // 카카오 로그인 CODE 요청 
    RequestLogin({ commit }) {
        getCode().then(({ data }) => {
            commit('RequestCode', data);
        }).catch(err => { console.log(err); })

    }

}