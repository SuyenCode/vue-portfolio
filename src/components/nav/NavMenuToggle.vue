<script setup lang="ts">
const open = defineModel<boolean>({ required: true })
</script>

<template>
	<button
		type="button"
		class="relative h-6 w-6 cursor-pointer lg:hidden"
		:aria-expanded="open"
		aria-label="Menu"
		@click="open = !open"
	>
		<span class="nav-burger-line top-1" :class="{ 'translate-y-2 rotate-45': open }"></span>
		<span class="nav-burger-line top-3" :class="{ 'opacity-0': open }"></span>
		<span class="nav-burger-line top-5" :class="{ '-translate-y-2 -rotate-45': open }"></span>
	</button>
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
