<script setup lang="ts">
import { ref } from 'vue'
import NavLanguageSelect from './NavLanguageSelect.vue'
import { defaultLanguage, languages } from '../data/languages'

const navLinks = [
	{ href: '#home', label: 'Thuis' },
	{ href: '#about', label: 'Over mij' },
	{ href: '#projects', label: 'Projects' },
]

const selectedLanguage = ref(defaultLanguage)
const menuOpen = ref(false)
</script>

<template>
	<nav class="flex flex-wrap items-center gap-4 px-4 py-3 font-semibold tracking-wider">
		<button
			type="button"
			class="relative h-6 w-6"
			:aria-expanded="menuOpen"
			aria-label="Menu"
			@click="menuOpen = !menuOpen"
		>
			<span class="nav-burger-line top-1" :class="{ 'translate-y-2 rotate-45': menuOpen }"></span>
			<span class="nav-burger-line top-3" :class="{ 'opacity-0': menuOpen }"></span>
			<span class="nav-burger-line top-5" :class="{ '-translate-y-2 -rotate-45': menuOpen }"></span>
		</button>

		<div v-show="menuOpen" class="nav-panel relative flex w-full items-start justify-between gap-8">
			<ul class="flex flex-col gap-3">
				<li v-for="link in navLinks" :key="link.href">
					<a :href="link.href" class="nav-link" @click="menuOpen = false">
						{{ link.label }}
					</a>
				</li>
			</ul>

			<NavLanguageSelect v-model="selectedLanguage" :languages="languages" />
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
</style>
