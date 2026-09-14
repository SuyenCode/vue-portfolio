import { onMounted, onUnmounted, type Ref } from 'vue'

export function useDetailsClose(detailsRef: Ref<HTMLDetailsElement | null>) {
	function close() {
		detailsRef.value?.removeAttribute('open')
	}

	function onSummaryClick(event: MouseEvent) {
		if (!detailsRef.value?.open) return
		event.preventDefault()
		close()
	}

	function onPointerDownOutside(event: PointerEvent) {
		const details = detailsRef.value
		if (!details?.open) return
		if (details.contains(event.target as Node)) return
		close()
	}

	onMounted(() => {
		document.addEventListener('pointerdown', onPointerDownOutside, true)
	})

	onUnmounted(() => {
		document.removeEventListener('pointerdown', onPointerDownOutside, true)
	})

	return { close, onSummaryClick }
}
