<template>
  <div class="dev-card">
    <div class="card-image">
      <img :src="image_url" alt="developer image" />
    </div>
    <p>{{ name }}</p>
  </div>
</template>

<script>
export default {
  name: 'DeveloperCard',
  props: {
    name : String,
    image_url : String
  },
};
</script>

<style>
.dev-card {
  display: flex;
  flex-direction: column;
  gap: .6rem;

  width: 100%;

  & > .card-image {
    width: 100%;
    aspect-ratio: 1;

    & > img {
      width: 100%;
      height: 100%;
      object-fit: fill;

      border-radius: 5px;
    }
  }

  & > p {
    text-align: center;
    width: 100%;
    font-weight: bold;
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .cats > p {
    font-size: 2rem;
  }
}
</style>


