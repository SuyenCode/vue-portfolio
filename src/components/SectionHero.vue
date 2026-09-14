<script setup lang="ts">
import portrait from '../assets/hero-portrait.png'
import { heroContent } from '../data/hero'

const { scriptName, title, kicker } = heroContent
</script>

<template>
	<section id="home" class="hero" aria-label="Hero">
		<div class="hero-wordmark">
			<div class="hero-wordmark-inner">
				<p class="hero-name">{{ scriptName }}</p>
				<p class="hero-kicker">{{ kicker }}</p>
				<h1 class="hero-title">{{ title }}</h1>
			</div>
		</div>

		<div class="hero-portrait">
			<img :src="portrait" alt="Suyen" />
		</div>
	</section>
</template>

<style scoped>
.hero {
	position: relative;
	overflow: hidden;
	min-height: 100vh;
	min-height: 100svh;
	background: radial-gradient(circle at 50% 40%, #051245 0%, #02061a 42%, #010105 100%);
}

.hero-wordmark {
	position: absolute;
	inset: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0 4vw;
	pointer-events: none;
}

.hero-wordmark-inner {
	position: relative;
	width: max-content;
	max-width: 100%;
	font-size: clamp(3.4rem, 20vw, 5.6rem);
}

.hero-title {
	position: relative;
	z-index: 1;
	margin: 0;
	font-family: 'Bebas Neue', sans-serif;
	font-size: 1em;
	font-weight: 400;
	line-height: 0.82;
	letter-spacing: 0.02em;
	color: var(--electric-blue);
	white-space: nowrap;
}

.hero-name {
	position: absolute;
	left: 0;
	top: -0.52em;
	z-index: 3;
	margin: 0;
	font-family: 'Great Vibes', cursive;
	font-size: 0.38em;
	line-height: 1;
	color: #9ec5ff;
	text-shadow: 0 0 28px rgba(17, 106, 246, 0.7);
}

.hero-kicker {
	position: absolute;
	right: 0.02em;
	top: -0.78em;
	z-index: 3;
	margin: 0;
	font-family: 'Bebas Neue', sans-serif;
	font-size: 0.2em;
	font-weight: 400;
	line-height: 1;
	letter-spacing: 0.1em;
	color: var(--light-gray);
	white-space: nowrap;
}

.hero-portrait {
	position: absolute;
	left: 50%;
	bottom: 0;
	z-index: 2;
	height: 100%;
	width: min(46vw, 32rem);
	transform: translateX(-50%);
	pointer-events: none;
}

.hero-portrait img {
	display: block;
	height: 100%;
	width: 100%;
	object-fit: contain;
	object-position: center bottom;
	transform: scale(1.22);
	transform-origin: center bottom;
}

@media (min-width: 1024px) {
	.hero-wordmark-inner {
		font-size: clamp(6.5rem, 24.5vw, 23rem);
	}
}

@media (max-width: 1023px) {
	.hero-wordmark {
		padding: 0 1.25rem;
	}

	.hero-name {
		top: -0.58em;
	}

	.hero-kicker {
		top: -0.55em;
		font-size: 0.34em;
		letter-spacing: 0.06em;
	}

	.hero-portrait {
		width: min(78vw, 22rem);
		height: 72%;
	}
}
</style>
