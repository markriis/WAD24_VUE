<template>
  <div>
    <HeaderComponent/>
      <div class="container">
        <div v-if="post">
          <h2>A Post</h2>

          <div class="form-container">
            <form @submit.prevent="updatePost">
              <label for="body">Body</label>
              <input
                  id="body"
                  v-model="post.body"
                  type="text"
                  placeholder="body"
                  required
              />

              <div class="update-or-delete">
                <input type="submit" class="button" value="Update">
                <button class="button" type="button" @click="deletePost">Delete</button>
              </div>
            </form>
          </div>
        </div>

        <div v-if="error" class="error">
          <p>{{ error }}</p>
        </div>
      </div>
    <FooterComponent />
  </div>
</template>
  
<script>
import HeaderComponent from '@/components/HeaderComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';

export default {
  name: 'PostPage',
  components: {
      HeaderComponent,
      FooterComponent,
  },

  props : [ 'id' ],

  data( ) {
    return {
      post : null,
      error : null,
    }
  },

  created( ) {
    this.fetchPost( );
  },

  watch : {
      id : 'fetchPost'
  },

  methods: {
    async updatePost( ) {
      const didSucceed = await this.$store.dispatch( "updatePost", { id : this.id, newbody : this.post.body } )

      if ( !didSucceed ) {
        this.error = "Something went wrong.";
      }
    },

    async fetchPost( ) {
      const data = await this.$store.dispatch( "getPost", { id : this.id } )

      if ( data.ok ) {
        this.post = data.post;
        this.error = null;
      } else {
        this.post = null;
        this.error = data.error;
      }
    },

    async deletePost( ) {
      const data = await this.$store.dispatch( "deletePost", { id : this.id } )

      console.log( 123217842765 )
      console.log( data )

      if ( data.ok ) {
        this.$router.push('/');
      } else {
        this.error = data.error;
      }
    }
  }
};
</script>

<style scoped>
.form-container {
  background-color: #c9c7c4;
  padding: 2rem 2.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 320px;
  text-align: center;

  & > form {
    display: flex;
    font-weight: bold;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 1rem;
    text-align: left;

    & input[type="text"] {
      padding: 0.5rem 1rem;
      border: 1px solid #3e3e3e;
      border-radius: 5px;
      font-size: 1rem;
      color: rgb(31, 31, 31);
      background-color: #f6f4f2;
    }

    & input[type="text"]::placeholder {
      color: #84817f;
    }
  }

  & .update-or-delete {
    display: flex;

    width: 100%;

    justify-content: space-around;
    align-items: center;
    gap: .6rem;

    margin-top: 1rem;

    & > p {
      font-size: 1.2rem;
      padding: 0 .6rem;
      height: fit-content;
    }

    & > .button {
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

    & > .button:hover {
      background-color: #403c3a;
      transform: scale(1.05);
    }
  }
}

.error {
  border-radius: 5px;
  border: 2px #e1666680 solid;
  background: rgba(191, 155, 155, 0.64);
  padding: .3rem .6rem;
}
</style>
 
  