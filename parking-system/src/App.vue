<template>

  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  <h1>Danicast's Smart Parking System</h1>
  
  <div>
    <button v-on:click="get_data">Greet</button>
  
  </div>
 
</template>

<script>

  export default {
    data() {
      return {
        posts: [],
      };
    },

    methods: {
        get_data: async function () {
          var self = this;
          try {
            const response = await this.axios.get(
              "http://localhost:3001/spaces"
            );
            // JSON responses are automatically parsed.
            self.posts = response.data;
            console.log(posts);
          } catch (error) {
            console.log(error);
            alert(error);
          }
        },
      },

    // created() {
    //   this.getData();
    // },
  };

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
