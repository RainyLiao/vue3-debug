<script setup lang="ts">
import { createSingletonPromise, promiseTimeout } from '@/utils'

const handleClick = async () => {
  const createPromise = () => Promise.resolve(console.log(1))
  const wrapper = createSingletonPromise(createPromise)
  await wrapper()
  await promiseTimeout(8000)
  await wrapper.reset()
}
</script>

<template>
  <div>
    <RouterLink to="/watch-vs-watchEffect">
      watch-vs-watchEffect
    </RouterLink>
    <RouterLink to="/ref-unpack">
      ref-unpack
    </RouterLink>
    <RouterLink to="/toRef">
      toRef
    </RouterLink>
  </div>
  <button @click="handleClick">
    按钮
  </button>
</template>

<style scoped>

</style>
