<template>
    <div>
      <HeaderComponent />
        <div class="outer-box">
        <div class="signup-form-container">
          <form id="login-form" @submit.prevent="handleLogin">
            <div class="input-grid">
              <label for="email">Email</label>
              <input v-model="email" type="email" id="email" placeholder="email" required>
  
              <label for="password">Password</label>
              <input v-model="password" type="password" id="password" placeholder="password" required>
            </div>
  
            <input type="submit" class="signup-button" value="login">
          </form>
  
          <p>don’t have an account? <router-link to="/signup">sign up here</router-link></p>
        </div>
      </div>
        <FooterComponent />
    </div>
</template>
  
<script>
import HeaderComponent from '@/components/HeaderComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';

export default {
  name: 'LoginPage',
  components: {
    HeaderComponent,
    FooterComponent
  },
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async handleLogin() {
      try {
        // sends login request with user creds to backend
        const response = await fetch('http://localhost:3000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({ email: this.email, password: this.password })
        });

        const data = await response.json();

        // if ok, navigate to home, else show error
        if (response.ok) {
          this.$router.push('/');
        } else {
          alert(data.error || 'login failed.');
        }
      } catch (err) {
        console.error(err);
        alert('an error occurred during login.');
      }
    }
  }
};
</script>
  
<style scoped>
.outer-box {
  background-color: rgb(250, 249, 249);
  padding: 10px;
  border: 2px solid #b5a3a3;
}

.signup-form-container {
  background: #dcd7d7;
  width: fit-content;
  padding: 2rem 1rem;
  margin: 0 auto;
  border-radius: 1.2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

form#login-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > input.signup-button {
    color: rgb(225, 223, 222);
    padding: 0.8rem 2rem;
    font-size: 1.2rem;
    border: none;
    border-radius: .6rem;
    background: #484946;
    cursor: pointer;
    margin-top: 1rem;
  }
  & > input.signup-button:hover {
    background-color: #2a2b29;
    transform: scale(1.05);
  }
  

}

.input-grid,
form#login-form {
  gap: .6rem;
}

.input-grid {
  display: grid;
  width: 100%;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 2fr;

  & > label {
    text-align: right;
    align-content: center;
    color: #212529;
    font-weight: bold;
  }

  & > input {
    text-align: center;
    padding: .4rem .4rem;
    border: none;
    border-radius: .4rem;
    font-size: 1rem;
  }
}

@media screen and (max-width: 360px) {
  .input-grid {
    grid-template-columns: 1fr;

    & > label {
      text-align: center;
    }
  }
}
</style>
