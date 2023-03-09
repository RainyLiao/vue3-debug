<script setup lang="ts">
import { reactive, ref, shallowReactive } from 'vue'

const message = ref('Hello World!')
const object1 = { foo: ref(1) }
const { foo } = object1

// 只有当嵌套在一个深层响应式对象内时，才会发生 ref 解包。当其作为浅层响应式对象的属性被访问时不会解包。
const name = ref('小明')
const person = reactive({
  name,
})
console.log(name)
person.name = '小张'
console.log(name)
// 浅层响应式对象
const name1 = ref('小辉')
const person1 = shallowReactive({
  name: name1,
})
console.log(name1)
person1.name = '小涛'
console.log(name1)

// 数组和集合类型的不会对ref进行解包
const books = reactive([ref('Vue 3 Guide')])
console.log(books[0].value)
const map = reactive(new Map([['count', ref(0)]]))
console.log(map.get('count')!.value)
</script>

<template>
  <p>{{ message }}</p>
  <p>
    {{ object1.foo.value + 1 }}
    {{ foo + 1 }}
    {{ object1.foo }}
  </p>
</template>

<style scoped>

</style>
