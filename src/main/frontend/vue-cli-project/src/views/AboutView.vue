<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p>{{ json }}</p>
  </div>
</template>

<!-- CHANGED/ADDED: reading/printing some json when mounted -->
<script setup>
import { ref, onMounted } from "vue";

const json = ref(null);

const fetchJson = () => {
  fetch("/api")
    .then((response) => response.json())
    .then((data) => {
      json.value = data;
    })
    .catch((error) => (json.value = error));
};

onMounted(fetchJson);
</script>
