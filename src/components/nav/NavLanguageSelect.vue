<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Language } from '../../data/languages'
import { useDetailsSlideClose } from '../../composables/useDetailsSlideClose'
import { useHoverKey } from '../../composables/useHoverKey'

const selectedLanguage = defineModel<Language>({ required: true })

const props = defineProps<{
	languages: Language[]
}>()

const detailsRef = ref<HTMLDetailsElement | null>(null)
const { close, onSummaryClick } = useDetailsSlideClose(detailsRef)
const { key: hoveredCode, enter, leave } = useHoverKey()

const widestLanguageName = computed(() =>
	props.languages.reduce(
		(widest, language) => (language.name.length > widest.length ? language.name : widest),
		'',
	),
)

const otherLanguages = computed(() =>
	props.languages.filter((language) => language.code !== selectedLanguage.value.code),
)

function pickLanguage(language: Language, event: Event) {
	;(event.currentTarget as HTMLElement).blur()
	leave()
	selectedLanguage.value = language
	close()
}
</script>

<template>
	<div class="pointer-events-none invisible inline-flex items-center gap-2 px-3 uppercase" aria-hidden="true">
		<span>{{ widestLanguageName }}</span>
		<span class="text-xs">▾</span>
	</div>

	<details ref="detailsRef" class="nav-lang z-20">
		<summary
			class="inline-flex list-none items-center gap-2 px-3 uppercase select-none [&::-webkit-details-marker]:hidden"
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
				<button
					class="px-3 py-2 text-left"
					type="button"
					@mouseenter="enter(language.code)"
					@mouseleave="leave"
					@click="pickLanguage(language, $event)"
				>
					<span class="nav-link" :class="{ 'is-hover': hoveredCode === language.code }">
						{{ language.name }}
					</span>
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
	width: max-content;
	border: 1px solid var(--electric-blue);
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

.nav-lang--closing {
	pointer-events: none;
}

.nav-lang--closing .nav-lang-menu {
	display: none;
}

.nav-lang summary {
	cursor: pointer;
	border-top: 1px solid transparent;
	transition:
		border-color 0.25s ease,
		color 0.25s ease;
}

.nav-lang summary:hover {
	color: var(--bright-blue);
}

.nav-lang[open] summary {
	border-top-color: var(--electric-blue);
	color: var(--electric-blue);
}

.nav-lang-menu {
	width: 100%;
	border-left: 1px solid transparent;
	border-right: 1px solid transparent;
	border-bottom: 1px solid transparent;
	transition: border-color 0.25s ease;
}

.nav-lang-menu button {
	cursor: pointer;
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
