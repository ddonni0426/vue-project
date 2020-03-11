// import Unsplash from 'unsplash-js';
import axios from 'axios';

const config = {
    baseUrl: 'https://api.unsplash.com'
};

function galleryImage() {
    return axios.get(`${config.baseUrl}/photos/random`, {
        params: {
            client_id: 'e171dc7562eb90c7f0598e04852b65b445c7efebf5f8b614d710d7c6e131390f', count: 12,
        }
    });
}
function searchImage(keyword) {
    return axios.get(`${config.baseUrl}/search/photos`, {
        params: {
            query:`${keyword}`
        }
    });
}


export {
    galleryImage,
    searchImage
}