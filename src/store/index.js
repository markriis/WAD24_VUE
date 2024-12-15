import { createStore } from 'vuex';

export default createStore({
  strict: true,
  state: {
    posts:[]
  },
  getters: {
    allPosts: (state) => state.posts,
  },
  mutations: {
    //to modify the state
    setPosts(state, posts) {
      state.posts = posts;
    }
  },
  actions: {
    async logout({ commit }) {
      try {
        const response = await fetch('https://localhost:3000/api/logout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include', //send cookies with the request
        }); 
        if (response.ok) {
          console.log("Logged out successfully");
        } else {
          console.log("Failed to log out");
        }
      }catch(error) {
        console.error("Error during logout:", error.message);
      }
    },
    async getAllPosts( { commit }) {
      try {
      const response = await fetch('http://localhost:3000/api/posts', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        //if the response.ok is true == status code between 200 and 299
        const data = await response.json();
        commit('setPosts', data.posts); //trigger the mutation
      } else {
        console.error('Failed to fetch posts: ', error.statusText);
      }
    } catch (error) {
      console.error('Error fetching posts: ', error.message);
    }
  },
  async addPostAction( {commit, dispatch }, payload) {
    try {
      const response = await fetch('http://localhost:3000/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        console.log('Post added successfully');
        dispatch('getAllPosts');
      } else {
        console.error('Failed to add post');
      }
    } catch (error) {
      console.error('Error adding post: ', error.message);
    }
  },
  async deleteAllPosts( {dispatch }) {
    try {
      const response = await fetch('http://localhost:3000/api/posts', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        console.log('All posts deleted successfully');
        dispatch('getAllPosts');
      } else {
        console.error('Failed to delete all posts');
      }
    } catch (error) {
      console.error('Error deleting posts: ', error.message);
    }
  }
},
});
