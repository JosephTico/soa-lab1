<template>
  <div>
    <h1>Danicast's Smart Parking System</h1>
    <p>Lista de parkeos:</p>
    <ul>
      <li v-for="space in spaces" :key="space.id">
        Espacio #{{ space.id }}: {{ space.description }}
      </li>
    </ul>
    <p>Lista de reservaciones:</p>
    <ul>
      <li v-for="reservation in reservations" :key="reservation.id">
        Reservación #{{ reservation.id }}: {{ reservation }}
      </li>
    </ul>
    <button>Nuevo espacio</button>
    <button>Nueva reservación</button>
    <button v-on:click="getSpaces">Actualizar</button>
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
