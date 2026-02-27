<script setup lang="ts">
import { onMounted, ref } from 'vue';

const data = ref<any>(null);
const error = ref<string | null>(null);

onMounted(async () => {
  try {
    const res = await fetch('http://localhost:3000/health');
    data.value = await res.json();
  } catch (e: any) {
    error.value = e?.message ?? String(e);
  }
});
</script>

<template>
  <div style="max-width: 720px; margin: 40px auto;">
    <h2>Frontend → Backend check</h2>

    <pre v-if="data">{{ data }}</pre>
    <p v-else-if="error" style="color: red;">{{ error }}</p>
    <p v-else>Loading…</p>
  </div>
</template>