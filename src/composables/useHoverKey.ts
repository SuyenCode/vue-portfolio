import { ref } from 'vue'

export function useHoverKey() {
	const key = ref<string | null>(null)

	function enter(value: string) {
		key.value = value
	}

	function leave() {
		key.value = null
	}

	return { key, enter, leave }
}
