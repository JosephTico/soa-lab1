<template>
  <div>
    <h1>Danicast's Smart Parking System</h1>
    <p>Lista de parkeos:</p>
    <ul>
      <li v-for="space in spaces" :key="space.id">
        Espacio #{{ space.id }}: {{ space.description }} - Estado:
        {{ space.state }}
      </li>
    </ul>
    <p>Lista de reservaciones:</p>
    <ul>
      <li v-for="reservation in reservations" :key="reservation.id">
        Reservación #{{ reservation.id }}: {{ reservation }}
        <button v-on:click="deleteReservation(reservation.id)">X</button>
      </li>
    </ul>
    <button v-on:click="createSpace">Nuevo espacio</button>
    <button v-on:click="bookSpace">Nueva reservación</button>
    <button v-on:click="getSpaces">Actualizar</button>
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
const createSpace = async () => {
  let description = prompt("Inserte una descripción");
  const data = { description };
  const response = await axios.post("http://localhost:3000/spaces", data);
  getSpaces();
  getReservations();
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
const bookSpace = async () => {
  let plate = prompt("Inserte la placa");
  const data = { plate };
  try {
    const response = await axios.post(
      "http://localhost:3000/reservations",
      data
    );
    getSpaces();
    getReservations();
  } catch (error) {
    alert("No se ha podido hacer la reservación, espacios llenos.");
    getSpaces();
    getReservations();
  }
};

// Delete Reservation
// DELETE /reservations/{id}
const deleteReservation = async (id) => {
  try {
    const response = await axios.delete(
      "http://localhost:3000/reservations/" + id
    );
    getSpaces();
    getReservations();
  } catch (error) {
    alert("No se ha podido borrar.");
    getSpaces();
    getReservations();
  }
};

onMounted(getSpaces);
onMounted(getReservations);
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
