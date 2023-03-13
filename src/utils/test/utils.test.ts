import { ref } from 'vue'
import { createSingletonPromise, promiseTimeout } from '../utils'

describe('promise', () => {
  it('should promiseTimeout work', async () => {
    const num = ref(0)
    setTimeout(() => {
      num.value = 1
    }, 100)

    await promiseTimeout(100)

    expect(num.value).toBe(1)
  })

  it('should promiseTimeout throw timeout', async () => {
    await promiseTimeout(100, true).catch((error) => {
      expect(error).toBe('Timeout')
    })
  })

  it('should createSingletonPromise work', async () => {
    const n = 1
    const createPromise = () => Promise.resolve(n + 1)
    const wrapper = createSingletonPromise(createPromise)
    const promise1 = wrapper()
    const promise2 = wrapper()

    expect(promise1).toBe(promise2)
    const value = await promise1
    expect(value).toBe(2)
  })

  it('should createSingletonPromise reset', async () => {
    const cb = vi.fn()
    const createPromise = () => Promise.resolve(0).then(cb)
    const wrapper = createSingletonPromise(createPromise)
    const promise1 = wrapper()

    await wrapper.reset()
    expect(cb).toHaveBeenCalled()

    const promise2 = wrapper()
    expect(promise1).not.toBe(promise2)
  })
})
