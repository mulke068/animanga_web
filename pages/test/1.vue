<template>
  <div>
    <input type="text" v-model="search" placeholder="Search here…" />

    <div v-for="item in filteredItems" :key="item.id">
      {{ item.names.en }}
      {{ item.names.original}}
      {{ item.names.jp }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const search = ref('');
const data = ref([{ id: 1, names: {en: "Test", original: "Test Original" , jp: "Test Jp"} }, { id: 2, names:{ en : "Blesh", original: "Naruto", jp: "åƒ•ã®ãƒ’ãƒ¼ãƒ­ãƒ¼ã‚¢ã‚«ãƒ‡ãƒŸã‚¢"} }]); // replace with your actual data
console.log(data.value);

const filteredItems = computed(() => {
  if (!search.value) return data.value;
  return data.value.filter(item => {
    const searchString = search.value.toLowerCase();
    return item.names.en.toLowerCase().includes(searchString) ||
      item.names.original.toLowerCase().includes(searchString) ||
      item.names.jp.toLowerCase().includes(searchString)
  })
});
</script>