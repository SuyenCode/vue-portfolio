<script setup lang="ts">
import { ref } from 'vue'

const dutch = { code: 'NL', name: 'Nederlands', flag: '🇳🇱' }

const languages = [
	dutch,
	{ code: 'FR', name: 'Français', flag: '🇫🇷' },
	{ code: 'EN', name: 'English', flag: '🇬🇧' },
]

const selectedLanguage = ref(dutch)
</script>

<template>
	<nav class="navbar">
		
		<div class="nav-links">
			<a href="#home">Thuis</a>
			<a href="#about">Over mij</a>
			<a href="#projects">Projects</a>

			<div class="dropdown">
				<button class="dropdown-toggle" type="button" aria-haspopup="listbox">
					<span aria-hidden="true">{{ selectedLanguage.flag }}</span>
					{{ selectedLanguage.code }} ▾
				</button>
				<div class="dropdown-menu">
					<button
						v-for="language in languages"
						:key="language.code"
						v-show="language.code !== selectedLanguage.code"
						class="language-option"
						type="button"
						@click="selectedLanguage = language"
					>
						<span aria-hidden="true">{{ language.flag }}</span>
						{{ language.name }}
					</button>
				</div>
			</div>
		</div>
	</nav>
</template>

<style scoped>
	.navbar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;
		background-color: #333;
		color: #fff;
	}

	.nav-links {
		display: flex;
		align-items: center;
	}
</style>
