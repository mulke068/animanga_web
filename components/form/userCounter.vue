<template>
  <div class=" self-auto">
    <strong class="text-purple-600">{{ title }}</strong>
    <button class="bg-purple-600 text-white px-2 py-1 rounded " @click="changeValue(-increaseDecrease)">
      -
    </button>
    <span class="text-gray-800 dark:text-gray-300 p-2">{{ counter }}</span>
    <button class="bg-purple-600 text-white px-2 py-1 rounded " @click="changeValue(+increaseDecrease)">
      +
    </button>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: false,
      default: ''
    },
    increaseDecrease: {
      type: Number,
      required: false,
      default: 1
    },
    currentValue: {
      type: Number,
      required: true
    },
    maxValue: {
      type: Number,
      required: true
    }
  },
  emits: ['updatedValue'],
  data () {
    return {
      counter: 0
    }
  },
  watch: {
    counter () {
      this.passUpdateValue()
    }
  },
  mounted () {
    this.counter = this.currentValue
  },
  methods: {
    changeValue (x) {
      const cal = this.counter + x
      if ((cal >= 0) && (cal <= this.maxValue)) {
        this.counter = cal
      }
    },
    passUpdateValue () {
      this.$emit('updatedValue', this.counter)
    }
  }

}

</script>
