<script setup lang="ts">
import { reactive, ref, watch, watchEffect } from 'vue'

// 监听普通ref对象
const number = ref(0)
watch(number, (newValue, oldValue) => {
  console.log('新的值:', newValue)
  console.log('旧的值:', oldValue)
})
const add = () => {
  number.value += 1
}

// 监听reactive对象
const person = reactive({
  name: '小明',
  age: 11,
  info: {
    address: '广州番禺',
  },
})
watch(person, (newValue, oldValue) => {
  console.log('新的值:', newValue)
  console.log('旧的值:', oldValue)
})

const changeAddress = () => {
  person.info.address = '广州天河'
}

// 监听复杂ref对象
const person2 = ref({
  name: '小明',
  age: 11,
  info: {
    address: '广州番禺',
  },
})
watch(person2, (newValue, oldValue) => {
  console.log('新的值:', newValue)
  console.log('旧的值:', oldValue)
}, { deep: true })

const changeAddress2 = () => {
  person2.value.info.address = '广州天河'
}

// 监听getter函数
const x1 = ref(12)
const x2 = ref(13)
watch(
  () => x1.value + x2.value,
  (newValue, oldValue) => {
    console.log('新的值:', newValue)
    console.log('旧的值:', oldValue)
  },
)
const changeX1AndX2 = () => {
  x1.value += 1
  x2.value += 2
}

// 监听getter函数返回响应式对象
const calculator = reactive({ count: 0 })
const countAdd = () => {
  calculator.count++
}
watch(
  () => calculator,
  (newValue, oldValue) => {
    console.log('新的值:', newValue)
    console.log('旧的值:', oldValue)
  },
  { deep: true },
)

// 案例：弹框挂载的时候需要请求一次select框的数据，当纳税人类型改变的时候，又要重新请求不同的数据
const nsrlx = ref<'0' | '1'>('0')
const selectData = ref<Array<number>>([])
const mockRequestData = new Map<'0' | '1', Array<number>>([['0', [1, 2, 3]], ['1', [4, 5, 6]]])
// watch(nsrlx, () => {
//   selectData.value = mockRequestData.get(nsrlx.value)!
// }, { immediate: true })
watchEffect(() => {
  selectData.value = mockRequestData.get(nsrlx.value)!
})
const handleNsrlxChange = () => {
  if (nsrlx.value === '0')
    nsrlx.value = '1'

  else
    nsrlx.value = '0'
}

/**
 * 监听dom， watchPostEffect，watchSyncEffect
 * 在某些特殊情况下 (例如要使缓存失效)，可能有必要在响应式依赖发生改变时立即触发侦听器。这可以通过设置 flush: 'sync' 来实现。
 * 然而，该设置应谨慎使用，因为如果有多个属性同时更新，这将导致一些性能和数据一致性的问题。
 */
const message = ref('Hello World!')
const sendMessage = () => {
  message.value = 'Hello World! Li!'
}
const msgRef = ref<any>(null)
watch(message, (newValue, oldValue) => {
  console.log('DOM 节点', msgRef.value.innerHTML)
  console.log('新的值:', newValue)
  console.log('旧的值:', oldValue)
}, {
  flush: 'post',
})

setTimeout(() => {
  const unwatch = watchEffect(() => {})
  unwatch()
}, 100)
</script>

<template>
  <div>
    <button @click="add">
      增加
    </button>
    监听普通ref对象: {{ number }}
  </div>
  <div>
    <button @click="changeAddress2">
      改变地址
    </button>
    监听复杂ref对象: {{ person2 }}
  </div>
  <div>
    <button @click="changeAddress">
      改变地址
    </button>
    监听reactive对象: {{ person }}
  </div>
  <div>
    <button @click="changeX1AndX2">
      改变x1和x2
    </button>
    监听getter函数: {{ x1 }} and {{ x2 }}
  </div>
  <div>
    <button @click="countAdd">
      改变计数对象
    </button>
    监听getter函数返回响应式对象: {{ calculator }}
  </div>
  <div>
    <button @click="handleNsrlxChange">
      改变纳税人类型
    </button>
    下拉框选项列表：{{ selectData }}
  </div>
  <div>
    <button @click="sendMessage">
      发送消息
    </button>
    <span ref="msgRef">
      {{ message }}
    </span>
  </div>
</template>
