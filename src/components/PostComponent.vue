<template>
    <div class="post">
      <div class="post-header">
        <img :src="post.profileIcon" alt="User Profile" />
        <span class="post-date">{{ post.createTime }}</span>
      </div>
      <img v-if="post.imageURL" :src="post.imageURL" alt="Post Image" class="post-image" />
      <p>{{ post.content }}</p>
      <!-- #todo add like button and counter here (Task 4.2) -->
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
    }
  </style>
  