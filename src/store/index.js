import { createStore } from 'vuex';

export default createStore({
  strict: true,
  state: {
    posts: [
      {
        author: "User1",
        createTime: "2022-10-22",
        content: "black cat gif",
        imageURL: "https://wxcoy.cc/fail/00dc9de6-0c22-4241-bbe9-019df2b26fb8",
        profileIcon: require('@/assets/profile-icon.png'), 
        likeIcon: require('@/assets/Icon-like-button-transparent-PNG.png'), 
        // likes: 0, // #todo implement task4.2 (likes)

      },
      {
        author: "User2",
        createTime: "2022-10-22",
        content: "Tartu 2022",
        imageURL: "https://media.tenor.com/WwBJIu1sPMoAAAAM/cat-blink.gif",
        profileIcon: require('@/assets/profile-icon.png'),
        likeIcon: require('@/assets/Icon-like-button-transparent-PNG.png'), 
        // likes: 0, // #todo implement task4.2 (likes)
      },
      // #todo add the rest of the posts from posts.json
    ],
  },
  getters: {
    allPosts: (state) => state.posts,
  },
  mutations: {
    // #todo implement mutations for likes (Task 4.2)
    // #todo implement mutation to reset likes (Task 4.3)
  },
  actions: {
    // #todo implement actions if needed for likes and reset likes
  },
});
