import throttle from 'lodash.throttle';

export const state = () => ({
  posts: [],
  starPosts: [],
  hasMorePost: true,
  hasMoreStar: true,
});
const limit = 9;

export const mutations = {
  addPost(state, payload) {
    return state.posts.unshift(payload);
  },
  loadPosts(state, payload) {
    if (payload.reset) {
      state.posts = payload.data;
    } else { //스크롤시 페이지 로딩
      state.posts = state.posts.concat(payload.data);
    }
    return state.hasMorePost = payload.data.length === limit;
  },
  deletePost(state, payload) {
    const index = state.posts.findIndex(v => v.id === payload.postId);
    return state.posts.splice(index, 1);
  },
  loadHashtagPosts(state, payload) {
    if (payload.reset) {
      state.posts = payload.data;
    } else {
      state.posts = state.posts.concat(payload.data);
    }
    return state.hasMorePost = payload.data.length === 10;
  },
  editPost(state, payload) {
    const index = state.posts.findIndex(v => v.id === payload.id);
    return state.posts[index].content = payload.content;
  },
  search(state, payload) {
    return state.posts = payload;
  },
  setStar(state, payload) {
    const index = state.posts.findIndex(v =>
      v.id === parseInt(payload.id, 10));
    state.posts[index].important = payload.important;
    return state.posts.forEach(v => {
      state.starPosts.concat(state.posts[index]);
    });
  },
  loadStars(state, payload) {
    if (payload.reset) {
      state.starPosts = payload.data
    } else {  //스크롤 이벤트 발생시 
      state.starPosts = state.starPosts.concat(payload.data);
    }
    return state.hasMoreStar = payload.data.length === 10;
  },

};

//액션 시작
export const actions = {
  async addPost({ commit }, payload) {
    try {
      const res = await this.$axios.post('/post', {
        content: payload.content
      }, {
        withCredentials: true
      });
      commit('addPost', res.data);
    } catch (error) {
      console.error(error);
    }
  },
  //테이블에 있는 나의 포스트 모두 가져와야 함.
  loadPosts: throttle(async function ({ state, commit }, payload) {
    try {
      if (payload && payload.reset) {
        const res = await this.$axios.get(`/posts?limit=${limit}&userId=${payload.userId}`, { withCredentials: true });
        commit('loadPosts', { data: res.data, reset: true });
        return;
      }
      else if (payload.userId && state.hasMorePost) { // 로딩된 포스트가 있으면
        const lastPost = state.posts[state.posts.length - 1]; //마지막 게시물
        const lastId = lastPost.id; //
        const res = await this.$axios.get(`/posts?lastId=${lastPost && lastId}&limit=${limit}&userId=${payload.userId}`, { withCredentials: true });
        commit('loadPosts', { data: res.data });
        return;
      }
    } catch (error) {
      console.error(error);
    }
  }, 1000),
  async deletePost({ commit }, payload) {
    try {
      await this.$axios.delete(`/post/delete?postId=${payload.postId}`, { withCredentials: true });
      commit('deletePost', payload);
    } catch (error) {
      console.error(error);
    }
  },
  async loadHashtagPosts({ commit, state }, payload) {
    try {
      if (payload && payload.reset) {
        const res = await this.$axios.get(`/hashtag?tag=${payload.hashtag}&limit=${limit}&userId=${payload.userId}`);
        commit('loadPosts', {
          data: res.data,
          reset: true,
        });
        return;
      }
      if (state.hasMorePost) {
        const lastPost = state.posts[state.posts.length - 1]; //마지막 게시물
        const res = await this.$axios.get(`/hashtag?userId=${payload.userId}&lastId=${lastPost && lastPost.id}&limit=${limit}`);
        commit('loadPosts', { data: res.data });
        return;
      }
    } catch (error) {
      console.error(error);
    }
  },
  async editPost({ commit }, payload) {
    try {
      const res = await this.$axios.patch(`/post`, {
        postId: payload.postId,
        content: payload.content
      }, { withCredentials: true });
      commit('editPost', res.data);
    } catch (error) {
      console.error(error);
    }
  },
  async search({ commit }, payload) {
    try {
      const res = await this.$axios.post(`/posts/search`, {
        userId: payload.userId,
        keyword: payload.keyword
      }, { withCredentials: true });
      commit('search', res.data);

      return;
    } catch (error) {
      console.error(error);
    }
  },
  async loadImportant({ commit }, payload) {
    try {

    } catch (error) {
      console.error(error);
    }
  },
  async setStar({ commit }, payload) {
    try {
      const res = await this.$axios.patch(`/post/important`, { postId: payload.postId, important: payload.important }, { withCredentials: true });
      commit('setStar', res.data);
      return;
    } catch (error) {
      console.error(error);
    }
  },
  //테이블에 있는 나의 중요 포스트 모두 가져와야 함.
  loadStars: throttle(async function ({ state, commit }, payload) {
    try {
      if (payload && payload.reset) {
        const res = await this.$axios.get(`/posts/stars?limit=${limit}&userId=${payload.userId}`, { withCredentials: true });
        commit('loadStars', { data: res.data, reset: true });
        return;
      }
      // 로딩된 포스트가 있으면
      else if (payload.userId && state.hasMoreStar) {
        //마지막 게시물
        const lastPost = state.starPosts[state.starPosts.length - 1];
        const lastId = lastPost.id;
        const res = await this.$axios.get(`/posts/stars?lastId=${lastPost && lastId}&limit=${limit}&userId=${payload.userId}`, { withCredentials: true });
        commit('loadStars', { data: res.data });
        return;
      }
    } catch (error) {
      console.error(error);
    }
  }, 1000),
};