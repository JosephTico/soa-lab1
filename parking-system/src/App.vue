<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  <h1>Danicast's Smart Parking System</h1>
  {{ spaces }}

  <div>
    <button v-on:click="get_data">Greet</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const spaces = ref([]);
const reservations = ref([]);

const getSpaces = async () => {
  const response = await axios.get("http://localhost:3000/spaces");
  spaces.value = response.data;
};

onMounted(getSpaces);
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
