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
        likes: 6,
      },
      {
        author: "User2",
        createTime: "2022-10-22",
        content: "Tartu 2022",
        imageURL: "https://media.tenor.com/WwBJIu1sPMoAAAAM/cat-blink.gif",
        profileIcon: require('@/assets/profile-icon.png'),
        likeIcon: require('@/assets/Icon-like-button-transparent-PNG.png'), 
        likes: 54,
      },
      {
        author: "User3",
        createTime: "2022-10-21",
        content: "More cats please",
        profileIcon: require('@/assets/profile-icon.png'),
        likeIcon: require('@/assets/Icon-like-button-transparent-PNG.png'),
        likes: 10,
      },
      {
        author: "User4",
        createTime: "2022-10-2",
        content: "Anyone knows in which room is the lab today?",
        profileIcon: require('@/assets/profile-icon.png'),
        likeIcon: require('@/assets/Icon-like-button-transparent-PNG.png'),
        likes: 7,
      },
      {
        author: "User5",
        createTime: "2022-09-23",
        content: "sügis algas :(",
        imageURL: require('@/assets/no-no-no-no-cat.gif'),
        profileIcon: require('@/assets/profile-icon.png'),
        likeIcon: require('@/assets/Icon-like-button-transparent-PNG.png'),
        likes: 0,
      }, 
      {
        author: "User6",
        createTime: "2022-10-30",
        content: "Anyone else excited for the new season?",
        profileIcon: require('@/assets/profile-icon.png'),
        likeIcon: require('@/assets/Icon-like-button-transparent-PNG.png'),
        likes: 5,
      }, 
      {
        author: "User7",
        createTime: "2022-10-1",
        content: "Can we get more dog photos too?",
        profileIcon: require('@/assets/profile-icon.png'),
        likeIcon: require('@/assets/Icon-like-button-transparent-PNG.png'),
        likes: 1,
      }, 
      {
        author: "User8",
        createTime: "2022-10-1",
        content: "cool",
        profileIcon: require('@/assets/profile-icon.png'),
        likeIcon: require('@/assets/Icon-like-button-transparent-PNG.png'),
        likes: 2,
      },
      {
        author: "User9",
        createTime: "2022-10-1",
        content: "working late...",
        profileIcon: require('@/assets/profile-icon.png'),
        likeIcon: require('@/assets/Icon-like-button-transparent-PNG.png'),
        likes: 2,
      },
      {
        author: "User10",
        createTime: "2022-10-1",
        content: "Where is the best spot to study on campus?",
        profileIcon: require('@/assets/profile-icon.png'),
        likeIcon: require('@/assets/Icon-like-button-transparent-PNG.png'),
        likes: 0,
      }
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
