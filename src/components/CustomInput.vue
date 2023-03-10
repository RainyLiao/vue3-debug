<script setup lang="ts">
import { computed, useAttrs } from 'vue'
const props = defineProps(['modelValue', 'label'])

const emit = defineEmits(['update:modelValue'])

const attrs = useAttrs()

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<template>
  <div class="custom-input__container">
    <span>{{ label }}</span>
    <input v-model="value" v-bind="attrs">
  </div>
</template>

<style scoped>
.custom-input__container {
  display: inline-block;
  background-color: red;
}
</style>
