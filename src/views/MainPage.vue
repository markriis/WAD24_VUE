<template>
  <div>
    <HeaderComponent />
    <button @click="handleLogout">
      Logout
    </button>

    <div class="main-content">
      <div class="container">

        <PostComponent
          v-for="(post, index) in posts"
          :key="index"
          :post="post"
          :postId="post.id"
        />
      </div>
    </div>

    <div class="post-controls">
      <button @click="goToAddPostPage">
        Add Post
      </button>
      <button @click="deleteAllPosts">
        Delete All
      </button>
    </div>

    <FooterComponent />
  </div>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import PostComponent from '@/components/PostComponent.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'MainPage',
  components: {
    HeaderComponent,
    FooterComponent,
    PostComponent,
  },
  computed: {
    //three dots - spread syntac
    ...mapGetters(['allPosts']),
    //allPosts - getter name in vuex store

    posts() {
      return this.allPosts;
    },
  },

  methods: {
    ...mapActions(['getAllPosts', 'deleteAllPosts', 'logout']),
    //action name defined in vuex store

    goToAddPostPage() {
      this.$router.push('/addpost');
    },

    async handleLogout() {
      await this.logout();
      this.$router.push('/login');
    }

  },
  mounted() {
    //Fetch posts when the component is mounted
    this.getAllPosts();
  },
};
</script>

<style scoped>
.post-controls {
  display: flex;
  justify-content: space-between;
  width: 100%;

  max-width: 800px;
  margin: 0 auto;
}

button {
  padding: 0.8rem 1.2rem;
  margin: 0.5rem;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background-color: #7d7773;
  color: white;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

/* Hover effect */
button:hover {
  background-color: rgb(70, 66, 65); /* Darker shade on hover */
  transform: scale(1.05); /* Slight zoom effect */
}

</style>
