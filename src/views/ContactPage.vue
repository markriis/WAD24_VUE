<template>
  <div>
    <HeaderComponent />

    <div class="container">
      <div class="cats">
        <DeveloperCard image_url="https://new.wxcoy.cc/fail/ea5238ab-4947-4588-9696-22e18610b676" name="Caroline" />
        <DeveloperCard image_url="https://new.wxcoy.cc/fail/1209f7d2-9549-495c-9b60-2c6e397769df" name="Aaron" />
        <DeveloperCard image_url="https://new.wxcoy.cc/fail/25120452-7944-4361-92e4-5e96841fd11d" name="Mark" />
      </div>
    </div>

    <FooterComponent />
  </div>
</template>


<script>
import HeaderComponent from '@/components/HeaderComponent.vue';
import DeveloperCard from '@/components/DeveloperCard.vue';
import FooterComponent from '@/components/FooterComponent.vue';

export default {
  name: 'ContactPage',
  components: {
    HeaderComponent,
    DeveloperCard,
    FooterComponent
  },
};
</script>

<style scoped>
.cats {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
}

@media (max-width: 480px) {
  .cats {
    grid-template-columns: 1fr;
  }
}
</style>