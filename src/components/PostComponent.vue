<template>
    <div class="post">
      <div class="post-header">
        <img :src="post.profileIcon" alt="User Profile" />
        <span class="post-date">{{ post.createTime }}</span>
      </div>
      <img v-if="post.imageURL" :src="post.imageURL" alt="Post Image" class="post-image" />
      <p>{{ post.content }}</p>

      <div class="like-section">
          <img :src=post.likeIcon alt="Like Icon">
          <!-- ternary to add an s to like if the like count isnt 1 -->
          <p>{{ post.likes }} like{{ post.likes === 1 ? '' : 's' }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'PostComponent',
    props: {
      post: Object,
    },
  };
  </script>
  
  <style>
    .post {
      padding: 10px;
      margin-bottom: 40px;
      margin-top: 30px;    
      
      & > p {
        text-align: left;
      }

      & > .like-section {
        display: flex;
        justify-content: space-between;
      }
    }

    
  </style>
  