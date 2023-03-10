<script setup lang="ts">
import { reactive, toRef } from 'vue'
import CustomInput from '@/components/CustomInput.vue'
import { useMousePosition } from '@/hooks'

// 更改该 ref 会更新源属性
const state = reactive({
  foo: 1,
  bar: 2,
})
const fooRef = toRef(state, 'foo')
const updateFooRef = () => {
  fooRef.value++
  console.log(state.foo) // 2
}

// 获取用户鼠标位置
const { x, y } = useMousePosition()
</script>

<template>
  <div>
    <button @click="updateFooRef">
      更新fooRef
    </button>
    state: {{ state }}
    fooRef: {{ fooRef }}
  </div>

  <CustomInput v-model="fooRef" />

  当前鼠标的位置: {{ x }} - {{ y }}
</template>

<style scoped>

</style>
