<template>
  <div>
    <HeaderComponent />
    <!-- signup form -->
    <div class="signup-form-container">
      <form id="signup-form">
        <div class="input-grid">
          <label for="email">Email</label>          
          <input type="text" id="email" name="email" placeholder="Email" required>

          <label for="email">Password</label>
          <input type="password" id="password" name="password" placeholder="Password" required>
        </div>

        <input type="submit" class="signup-button" value="Signup">
      </form>
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
.signup-form-container {
  background: #eaf2dd;
  width: fit-content;
  padding: 2rem 1rem;
  margin: 0 auto;
  border-radius: 1.2rem;
}

form#signup-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.input-grid,
form#signup-form {
  gap: .4rem;
}

.input-grid {
  display: grid;
  width: 100%;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 2fr;
}

.input-grid > label {
  text-align: right;
  align-content: center;
}

.input-grid > input {
  text-align: center;
  padding: .4rem .4rem;
  border: none;
  border-radius: .4rem;
  font-size: 1rem;
}

form#signup-form > input.signup-button {
  padding: 0.2rem 1rem;
  font-size: 1rem;
  border: none;
  border-radius: .6rem;
  background: #87b3e9;
}

</style>
