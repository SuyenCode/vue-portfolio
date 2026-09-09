<script setup lang="ts">
import { ref } from 'vue'

type Language = { code: string; name: string }

const dutch: Language = { code: 'NL', name: 'Nederlands' }

const languages: Language[] = [
	dutch,
	{ code: 'FR', name: 'Français' },
	{ code: 'EN', name: 'English' },
]

const selectedLanguage = ref(dutch)
const menuOpen = ref(false)

const widestLanguageName = languages.reduce((widest, language) =>
	language.name.length > widest.length ? language.name : widest,
'')

// Hover underline: nav <a> tags + dropdown language <span>s (not the selected-language summary).
const navLinkClass =
	'relative w-fit pb-0.5 uppercase after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-[var(--electric-blue)] after:transition-all after:duration-200 hover:text-[var(--bright-blue)] hover:after:w-full'

function pickLanguage(language: Language, event: Event) {
	selectedLanguage.value = language
	const details = (event.currentTarget as HTMLElement).closest('details')
	details?.removeAttribute('open')
}
</script>

<template>
	<nav class="flex flex-wrap items-center gap-4 px-4 py-3 font-semibold tracking-wider">
		<button
			type="button"
			class="relative h-6 w-6 lg:hidden"
			:aria-expanded="menuOpen"
			aria-label="Menu"
			@click="menuOpen = !menuOpen"
		>
			<span
				class="nav-burger-line top-1"
				:class="menuOpen ? 'translate-y-2 rotate-45' : ''"
			></span>
			<span
				class="nav-burger-line top-3"
				:class="menuOpen ? 'opacity-0' : ''"
			></span>
			<span
				class="nav-burger-line top-5"
				:class="menuOpen ? '-translate-y-2 -rotate-45' : ''"
			></span>
		</button>

		<div
			class="relative w-full items-start justify-between gap-8 lg:flex-1"
			:class="menuOpen ? 'flex' : 'hidden lg:flex'"
		>
			<div class="flex flex-col gap-3 lg:flex-row lg:gap-6">
				<a href="#home" :class="navLinkClass">Thuis</a>
				<a href="#about" :class="navLinkClass">Over mij</a>
				<a href="#projects" :class="navLinkClass">Projects</a>
			</div>

			<div class="pointer-events-none invisible inline-flex items-center gap-2 px-3 uppercase" aria-hidden="true">
				<span>{{ widestLanguageName }}</span>
				<span class="text-xs">▾</span>
			</div>

			<details class="nav-lang z-20">
				<summary
					class="inline-flex cursor-pointer list-none items-center gap-2 px-3 uppercase select-none hover:text-[var(--bright-blue)] [&::-webkit-details-marker]:hidden"
				>
					<span class="relative">
						<span class="invisible">{{ widestLanguageName }}</span>
						<span class="absolute inset-y-0 left-0">{{ selectedLanguage.name }}</span>
					</span>
					<span class="nav-chevron inline-block text-xs transition-transform duration-200">▾</span>
				</summary>

				<ul class="nav-lang-menu py-1">
					<li v-for="language in languages" :key="language.code">
						<button
							v-show="language.code !== selectedLanguage.code"
							class="px-3 py-2 text-left"
							type="button"
							@click="pickLanguage(language, $event)"
						>
							<span :class="navLinkClass">{{ language.name }}</span>
						</button>
					</li>
				</ul>
			</details>
		</div>
	</nav>
</template>

<style scoped>
.nav-burger-line {
	position: absolute;
	left: 0;
	display: block;
	height: 0.125rem;
	width: 1.5rem;
	border-radius: 0.25rem;
	background: currentColor;
	transition: all 0.2s;
}

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
	right: 0;
	transform: translateY(-50%);
	border-color: transparent;
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
