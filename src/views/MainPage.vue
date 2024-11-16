<template>
  <div>
    <HeaderComponent />

    <div class="main-content">
      <!-- #todo add reset likes button here (Task 4.3) -->

      <div class="container">
        <PostComponent
          v-for="(post, index) in posts"
          :key="index"
          :post="post"
        />
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
};
</script>

<style>
</style>
