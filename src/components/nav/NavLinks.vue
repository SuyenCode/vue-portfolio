<script setup lang="ts">
import type { NavLink } from '../../data/navLinks'
import { useHoverKey } from '../../composables/useHoverKey'

defineProps<{
	links: NavLink[]
}>()

const emit = defineEmits<{
	navigate: []
}>()

const { key: hoveredHref, enter, leave } = useHoverKey()
</script>

<template>
	<ul
		class="relative z-10 flex shrink-0 flex-col gap-3 lg:absolute lg:left-1/2 lg:flex-row lg:items-center lg:gap-6 lg:-translate-x-1/2"
	>
		<li v-for="link in links" :key="link.href">
			<a
				:href="link.href"
				class="nav-link"
				:class="{ 'is-hover': hoveredHref === link.href }"
				@mouseenter="enter(link.href)"
				@mouseleave="leave"
				@click="emit('navigate')"
			>
				{{ link.label }}
			</a>
		</li>
	</ul>
</template>
