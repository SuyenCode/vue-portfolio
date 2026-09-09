<script setup lang="ts">
import { computed } from 'vue'
import type { Language } from '../data/languages'

const CLOSE_MS = 250

const selectedLanguage = defineModel<Language>({ required: true })

const props = defineProps<{
	languages: Language[]
}>()

const widestLanguageName = computed(() =>
	props.languages.reduce(
		(widest, language) => (language.name.length > widest.length ? language.name : widest),
		'',
	),
)

const otherLanguages = computed(() =>
	props.languages.filter((language) => language.code !== selectedLanguage.value.code),
)

function closePicker(details: HTMLDetailsElement) {
	if (!details.open) return

	const startTop = details.getBoundingClientRect().top
	details.classList.add('nav-lang--closing')
	details.removeAttribute('open')
	details.style.transition = 'none'
	details.style.transform = `translateY(${startTop - details.getBoundingClientRect().top}px)`
	void details.offsetHeight

	requestAnimationFrame(() => {
		details.style.transition = 'transform 0.25s ease, border-color 0.25s ease'
		details.style.transform = 'translateY(0)'
	})

	window.setTimeout(() => {
		details.classList.remove('nav-lang--closing')
		details.style.transition = ''
		details.style.transform = ''
	}, CLOSE_MS)
}

function onSummaryClick(event: MouseEvent) {
	const details = (event.currentTarget as HTMLElement).closest('details')
	if (!details?.open) return

	event.preventDefault()
	closePicker(details)
}

function pickLanguage(language: Language, event: Event) {
	const trigger = event.currentTarget as HTMLElement
	const details = trigger.closest('details')

	trigger.blur()
	selectedLanguage.value = language
	if (details) closePicker(details)
}
</script>

<template>
	<div class="pointer-events-none invisible inline-flex items-center gap-2 px-3 uppercase" aria-hidden="true">
		<span>{{ widestLanguageName }}</span>
		<span class="text-xs">▾</span>
	</div>

	<details class="nav-lang z-20">
		<summary
			class="inline-flex cursor-pointer list-none items-center gap-2 px-3 uppercase select-none hover:text-[var(--bright-blue)] [&::-webkit-details-marker]:hidden"
			@click="onSummaryClick"
		>
			<span class="relative">
				<span class="invisible">{{ widestLanguageName }}</span>
				<span class="absolute inset-y-0 left-0">{{ selectedLanguage.name }}</span>
			</span>
			<span class="nav-chevron inline-block text-xs transition-transform duration-200">▾</span>
		</summary>

		<ul class="nav-lang-menu py-1">
			<li v-for="language in otherLanguages" :key="language.code">
				<button class="px-3 py-2 text-left" type="button" @click="pickLanguage(language, $event)">
					<span class="nav-link">{{ language.name }}</span>
				</button>
			</li>
		</ul>
	</details>
</template>

<style scoped>
details[open] .nav-chevron {
	transform: rotate(180deg);
}

.nav-lang {
	position: absolute;
	top: 0;
	right: 0;
	box-sizing: border-box;
	width: max-content;
	border: 1px solid var(--electric-blue);
	background: transparent;
	transition:
		top 0.25s ease,
		transform 0.25s ease,
		border-color 0.25s ease;
}

.nav-lang[open] {
	top: 50%;
	transform: translateY(-50%);
	border-color: transparent;
}

.nav-lang--closing .nav-lang-menu {
	display: none;
}

.nav-lang summary {
	border-top: 1px solid transparent;
	transition:
		border-color 0.25s ease,
		color 0.25s ease;
}

.nav-lang[open] summary {
	border-top-color: var(--electric-blue);
	color: var(--electric-blue);
}

.nav-lang-menu {
	width: 100%;
	box-sizing: border-box;
	border-left: 1px solid transparent;
	border-right: 1px solid transparent;
	border-bottom: 1px solid transparent;
	transition: border-color 0.25s ease;
}

.nav-lang[open] .nav-lang-menu {
	border-left-color: var(--electric-blue);
	border-right-color: var(--electric-blue);
	border-bottom-color: var(--electric-blue);
	animation: nav-lang-in 0.25s ease-out;
}

@keyframes nav-lang-in {
	from {
		opacity: 0;
		transform: translateY(-0.5rem);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}
</style>
