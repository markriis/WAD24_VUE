<template>
  <header>
    <div class="header-title">
      <h1> Daily posts</h1>
    </div>
    <nav>
      <router-link to="/">Main Page</router-link>
      <router-link to="/signup">Signup Page</router-link>
      <router-link to="/login">Login Page</router-link>

    </nav>
  </header>
</template>

<script>
export default {
  name: 'HeaderComponent',
};
</script>

<style scoped>
.header-title h1 {
  font-size: 1.5rem;
  color: #333;
}
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
