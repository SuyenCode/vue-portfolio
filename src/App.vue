<script setup lang="ts">
import { RouterView } from 'vue-router'
import TheNavbar from './components/TheNavbar.vue'
</script>

<template>
	<header class="absolute inset-x-0 top-0 z-50">
		<TheNavbar />
	</header>

	<RouterView />
</template>

