<template>
    <div>
        <HeaderComponent />
        <div class="main-content">
         <AddPostComponent />
        </div>
      <FooterComponent />
    </div>
  </template>
  
  <script>
  import HeaderComponent from '@/components/HeaderComponent.vue';
  import FooterComponent from '@/components/FooterComponent.vue';
  import AddPostComponent from '@/components/AddPostComponent.vue';
  
  export default {
    name: 'AddPostPage',
    components: {
        HeaderComponent, 
        FooterComponent,
        AddPostComponent,
    },
  };
  </script>
 
  