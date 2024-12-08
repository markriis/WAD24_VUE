<template>
  <div>
    <HeaderComponent />

    <div class="main-content">
      
      <div class="container">
        <PostComponent
          v-for="(post, index) in posts"
          :key="index"
          :post="post"
          :postId="index"
        />

        <button id="resetLikes" @click="resetLikes">Reset likes</button>
      </div>
    </div>

    <FooterComponent />
  </div>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import PostComponent from '@/components/PostComponent.vue';

export default {
  name: 'MainPage',
  components: {
    HeaderComponent,
    FooterComponent,
    PostComponent,
  },
  computed: {
    posts() {
      return this.$store.getters.allPosts; 
    },
  },
  methods: {
    resetLikes( ) {
      this.$store.commit( "resetLikes" )
    }
  }
};
</script>

<style scoped>
#resetLikes {
  padding: 0.2rem 1rem;
  font-size: 1rem;
  border: none;
  border-radius: .6rem;
  background: #87b3e9;
  cursor: pointer;
  width: fit-content;
}
</style>
