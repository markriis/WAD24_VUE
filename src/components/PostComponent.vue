<template>
  <router-link :to="'post/' + post.id" class="post">
      <div class="post-header">
        <span class="post-date">{{  formatDate(post.date) }}</span>
      </div>
      <p>{{ post.body }}</p>
<!--
      <div class="like-section">
          <img :src=post.likeIcon alt="Like Icon" @click="likePost">-->
          <!-- ternary to add an s to like if the like count isnt 1 -->
         <!-- <p>{{ post.likes }} like{{ post.likes === 1 ? '' : 's' }}</p>
      </div>
    -->
  </router-link>
</template>

<script>
export default {
  name: 'PostComponent',
  props: {
    post: Object,
  },
  methods: {
    /*
    likePost( ) {
      this.likes += 1;
    },
    */
    formatDate(date) {
      return new Date(date).toLocaleDateString();
    }
  }
};
</script>

<style>
  .post {
    text-decoration: none;

    padding: 10px;
    margin-bottom: 40px;
    margin-top: 30px;

    & > p {
      text-align: left;
    }
  }


</style>


  