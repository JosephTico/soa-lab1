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

// List of Spaces
// GET /spaces
const getSpaces = async () => {
  const response = await axios.get("http://localhost:3000/spaces");
  spaces.value = response.data;
};

// Ask for space state
// GET /spaces/{id} 

// Create Space
// POST /spaces
const createSpace = async (descripcion) => {
  const data = { "description": descripcion };
  const response = await axios.post("http://localhost:3000/spaces", data);
  getSpaces();
};

// Modify Space Data
// PUT /spaces/{id} 

// Delete Space
// DELETE /spaces/{id} 

// List of Reservations
// GET /reservations
const getReservations = async () => {
  const response = await axios.get("http://localhost:3000/reservations");
  reservations.value = response.data;
};

// Book an Space
// POST /reservations
const bookSpace = async (plate) => {
  const data = { "plate": plate };
  const response = await axios.post("http://localhost:3000/reservations", data);
  getReservations();
};

// Delete Reservation
// DELETE /reservations/{id}


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
