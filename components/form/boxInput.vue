<template>
  <div class="mt-4">
    <h3 class="text-xl font-semibold mt-4">
      {{ title }}
    </h3>
    <textarea
      v-model="inputText"
      spellcheck="false"
      class="bg-blue-200 text-blue-700 dark:bg-green-400 dark:text-green-900 rounded-full px-2 py-1 mt-2"
      :placeholder="placeholder"
      @input="updateItems"
    />
    <div class="flex flex-wrap mt-2">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="mr-2 rounded-full bg-blue-200 text-blue-700 dark:bg-green-400 dark:text-green-900 px-2 py-1 focus-within:ring-2 focus-within:ring-black dark:focus-within:ring-white"
      >
        {{ item }}
        <button
          class="text-red-500 hover:text-red-700 dark:text-yellow-300 dark:hover:text-yellow-500 focus:outline-none"
          @click.prevent="removeItem(index)"
        >
          X
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: Array,
    title: String,
    placeholder: String
  },
  data () {
    return {
      inputText: '',
      items: []
    }
  },
  watch: {
    items () {
      this.passUpdatedArray()
    }
  },
  mounted () {
    this.items = [...this.value]
    this.inputText = this.items.join(', ')
  },
  methods: {
    updateItems () {
      const delimiters = /[,;\n]/
      this.items = this.inputText.split(delimiters).map(item => item.trim()).filter(Boolean)
      // this.$emit('input', this.items);
    },
    removeItem (index) {
      this.items.splice(index, 1)
      this.inputText = this.items.join(', ')
      // this.$emit('input', this.items);
    },
    passUpdatedArray () {
      this.$emit('updatedArray', this.items)
    }
  }
}
</script>
