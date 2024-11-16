<template>
  <div>
    <HeaderComponent />
    <!-- signup form -->
    <div class="signup-form">
      <!-- form will be here -->
    </div>
    <FooterComponent />
  </div>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';

export default {
  name: 'SignupPage',
  components: {
    HeaderComponent,
    FooterComponent,
  },
};
</script>

<style>
</style>
