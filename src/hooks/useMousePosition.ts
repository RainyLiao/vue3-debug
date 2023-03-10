import { type Ref, reactive, toRefs } from 'vue'
import { onMounted, onUnmounted } from 'vue'

interface MousePosition {
  x: Ref<number>
  y: Ref<number>
}
function useMousePosition(): MousePosition {
  const position = reactive({
    x: 0,
    y: 0,
  })

  const updateMouse = (e: MouseEvent) => {
    position.x = e.pageX
    position.y = e.pageY
  }

  onMounted(() => {
    document.addEventListener('click', updateMouse)
  })

  onUnmounted(() => {
    document.removeEventListener('click', updateMouse)
  })

  return toRefs(position)
}

export default useMousePosition
