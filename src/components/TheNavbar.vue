<script setup lang="ts">
import { ref } from 'vue'
import NavMenuToggle from './nav/NavMenuToggle.vue'
import NavLinks from './nav/NavLinks.vue'
import NavLanguageSelect from './nav/NavLanguageSelect.vue'
import { defaultLanguage, languages } from '../data/languages'
import { navLinks } from '../data/navLinks'

const selectedLanguage = ref(defaultLanguage)
const menuOpen = ref(false)
</script>

<template>
	<nav class="flex flex-wrap items-center gap-4 px-4 py-3 font-semibold tracking-wider">
		<NavMenuToggle v-model="menuOpen" />

		<div v-show="menuOpen" class="nav-panel relative flex w-full flex-nowrap items-start justify-between gap-8">
			<NavLinks :links="navLinks" @navigate="menuOpen = false" />
			<NavLanguageSelect v-model="selectedLanguage" :languages="languages" />
		</div>
	</nav>
</template>
