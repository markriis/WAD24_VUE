<template>
    <div class="add-post-container">
      <h2>Add Post</h2>
      <div class="input-group">
      
        <form @submit.prevent="submitPost">
    
            <label for="body">Body</label>
            <input
                id="body"
                v-model="postBody"
                type="text"
                placeholder="body"
                required
                />
            
              <button type="submit">Add</button>
            </form> 
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'AddPostComponent',
    data() {
        return {
            postBody: '',
        };
    },
    methods: {
        ...mapActions(['addPostAction']),
        async submitPost() {
            await this.addPostAction({body: this.postBody});
            this.postBody ='';
            this.$router.push('/');
        },
    },
};
</script>

<style scoped>
.add-post-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  background-color: #ececec; 
  border: 2px solid #b5a3a3;
}
.input-group {
  background-color: #c9c7c4;
  padding: 2rem 2.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 320px;
  text-align: center;

}

/* Form Styling */
form {
  display: flex;
  font-weight: bold;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
  text-align: left;

}
input[type="text"] {
  padding: 0.5rem 1rem;
  border: 1px solid #3e3e3e;
  border-radius: 5px;
  font-size: 1rem;
  color: rgb(31, 31, 31);
  background-color: #f6f4f2;
}

input[type="text"]::placeholder {
  color: #84817f;
}


button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #655f5b;
  color: white;
 align-self: center;
}

button:hover {
  background-color: #403c3a; 
  transform: scale(1.05);
}


h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #44413e; 

}


</style>