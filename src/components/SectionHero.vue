<script setup lang="ts">
import portrait from '../assets/hero-portrait.png'
import logoSvg from '../assets/suyen-logo.svg?url'
import { heroContent } from '../data/hero'

const { scriptName, title, kicker, tagline } = heroContent
</script>

<template>
	<section id="home" class="hero" aria-label="Hero">
		<div class="hero-copy">
			<div class="hero-wordmark">
				<div class="hero-topline">
					<img
						class="hero-name"
						:src="logoSvg"
						:alt="scriptName"
						width="697"
						height="213"
					/>
					<p class="hero-kicker">{{ kicker }}</p>
				</div>
				<h1 class="hero-title" :aria-label="title"><span class="hero-title-line">{{ title.slice(0, 4) }}</span><span class="hero-title-line">{{ title.slice(4) }}</span></h1>
			</div>
			<p class="hero-tagline">{{ tagline }}</p>
		</div>

		<div class="hero-portrait">
			<img :src="portrait" alt="Suyen" />
		</div>
	</section>
</template>

<style scoped>
.hero {
	--hero-pad-x: max(4vw, calc(360px * 0.04));
	--nav-offset: 4.5rem;
	--portrait-height: calc(100svh - var(--nav-offset) - 10.5rem);
	--portrait-width: calc(var(--portrait-height) * 450 / 1001);
	--tagline-wrap: max(0px, calc(var(--portrait-width) - 25% + 0.75rem));
	position: relative;
	overflow: hidden;
	width: 100%;
	min-width: var(--page-min-width);
	height: 100svh;
	min-height: 100svh;
	max-height: 100svh;
	scroll-snap-align: start;
	scroll-snap-stop: always;
	background: radial-gradient(circle at 50% 40%, #051245 0%, #02061a 42%, #010105 100%);
}

.hero-copy {
	position: relative;
	z-index: 1;
	display: grid;
	grid-template-rows: 1fr auto 1fr;
	width: 75%;
	height: 100%;
	min-height: 100%;
	padding-bottom: 1.5rem;
	padding-left: var(--hero-pad-x);
}

.hero-wordmark {
	/* Rollback overlap: --y-overlap: 0; */
	--y-overlap: -0.2em;
	grid-row: 2;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	transform: translateY(-4vh);
	width: 100%;
	max-width: 100%;
	font-size: min(calc(max(75vw, calc(360px * 0.75)) / 2.2), 22vh);
}

.hero-topline {
	display: contents;
}

.hero-name {
	order: 1;
	position: relative;
	z-index: 2;
	display: block;
	width: min(100%, 2.2em);
	height: auto;
	margin-bottom: var(--y-overlap);
	filter:
		drop-shadow(0 0 14px rgba(17, 106, 246, 0.38))
		drop-shadow(0 8px 20px rgba(2, 6, 26, 0.5));
}

.hero-title {
	order: 2;
	position: relative;
	z-index: 1;
	width: 100%;
	margin-left: -0.05em;
	font-family: 'Bebas Neue', sans-serif;
	font-size: 1em;
	font-weight: 400;
	line-height: 0.82;
	color: var(--electric-blue);
}

.hero-title-line {
	display: block;
}

.hero-kicker {
	order: 3;
	margin: 0.4em 0 0;
	font-family: 'Bebas Neue', sans-serif;
	font-size: clamp(1rem, max(4.5vw, calc(360px * 0.045)), 1.35rem);
	font-weight: 400;
	letter-spacing: 0.08em;
	color: var(--light-gray);
}

.hero-tagline {
	grid-row: 3;
	align-self: end;
	z-index: 1;
	margin: 0;
	max-width: none;
	font-size: clamp(0.95rem, max(3.8vw, calc(360px * 0.038)), 1.15rem);
	font-weight: 400;
	line-height: 1.4;
	color: var(--light-gray);
	white-space: pre-line;
	overflow-wrap: break-word;
}

.hero-tagline::before {
	content: '';
	float: right;
	width: var(--tagline-wrap);
	height: 4em;
	shape-outside: inset(0);
}

.hero-portrait {
	position: absolute;
	inset: 0;
	z-index: 4;
	pointer-events: none;
}

.hero-portrait img {
	position: absolute;
	right: 0;
	bottom: 0;
	display: block;
	height: var(--portrait-height);
	width: auto;
	max-width: none;
	object-fit: contain;
	object-position: bottom right;
}
</style>
