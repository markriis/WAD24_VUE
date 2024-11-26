<template>
    <div class="validator">
        <div v-if="showErrors && errorMessages.length > 0" class="error-box">
      <p class="error-summary">The password is not valid:</p>
      <ul class="error-list">
        <li v-for="(error, index) in errorMessages" :key="index" class="error-item">
          {{ error }}
        </li>
      </ul>
    </div>
    </div>
</template>

<script>

//peab olema näha seda et saad vaadata parooli


export default {
    name: 'ValidatorComponent',
    props: {
        password: {
            type: String, 
            required: true,
        },
        showErrors: {
            type: Boolean,
            default:false,
        }
    },
    data() {
        return {
            errorMessages: [], //list of validation error
        };
    },
    watch: {
        //reactively validate password whenever it changes
        password: {
            handler: 'validatePassword',
            immediate: false,
        },
        showErrors: {
            handler: 'validatePassword',
        }
    }, 
    methods: {
        validatePassword() {
            const errors= [];
            if (this.password.length < 8 || this.password.length > 14 ){
                errors.push('Password should be at least 8 chars and less then 15 chars')
            }
            if (!/[A-Z]/.test(this.password)) {
                errors.push('Password must include at least one uppercase alphabet character.');
            }
            if ((this.password.match(/[a-z]/g) || []).length < 2) {
                errors.push('Password must include at least two lowercase alphabet characters.');
            }
            if (!/\d/.test(this.password)) {
                errors.push('Password must include at least one numeric value.');
            }
            if (!/^[A-Z]/.test(this.password)) {
                errors.push('Password must start with an uppercase alphabet character.');
            }
            if (!/_/.test(this.password)) {
                errors.push('Password must include the character "_".');
            }
            this.errorMessages = this.showErrors ? errors : []; // Update the error messages
            this.$emit('validation-status', errors.length === 0); // Emit validation status to parent
        },
    }
    
};
</script>

<style scoped>

.error-box {

    background-color: #e0dada;
    padding: 10px;
    border: 5px solid #b5a3a3;
    width: 90%;
    margin: 0 auto;
}
.validator {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 0.5rem;
 
    
}

.error-summary {
    color: rgb(255, 0, 187);
    font-size: 1rem;
    margin: 0.5rem 0;
    margin-bottom: 1rem;
    font-weight: bold;
}

.error-list {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.error-item {
    margin-top: 0.4rem;
    color: rgb(220, 49, 169);
    line-height: 1.5;
    max-width: 60%;
    word-wrap: break-word;
    
    
}



    

</style>