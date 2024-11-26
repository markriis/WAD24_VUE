<template>
  <div>
    <HeaderComponent />
    <!-- signup form -->
    <div class="outer-box">
      <div class="signup-form-container">
        <form id="signup-form" @submit.prevent="handleSignup">
          <div class="input-grid">
            <!--Email field-->
            <label for="email">Email</label>          
            <input v-model="email" type="email" id="email" name="email" placeholder="Email" required> 
            <!--Password Field-->
            <label for="password">Password</label>
            <input v-model="password" type="password" id="password" name="password" placeholder="Password"  @input="updatePassword" required>
            
            <!-- Including the ValidatorComponent-->
            <div class="password-errors">
            <ValidatorComponent ref="validator" :password="password":showErrors="showErrors" @validation-status="handleValidationStatus"/>
          </div>
        </div>
        <input type="submit" class="signup-button" value="Signup">
      </form>
    </div>
  </div>
    <FooterComponent />
  </div>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import ValidatorComponent from '@/components/ValidatorComponent.vue';

export default {
  name: 'SignupPage',
  components: {
    HeaderComponent,
    FooterComponent,
    ValidatorComponent
  },
  data() {
    return {
      email: '',
      password: '',
      //showPassword: false,
      showErrors: false,
      isPasswordValid:false,
    };
  }, 
  methods: {
    
    updatePassword() {
      // Triggered on @input for real-time updates
      this.$refs.validator.validatePassword();
    },
    handleValidationStatus(status) {
      this.isPasswordValid = status;
    },
    handleSignup() {
      this.showErrors = true; // Show errors after attempting to submit
      this.$refs.validator.validatePassword();
      if (!this.isPasswordValid) {
        //alert('Please correct the errors in the form.');
        //this would create a pop-up window
        return;
      }
      alert('Signup successful!'); //why is it alone not working
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>

.outer-box {
  background-color: rgb(250, 249, 249);
  padding: 10px;
  border: 2px solid #b5a3a3;
}


/* YESS & SELECTOR GOD BLESS VUE */
.signup-form-container {
  background: #dcd7d7;
  width: fit-content;
  padding: 2rem 1rem;
  margin: 0 auto;
  border-radius: 1.2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

form#signup-form {
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
}

/* form is nested inside container grid, needs gap aswell */
.input-grid,
form#signup-form {
  gap: .6rem;
}

.input-grid {
  display: grid;
  width: 100%;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 2fr; /**the labels column is narrower and inputs is wider */

  & > label {
    text-align: right;
    align-content: center;
    color:  #212529; 
    font-weight: bold;
  }

  & > input {
    text-align: center;
    padding: .4rem .4rem;
    border: none;
    border-radius: .4rem;
    font-size: 1rem;
  }
  .password-errors {
    grid-column: 1 / span 2;
    text-align: center;
    margin-top: -0,5rem;

  }
 

}


/* change grid layout when in mobile view */
@media screen and ( max-width: 360px ) {
  .input-grid {
    grid-template-columns: 1fr;

    & > label {
      text-align: center;
    }
  }
}
</style>
