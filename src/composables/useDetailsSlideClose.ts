import { onMounted, onUnmounted, type Ref } from 'vue'

const CLOSE_MS = 250
const CLOSING_CLASS = 'nav-lang--closing'

export function useDetailsSlideClose(detailsRef: Ref<HTMLDetailsElement | null>) {
	let isClosing = false
	let closeTimer = 0

	function clearCloseStyles(details: HTMLDetailsElement) {
		details.classList.remove(CLOSING_CLASS)
		details.style.top = ''
		details.style.transition = ''
		details.style.transform = ''
		isClosing = false
	}

	function close() {
		const details = detailsRef.value
		if (!details?.open || isClosing) return

		isClosing = true
		window.clearTimeout(closeTimer)

		const visualTop = details.getBoundingClientRect().top
		const computedStyle = getComputedStyle(details)

		details.style.transition = 'none'
		details.style.top = computedStyle.top
		details.style.transform = computedStyle.transform
		details.classList.add(CLOSING_CLASS)
		details.removeAttribute('open')

		details.style.top = '0'
		details.style.transform = 'none'
		const restTop = details.getBoundingClientRect().top
		details.style.transform = `translateY(${visualTop - restTop}px)`
		void details.offsetHeight

		const finish = () => {
			details.removeEventListener('transitionend', onTransformEnd)
			window.clearTimeout(closeTimer)
			if (!isClosing) return
			clearCloseStyles(details)
		}

		const onTransformEnd = (event: TransitionEvent) => {
			if (event.propertyName !== 'transform') return
			finish()
		}

		requestAnimationFrame(() => {
			details.style.transition = 'transform 0.25s ease, border-color 0.25s ease'
			details.style.transform = 'translateY(0)'
			details.addEventListener('transitionend', onTransformEnd)
		})

		closeTimer = window.setTimeout(finish, CLOSE_MS + 50)
	}

	function onSummaryClick(event: MouseEvent) {
		const details = detailsRef.value
		if (!details || isClosing) {
			event.preventDefault()
			return
		}

		if (!details.open) return

		event.preventDefault()
		close()
	}

	function onPointerDownOutside(event: PointerEvent) {
		const details = detailsRef.value
		if (!details?.open || isClosing) return
		if (details.contains(event.target as Node)) return
		close()
	}

	onMounted(() => {
		document.addEventListener('pointerdown', onPointerDownOutside, true)
	})

	onUnmounted(() => {
		document.removeEventListener('pointerdown', onPointerDownOutside, true)
		window.clearTimeout(closeTimer)
	})

	return { close, onSummaryClick }
}
