<template>
  <header>
    <nav>
      <router-link to="/">Main Page</router-link>
      <router-link to="/signup">Signup Page</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'HeaderComponent',
};
</script>

<style scoped>
header {
  background-color: #ddd;
  padding: 10px;
}
nav {
  display: flex;
  gap: 15px;
}
router-link {
  text-decoration: none;
  color: #000;
}
</style>
