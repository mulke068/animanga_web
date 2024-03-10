<template>
  <div class="mt-4">
    <h3 class="text-xl font-semibold mt-4">
      {{ title }}
    </h3>
    <div v-for="(val, index) in value" :key="index" class="mt-2">
      <input
        v-model="value[index]"
        type="url"
        :placeholder="placeholder"
        class="input-field"
      >
      <!-- Buttons for Del arrays -->
      <button
        class="delete-button"
        @click.prevent="removeItem(index)"
      >
        Remove {{ title }}
      </button>
    </div>
    <!-- Buttons for Add arrays -->
    <div class="flex justify-between mt-4">
      <button
        class="add-button"
        @click.prevent="addItem"
      >
        Add {{ title }}
      </button>
    </div>
  </div>

  <!-- <div class="mt-4">
                <h3 class="text-xl font-semibold mt-4">Info URLs:</h3>
                <div v-for="(info_url, index) in formData.info_urls" :key="index">
                    <input type="text" v-model="info_url[index]" class="text-purple-600 hover:underline dark:text-yellow-300 dark:hover:text-yellow-500" />
                </div>
            </div> -->
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  methods: {
    addItem () {
      this.value.push('')
    },
    removeItem (index) {
      this.value.splice(index, 1)
    }
  }
}
</script>
