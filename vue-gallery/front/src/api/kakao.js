import axios from 'axios';

const config = {
    baseUrl: 'https://kauth.kakao.com/',
}

//로그인 버튼 클릭시 먼저 사용자 동의를 거쳐 토큰을 발급 받을 수 있는 코드를 받아와야 합니다.
function getCode() { // 로그인 버튼을 클릭하면 실행될 로직
    return axios.get(`${config.baseUrl}oauth/authorize`, {
        params: {
            client_id: 'dec9c2e1206be02e001534b90240a161',
            redirect_uri: 'http://localhost:8080/oauth',
            response_type: "code"
        }
    }
    )
}

function getToken() {
    return axios.get(`${config.baseUrl}oauth/token`, {
        params: {
            client_id: 'dec9c2e1206be02e001534b90240a161',
            redirect_uri: 'http://localhost:8080/oauth',
            response_type: 'taCeyEWUSo_Gl659G613H-FhBu2WctgDOqBVepJFVrn_OW7aRJBdgplSQYIEXmPZRU9EGAopyNkAAAFv1sy_Cg#/',
        },
        headers: {
            'Content-type': "application/x-www-form-urlencoded;charset=utf-8",

        }
    });
}

export {
    getCode,

}