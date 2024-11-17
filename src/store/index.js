import { createStore } from 'vuex';

export default createStore({
  strict: true,
  state: {
    posts: [
      {
        // need postids to distinguish them when mutating via vue store
        // passing index as key automatically in the MainPage component, although
        // this wont suffice and might lead to problems when making an actual application
        // getting postIds from a database would be a more proper way to do it (or hardcode them in the data file here but thats more work)
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

    // could deconstruct args to { postId } but in case postId isnt passed
    // vue will throw an error, this way we handle it properly
    likePost( state, args ) {
      if ( args === undefined || args.postId === undefined ) {
        console.error( "No postId provided from action." )
        return;
      }

      const { postId } = args;

      const post = state.posts.find( ( _, idx ) => idx === postId );

      if ( !post )
        return;

      post.likes += 1;
    },

    // clientside reset
    resetLikes( state ) {
      state.posts.forEach( ( p ) => p.likes = 0 );
    }
  },
  actions: {
    likePostAct( act, args ) {
      // rule of thumb to do mutation on data via actions
      // via actions
      act.commit( "likePost", args )
    },
  },
});
